import { NextResponse } from 'next/server';
import { getCreditCardRecap } from '@/lib/mocks/creditCard';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const yearParam = searchParams.get('year');
  const year = yearParam ? parseInt(yearParam, 10) : new Date().getFullYear();

  const recap = getCreditCardRecap(year);

  return NextResponse.json(recap);
}
