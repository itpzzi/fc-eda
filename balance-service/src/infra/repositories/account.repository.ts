import { AccountModel } from '../db/models/account.model';

export class AccountRepository {
  async updateBalance(accountId: string, balance: number): Promise<void> {
    await AccountModel.findOneAndUpdate(
      { accountId },
      { balance },
      { upsert: true, new: true }
    );
  }

  async getBalance(accountId: string): Promise<number | null> {
    const account = await AccountModel.findOne({ accountId });
    return account?.balance ?? null;
  }
}
