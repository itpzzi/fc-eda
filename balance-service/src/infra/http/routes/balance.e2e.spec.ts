import request from 'supertest';
import express from 'express';
import { createBalanceRouter } from '@infra/http/routes/balance.route';
import { GetBalanceUseCase } from '@core/usecases/get-balance.usecase';

describe('GET /balances/:account_id', () => {
  let app: express.Express;
  let mockUseCase: GetBalanceUseCase;

  beforeEach(() => {
    mockUseCase = {
      execute: jest.fn()
    } as any;

    app = express();
    app.use(express.json());
    app.use('/balances', createBalanceRouter(mockUseCase));
  });

  it('deve retornar o saldo da conta', async () => {
    (mockUseCase.execute as jest.Mock).mockResolvedValue({ balance: 500 });

    const res = await request(app).get('/balances/acc123');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ balance: 500 });
    expect(mockUseCase.execute).toHaveBeenCalledWith({ accountId: 'acc123' });
  });

  it('deve retornar 200 com balance null se a conta não existir', async () => {
    (mockUseCase.execute as jest.Mock).mockResolvedValue({ balance: null });

    const res = await request(app).get('/balances/inexistente');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ balance: null });
  });

  it('deve retornar 500 em caso de erro interno', async () => {
    (mockUseCase.execute as jest.Mock).mockRejectedValue(new Error('fail'));

    const res = await request(app).get('/balances/acc123');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Internal server error' });
  });
});