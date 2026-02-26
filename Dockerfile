# 1) Base image
FROM node:18-alpine AS base

# 2) Install dependencies
WORKDIR /app
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
RUN npm install

# 3) Build Next.js project
COPY . .
RUN npm run build

# 4) Run production server with correct port
EXPOSE 3000
CMD ["node", ".next/standalone/server.js", "-p", "3000"]