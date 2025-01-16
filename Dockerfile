# Etapa 1: Construção da imagem
FROM node:18 AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia o package.json e o package-lock.json
COPY package.json package-lock.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o código-fonte para o container
COPY . .

# Copia o arquivo .env para a raiz do container
COPY .env .env

# Compila o projeto Next.js
RUN npm run build

# Etapa 2: Imagem final
FROM node:18

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas a pasta .next e os arquivos essenciais para a produção
COPY --from=builder /app/package.json /app/package-lock.json /app/
COPY --from=builder /app/.next /app/.next

# Copia o arquivo .env para a raiz do container
COPY --from=builder /app/.env /app/.env

# Instala as dependências de produção
RUN npm install --only=production

# Expõe a porta que o Next.js usará
EXPOSE 3000

# Inicia a aplicação Next.js
CMD ["npm", "start"]
