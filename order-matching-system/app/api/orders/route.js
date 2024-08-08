import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/utils/db';
import PendingOrder from '@/models/PendingOrder';
import CompletedOrder from '@/models/CompletedOrder';

export async function POST(request) {
  const { userType, quantity, price } = await request.json();
  await connectToDatabase();

  const newOrder = new PendingOrder({ userType, quantity, price });
  await newOrder.save();

  const match = await matchOrder(newOrder);

  return NextResponse.json({ order: newOrder, match }, { status: 201 });
}

export async function GET() {
  await connectToDatabase();
  const pendingOrders = await PendingOrder.find({});
  return NextResponse.json(pendingOrders);
}

async function matchOrder(newOrder) {
  let match = null;

  if (newOrder.userType === 'buyer') {
    const sellers = await PendingOrder.find({
      userType: 'seller',
      price: newOrder.price
    }).sort({ quantity: -1 });

    for (const seller of sellers) {
      if (seller.quantity >= newOrder.quantity) {
        match = seller;
        break;
      }
    }

    if (!match && sellers.length > 0) {
      match = sellers[0];
    }

    if (match) {
      const matchedQuantity = Math.min(newOrder.quantity, match.quantity);

      await CompletedOrder.create({
        buyerId: newOrder._id,
        sellerId: match._id,
        quantity: matchedQuantity,
        price: match.price
      });

      newOrder.quantity -= matchedQuantity;
      match.quantity -= matchedQuantity;

      if (newOrder.quantity > 0) {
        await newOrder.save();
      } else {
        await PendingOrder.deleteOne({ _id: newOrder._id });
      }

      if (match.quantity > 0) {
        await match.save();
      } else {
        await PendingOrder.deleteOne({ _id: match._id });
      }

      return { match: true, matchedQuantity, price: match.price };
    }
  } else if (newOrder.userType === 'seller') {
    const buyers = await PendingOrder.find({
      userType: 'buyer',
      price: newOrder.price
    }).sort({ quantity: -1 });

    for (const buyer of buyers) {
      if (buyer.quantity >= newOrder.quantity) {
        match = buyer;
        break;
      }
    }

    if (!match && buyers.length > 0) {
      match = buyers[0];
    }

    if (match) {
      const matchedQuantity = Math.min(newOrder.quantity, match.quantity);

      await CompletedOrder.create({
        buyerId: match._id,
        sellerId: newOrder._id,
        quantity: matchedQuantity,
        price: newOrder.price
      });

      newOrder.quantity -= matchedQuantity;
      match.quantity -= matchedQuantity;

      if (newOrder.quantity > 0) {
        await newOrder.save();
      } else {
        await PendingOrder.deleteOne({ _id: newOrder._id });
      }

      if (match.quantity > 0) {
        await match.save();
      } else {
        await PendingOrder.deleteOne({ _id: match._id });
      }

      return { match: true, matchedQuantity, price: newOrder.price };
    }
  }

  return { match: false };
}
