import { AccountRepository } from "@infra/repositories/account.repository";

import { UpdateBalanceUseCaseInputDTO } from "@core/dto/update-balance.dto"

export class UpdateBalanceUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute(input: UpdateBalanceUseCaseInputDTO): Promise<void> {
    if (!input.accountId || typeof input.balance !== 'number') {
      throw new Error('Invalid input for updating balance');
    }

    await this.accountRepository.updateBalance(input.accountId, input.balance);
  }
}
