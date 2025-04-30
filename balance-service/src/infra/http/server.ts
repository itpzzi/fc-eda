import express from 'express';
import dotenv from 'dotenv';

import { createBalanceRouter } from '@infra/http/routes/balance.route';
import { AccountRepository } from '../repositories/account.repository';
import { GetBalanceUseCase } from '@src/@core/usecases/get-balance.usecase';

dotenv.config();

export function startServer() {
    const app = express();
    app.use(express.json());
    
    const accountRepository = new AccountRepository();
    const getBalanceUseCase = new GetBalanceUseCase(accountRepository);
    
    const balanceRouter = createBalanceRouter(getBalanceUseCase);

    app.use('/balances', balanceRouter);

    const port = process.env.PORT || 3003;

    app.listen(port, () => {
        console.log(`HTTP server running on port ${port}`);
    });
}
