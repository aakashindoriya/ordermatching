import mongoose from 'mongoose';

const PendingOrderSchema = new mongoose.Schema({
  userType: { type: String, enum: ['buyer', 'seller'], required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const PendingOrder = mongoose.models.PendingOrder || mongoose.model('PendingOrder', PendingOrderSchema);
export default PendingOrder;
