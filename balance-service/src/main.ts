import { connectToMongo } from 'src/config/database.config';
import { AccountRepository } from 'src/infra/repositories/account.repository';
import { UpdateBalanceUseCase } from 'src/@core/usecases/update-balance.usecase';
import { runKafkaConsumer } from 'src/infra/kafka/kafka.consumer';
import { startServer } from 'src/infra/http/server';

async function main() {
  await connectToMongo();

  const accountRepo = new AccountRepository();
  const updateBalanceUseCase = new UpdateBalanceUseCase(accountRepo);

  runKafkaConsumer(updateBalanceUseCase);
  startServer();
}

main();
