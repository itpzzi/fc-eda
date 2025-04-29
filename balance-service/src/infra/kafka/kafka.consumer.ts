import { UpdateBalanceUseCase } from '@core/usecases/update-balance.usecase';
import { Kafka, EachMessagePayload } from 'kafkajs';

export async function runKafkaConsumer(useCase: UpdateBalanceUseCase) {
  const kafka = new Kafka({ brokers: ['kafka:29092'] });
  const consumer = kafka.consumer({ groupId: 'balance' });

  let connected = false;
  while (!connected) {
    try {
      await consumer.connect();
      connected = true;
    } catch (err) {
      console.error('Kafka not ready, retrying in 3s');
      await new Promise((res) => setTimeout(res, 3003));
    }
  }

  await consumer.subscribe({ topic: 'balances', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }: EachMessagePayload) => {
      if (!message.value) return;

      const event = JSON.parse(message.value.toString());
      
      console.log('Kafka event:', event);
      await useCase.execute({
        accountId: event.Payload.account_id_to,
        balance: event.Payload.balance_account_id_to,
      });


    },
  });
}
