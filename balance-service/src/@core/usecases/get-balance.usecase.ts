import { AccountRepository } from "@infra/repositories/account.repository";
import { GetBalanceUseCaseInputDTO, GetBalanceUseCaseOutputDTO } from "../dto/get-balance.dto";

export class GetBalanceUseCase {
    constructor(private accountRepository: AccountRepository) { }

    async execute(input: GetBalanceUseCaseInputDTO): Promise<GetBalanceUseCaseOutputDTO> {
        if (!input.accountId) {
            throw new Error('Invalid input for get balance');
        }
        const balance = await this.accountRepository.getBalance(input.accountId)

        if (typeof balance !== "number") {
            throw new Error('Invalid type for get balance');
        }
        return {
            balance
        }
    }
}