import { NextResponse } from 'next/server';
import db from '../../../lib/db';

export async function GET(request) {
  const { room, before, after, isLatest, isStart } = parseRequestParams(request);

  if (!room) {
    return NextResponse.json({ error: 'Missing room' }, { status: 400 });
  }

  let stateData;
  if (after) {
    const effectiveBeforeTimestamp = await effectiveBeforeTimestampForAfter(room, after);
    if (effectiveBeforeTimestamp === Infinity) {
      return NextResponse.json({ live: true, time: after.toISOString() }, { status: 200 });
    }
    const effectiveBeforeDate = addOneSecond(new Date(effectiveBeforeTimestamp));
    stateData = await getState(room, effectiveBeforeDate);
  } else if (before) {
    stateData = await getState(room, before);
  } else if (isLatest) {
    stateData = await getState(room);
  } else if (isStart) {
    stateData = await getStartState(room);
  }

  const time = new Date(stateData.created_at);
  return NextResponse.json({ state: stateData, time: time.toISOString() }, { status: 200 });
}

async function getState(room, before) {
  let query = db.from("state")
    .select('*')
    .eq('room', room)
    .order('created_at', { ascending: false })
    .limit(1);

  if (before) {
    query = query.lt('created_at', before.toISOString());
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data.length ? data[0] : null;
}

async function getStartState(room) {
  // Get the latest case_id for the room
  const { data: caseData, error: caseError } = await db.from('case')
    .select('id')
    .eq('room', room)
    .order('id', { ascending: false })
    .limit(1);

  if (caseError) {
    throw caseError;
  }

  // If no cases are found, return null
  if (!caseData.length) {
    return null;
  }

  const latestCaseId = caseData[0].id;

  // Get the earliest state for the latest case
  const { data: stateData, error: stateError } = await db.from('state')
    .select('*')
    .eq('case_id', latestCaseId)
    .order('created_at', { ascending: true })
    .limit(1);

  if (stateError) {
    throw stateError;
  }

  if (!stateData.length) {
    return {
      "created_at": caseData[0].created_at
    }
  }

  return stateData.length ? stateData[0] : null;
}

function parseRequestParams(request) {
  const room = request.nextUrl.searchParams.get("room");
  const before = request.nextUrl.searchParams.get("before");
  const after = request.nextUrl.searchParams.get("after");
  const latest = request.nextUrl.searchParams.get("latest");
  const start = request.nextUrl.searchParams.get("start");

  return {
    room: room,
    before: before && parseDate(before),
    after: after && parseDate(after),
    isLatest: latest,
    isStart: start,
  }
}

async function effectiveBeforeTimestampForAfter(room, after) {
  const result = await db.from("state").select('created_at')
    .eq('room', room)
    // need to add a second because toISOString() uses milliseconds and timestamptz uses microseconds
    .gt('created_at', addOneSecond(after).toISOString())
    .order('created_at', { ascending: true })
    .limit(1);

  return result.data.length ? new Date(result.data[0].created_at).getTime() : Infinity;
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
