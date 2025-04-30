import { AccountRepository } from './account.repository';
import { AccountModel } from '../db/models/account.model';

jest.mock('../db/models/account.model', () => ({
  AccountModel: {
    findOneAndUpdate: jest.fn(),
    findOne: jest.fn()
  }
}));

describe('AccountRepository', () => {
  const repository = new AccountRepository();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('updateBalance', () => {
    it('deve chamar findOneAndUpdate com os parâmetros corretos', async () => {
      await repository.updateBalance('acc123', 1000);

      expect(AccountModel.findOneAndUpdate).toHaveBeenCalledWith(
        { accountId: 'acc123' },
        { balance: 1000 },
        { upsert: true, new: true }
      );
    });
  });

  describe('getBalance', () => {
    it('deve retornar o balance se a conta existir', async () => {
      (AccountModel.findOne as jest.Mock).mockResolvedValue({ balance: 500 });

      const balance = await repository.getBalance('acc123');
      expect(balance).toBe(500);
      expect(AccountModel.findOne).toHaveBeenCalledWith({ accountId: 'acc123' });
    });

    it('deve retornar null se a conta não existir', async () => {
      (AccountModel.findOne as jest.Mock).mockResolvedValue(null);

      const balance = await repository.getBalance('acc999');
      expect(balance).toBeNull();
    });
  });
});
