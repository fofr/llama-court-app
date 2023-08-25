import { NextResponse } from 'next/server';
import db from '../../../lib/db';

const TABLES = ['agents_state', 'evidence', 'verdict'];

export async function GET(request) {
  const { room, before, after, isLatest } = parseRequestParams(request);

  if (!room) {
    return NextResponse.json({ error: 'Missing room' }, { status: 400 });
  }

  try {
    const caseData = await fetchLatestCase(room);
    if (!caseData) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }

    if (!before && !after && !isLatest) {
      return NextResponse.json({
        data: { case: caseData },
        time: new Date(caseData.created_at).toISOString()
      }, { status: 200 });
    }

    let effectiveBeforeDate;
    if (after) {
      const effectiveBeforeTimestamp = await effectiveBeforeTimestampForAfter(caseData.id, after);
      if (effectiveBeforeTimestamp === Infinity) {
        return NextResponse.json({ live: true, time: after.toISOString() }, { status: 200 });
      }
      effectiveBeforeDate = addOneSecond(new Date(effectiveBeforeTimestamp));
    } else {
      effectiveBeforeDate = before
    }

    const results = await Promise.all(TABLES.map(
      table => getDataFromTable(
        table, caseData.id, effectiveBeforeDate
      )));;

    const aggregatedData = results.reduce((acc, result) => {
      acc[result.table] = result.data;
      return acc;
    }, {});

    const time = latestTimeInData(caseData, aggregatedData);
    aggregatedData.case = caseData;
    return NextResponse.json({ data: aggregatedData, time: time.toISOString() }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error.message || error }, { status: 500 });
  }
}

async function getDataFromTable(table, caseID, before) {
  let query = db.from(table)
    .select('*')
    .eq('case_id', caseID)
    .order('created_at', { ascending: false })
    .limit(1);

  if (before) {
    query = query.lt('created_at', before.toISOString());
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return { table, data: data.length ? data[0] : null };
}

async function fetchLatestCase(room) {
  const caseResult = await db
    .from('case')
    .select('*')
    .order('created_at', { ascending: false })
    .eq('room', room)
    .limit(1);

  return caseResult.data.length ? caseResult.data[0] : null;
}

function parseRequestParams(request) {
  const room = request.nextUrl.searchParams.get("room");
  const before = request.nextUrl.searchParams.get("before");
  const after = request.nextUrl.searchParams.get("after");
  const latest = request.nextUrl.searchParams.get("latest");

  return {
    room: room,
    before: before && parseDate(before),
    after: after && parseDate(after),
    isLatest: latest,
  }
}

async function effectiveBeforeTimestampForAfter(caseID, after) {
  const nextTimestamps = await Promise.all(TABLES.map(async (table) => {
    const result = await db.from(table).select('created_at')
      .eq('case_id', caseID)
      // need to add a second because toISOString() uses milliseconds and timestamptz uses microseconds
      .gt('created_at', addOneSecond(after).toISOString())
      .order('created_at', { ascending: true })
      .limit(1);

    return result.data.length ? new Date(result.data[0].created_at).getTime() : Infinity;
  }));

  return Math.min(...nextTimestamps);
}

function latestTimeInData(caseData, aggregatedData) {
  let timestamps = [];

  if (aggregatedData.agents_state && aggregatedData.agents_state.created_at) {
    timestamps.push(new Date(aggregatedData.agents_state.created_at).getTime());
  }

  if (aggregatedData.evidence && aggregatedData.evidence.created_at) {
    timestamps.push(new Date(aggregatedData.evidence.created_at).getTime());
  }

  if (aggregatedData.verdict && aggregatedData.verdict.created_at) {
    timestamps.push(new Date(aggregatedData.verdict.created_at).getTime());
  }

  if (caseData && caseData.created_at) {
    timestamps.push(new Date(caseData.created_at).getTime());
  }

  // Find the latest timestamp
  return new Date(Math.max(...timestamps));
}

function parseDate(s) {
  if (s.includes("+") != 0) {
    s = s.split("+")[0] + "Z"
  }
  return new Date(s);
}

function addOneSecond(d) {
  return new Date(d.getTime() + 1000);
}
