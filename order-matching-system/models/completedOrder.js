import mongoose from 'mongoose';

const CompletedOrderSchema = new mongoose.Schema({
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const CompletedOrder = mongoose.models.CompletedOrder || mongoose.model('CompletedOrder', CompletedOrderSchema);
export default CompletedOrder;
