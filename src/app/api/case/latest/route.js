import { NextResponse } from 'next/server';
import db from '../../../../lib/db';

export async function GET(_request) {
  try {
    const { data, error } = await db
      .from('case')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      throw error;
    }

    if (data.length === 0) {
      return NextResponse.json({ data: null }, { status: 200 });
    }

    return NextResponse.json({ data: data[0] }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message || error }, { status: 500 });
  }
}