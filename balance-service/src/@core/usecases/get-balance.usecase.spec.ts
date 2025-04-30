import { GetBalanceUseCase } from './get-balance.usecase';
import { AccountRepository } from '@infra/repositories/account.repository';

describe('GetBalanceUseCase', () => {
  let useCase: GetBalanceUseCase;
  let mockRepo: jest.Mocked<AccountRepository>;

  beforeEach(() => {
    mockRepo = {
      getBalance: jest.fn()
    } as unknown as jest.Mocked<AccountRepository>;

    useCase = new GetBalanceUseCase(mockRepo);
  });

  it('deve retornar o balance corretamente', async () => {
    mockRepo.getBalance.mockResolvedValue(1000);

    const result = await useCase.execute({ accountId: 'acc123' });

    expect(result).toEqual({ balance: 1000 });
    expect(mockRepo.getBalance).toHaveBeenCalledWith('acc123');
  });

  it('deve lançar erro se input.accountId estiver vazio', async () => {
    await expect(useCase.execute({ accountId: '' }))
      .rejects
      .toThrow('Invalid input for get balance');
  });

  it('deve lançar erro se o balance não for um número', async () => {
    mockRepo.getBalance.mockResolvedValue(null as any);

    await expect(useCase.execute({ accountId: 'acc999' }))
      .rejects
      .toThrow('Invalid type for get balance');
  });
});
