import { NextResponse } from "next/server";
import db from "../../../lib/db";

export async function GET(_request, context) {
  const params = context.params
  console.log(params)

  let { data, error } = await db
    .from('agents_state')
    .select('*')
    .eq('case_id', params.id)

  return NextResponse.json({ data }, { status: 200 })
}
