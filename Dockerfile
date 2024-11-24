# Usar uma imagem base do Node.js
FROM node:18

# Definir o diretório de trabalho
WORKDIR /usr/src/app

# Copiar os arquivos do projeto para dentro do contêiner
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY . .

# Expor a porta que a aplicação usará
EXPOSE 3000

# Rodar o servidor
CMD ["npm", "start"]