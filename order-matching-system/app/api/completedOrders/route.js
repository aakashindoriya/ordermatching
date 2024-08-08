import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/utils/db';
import CompletedOrder from '@/models/CompletedOrder';

export async function GET() {
  await connectToDatabase();
  const completedOrders = await CompletedOrder.find({});
  return NextResponse.json(completedOrders);
}
