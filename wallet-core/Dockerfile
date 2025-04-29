FROM golang:1.20

# Define o diretório de trabalho no container
WORKDIR /app

# Copia o código-fonte para o container
COPY . .

# Vai até o diretório onde está o main.go
WORKDIR /app/cmd/walletcore

# Instala as dependências Go (vai baixar os pacotes necessários)
RUN go mod tidy

# Instala o librdkafka-dev (caso necessário para seu projeto)
RUN apt-get update && apt-get install -y librdkafka-dev

# Compila o código Go e gera o binário
RUN go build -o wallet-core .

# Define o comando a ser executado quando o container for iniciado
CMD ["./wallet-core"]
