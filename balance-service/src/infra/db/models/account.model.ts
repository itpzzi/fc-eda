import mongoose from 'mongoose';

const AccountSchema = new mongoose.Schema({
  accountId: { type: String, required: true, unique: true },
  balance: { type: Number, required: true },
}, { timestamps: true });

export const AccountModel = mongoose.model('Account', AccountSchema);
