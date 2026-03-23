import { NextResponse } from 'next/server';
import { getPredictionMarketsRecap } from '@/lib/mocks/predictionMarkets';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const yearParam = searchParams.get('year');
  const year = yearParam ? parseInt(yearParam, 10) : new Date().getFullYear();

  const recap = getPredictionMarketsRecap(year);

  return NextResponse.json(recap);
}
