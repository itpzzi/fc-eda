import { AccountRepository } from "@infra/repositories/account.repository";

interface UpdateBalanceInput {
  accountId: string;
  balance: number;
}

export class UpdateBalanceUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute(input: UpdateBalanceInput): Promise<void> {
    if (!input.accountId || typeof input.balance !== 'number') {
      throw new Error('Invalid input for updating balance');
    }

    await this.accountRepository.updateBalance(input.accountId, input.balance);
  }
}
