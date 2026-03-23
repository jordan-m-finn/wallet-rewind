import { NextResponse } from 'next/server';
import { getTradingRecap } from '@/lib/mocks/trading';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const yearParam = searchParams.get('year');
  const year = yearParam ? parseInt(yearParam, 10) : new Date().getFullYear();

  const recap = getTradingRecap(year);

  return NextResponse.json(recap);
}
