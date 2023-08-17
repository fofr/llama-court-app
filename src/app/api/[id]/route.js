import { NextResponse } from "next/server";
import db from "../../../lib/db";

export async function GET(request, context) {
  const params = context.params
  console.log(params)
  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}
