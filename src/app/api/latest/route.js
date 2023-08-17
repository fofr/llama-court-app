import { NextResponse } from 'next/server';
import db from '../../../lib/db';

async function getLatestDataFromTable(table) {
  const { data, error } = await db
    .from(table)
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1);

  if (error) {
    throw error;
  }

  return { table, data: data.length ? data[0] : null };
}

export async function GET(_request) {
  const allowed = ['agents_state', 'case', 'evidence'];

  try {
    const results = await Promise.all(allowed.map(table => getLatestDataFromTable(table)));

    const aggregatedData = results.reduce((acc, result) => {
      acc[result.table] = result.data;
      return acc;
    }, {});

    return NextResponse.json({ data: aggregatedData }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message || error }, { status: 500 });
  }
}
