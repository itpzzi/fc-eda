import { UpdateBalanceUseCase } from './update-balance.usecase';
import { AccountRepository } from '@infra/repositories/account.repository';

describe('UpdateBalanceUseCase', () => {
  const mockAccountRepository: jest.Mocked<AccountRepository> = {
    updateBalance: jest.fn(),
    getBalance: jest.fn(),
  };

  const useCase = new UpdateBalanceUseCase(mockAccountRepository);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve chamar o repositório com os dados corretos', async () => {
    await useCase.execute({ accountId: 'abc123', balance: 1000 });

    expect(mockAccountRepository.updateBalance).toHaveBeenCalledWith('abc123', 1000);
  });

  it('deve lançar erro se o accountId estiver ausente', async () => {
    await expect(useCase.execute({ accountId: '', balance: 1000 }))
      .rejects.toThrow('Invalid input for updating balance');
  });

  it('deve lançar erro se o balance não for um número', async () => {
    // @ts-expect-error proposital para testar input inválido
    await expect(useCase.execute({ accountId: 'abc123', balance: null }))
      .rejects.toThrow('Invalid input for updating balance');
  });
});