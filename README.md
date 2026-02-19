# 🍽️ Sistema de Autoatendimento para Restaurantes (Self-Checkout)

## 🌐 Deploy

O projeto está online e o deploy pode ser acessado através do seguinte link:  
👉 **[selfcheckout-app.vercel.app](https://selfcheckout-app.vercel.app)**

---

## 📌 Visão Geral

Este projeto é uma **aplicação web de autoatendimento (self-checkout) para restaurantes**, desenvolvida com o objetivo de permitir que clientes realizem pedidos de forma **autônoma**, sem a necessidade de interação direta com atendentes.

A solução funciona como um **cardápio digital interativo**, acessado por meio de um link único do restaurante, onde o cliente escolhe como deseja consumir, seleciona os produtos, realiza o pagamento via Stripe e finaliza o pedido diretamente pelo navegador.

---

## 🎯 Objetivo do Projeto

- Automatizar o processo de pedidos em restaurantes
- Reduzir filas e tempo de espera
- Oferecer uma experiência moderna e intuitiva ao cliente
- Garantir segurança e integridade dos dados no processo de compra e pagamento

---

## 🔄 Fluxo do Utilizador

1. O cliente acessa a página do restaurante através de um **identificador único (slug)**.
2. Seleciona o **método de consumo**:
   - 🍽️ **Para comer aqui (DINE_IN)**
   - 🥡 **Para levar (TAKE_AWAY)**

3. Navega pelo **menu do restaurante**, organizado por categorias.
4. Seleciona os produtos desejados e as respetivas quantidades.
5. Finaliza o pedido informando:
   - Nome do cliente
   - CPF (com validação e tratamento dos dados)

6. O pedido é registado na base de dados e o cliente é redirecionado para o **checkout seguro do Stripe**.
7. Após o pagamento, o pedido tem seu status atualizado via Webhooks.

---

## 🧩 Funcionalidades Principais

- Cardápio digital por restaurante
- Organização de produtos por categorias
- Escolha de método de consumo
- **Integração com Stripe para processamento seguro de pagamentos**
- Criação de pedidos via **Server Actions**
- Validação de formulários com feedback ao utilizador
- Cálculo seguro de preços no servidor
- Persistência de pedidos e produtos

---

## 🛠️ Stack Tecnológica

O projeto utiliza tecnologias modernas do ecossistema JavaScript/TypeScript:

### Frontend

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** (componentes reutilizáveis)
- **Lucide React** (ícones)

### Formulários e Validação

- **React Hook Form**
- **Zod**

### Backend e Integrações

- **Server Actions (Next.js)**
- **Stripe** (Checkout e Webhooks para pagamentos)
- **Prisma ORM**
- **PostgreSQL** (com suporte ao **Neon Serverless**)

---

## 🗄️ Modelo de Dados

O esquema da base de dados foi projetado de forma relacional para garantir integridade e escalabilidade.

### Principais Entidades

#### 🍴 Restaurant

- Nome
- Slug (identificador único)
- Avatar e imagem de capa
- Descrição

#### 📂 MenuCategory

- Nome da categoria (ex: Bebidas, Hambúrgueres)
- Associação com um restaurante

#### 🛒 Product

- Nome
- Preço
- Ingredientes
- Imagem
- Associação com categoria e restaurante

#### 🧾 Order

- Nome do cliente
- CPF
- Método de consumo
- Status de pagamento (integrado ao Stripe)
- Estado do pedido:
  - EM_PREPARAÇÃO
  - FINALIZADO
- Valor total

#### 🔗 OrderProduct

- Relação entre pedidos e produtos
- Quantidade
- Preço do produto no momento da compra

---

## 🔐 Segurança e Regras de Negócio

- **Revalidação de preços no servidor:** o valor total do pedido é sempre recalculado no backend antes de ser enviado ao Stripe, evitando manipulação no frontend.
- **Webhooks do Stripe:** garantem que o status do pedido só seja atualizado após a confirmação real do pagamento.
- **Verificação de existência do restaurante** antes da criação do pedido.
- **Tratamento do CPF:** remoção de pontuação antes do armazenamento na base de dados.
- **Server Actions:** garantem que toda a lógica sensível execute apenas no servidor.

---

## 📐 Arquitetura

- Organização por rotas utilizando o **App Router do Next.js**
- Separação clara entre:
  - Interface do utilizador
  - Validação de dados
  - Regras de negócio
  - Persistência
  - Webhooks e Integrações Externas

Essa abordagem facilita manutenção, escalabilidade e leitura do código.

---

## ▶️ Como instalar o projeto

### Pré-requisitos

Antes de iniciar, certifique-se de ter instalado na sua máquina:

- **Node.js** (versão 18 ou superior)
- **pnpm**, **npm** ou **yarn**
- **PostgreSQL** (ou conta no Neon)
- **Conta no Stripe** (para configurar as chaves de API)

---

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/me-lucas-al/self-checkout.git
cd self-checkout

```

---

### 2️⃣ Instalar as dependências

```bash
pnpm install
# ou
npm install
# ou
yarn install

```

---

### 3️⃣ Configurar variáveis de ambiente

Crie um arquivo **.env** na raiz do projeto e configure:

```env
DATABASE_URL="postgresql://usuario:senha@host:porta/banco"

# Chaves do Stripe
STRIPE_SECRET_KEY="sua_chave_secreta"
STRIPE_WEBHOOK_SECRET="seu_segredo_de_webhook"
NEXT_PUBLIC_STRIPE_PUBLIC_KEY="sua_chave_publica"

```

---

### 4️⃣ Rodar as migrações e gerar o cliente do banco de dados

```bash
pnpx prisma migrate dev
pnpx prisma generate

```

Isso irá criar todas as tabelas necessárias no banco de dados.

---

### 5️⃣ Iniciar o projeto em ambiente de desenvolvimento

```bash
pnpm dev
# ou
npm run dev
# ou
yarn dev

```

O projeto estará disponível em:

👉 **[http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)**

---

## 🚀 Considerações Finais

Este projeto representa uma **solução completa de autoatendimento para restaurantes**, integrando frontend moderno, backend seguro e uma base de dados bem estruturada.

Além de resolver um problema real do mercado, o sistema demonstra domínio de:

* React e Next.js moderno
* Server Actions
* **Integração de pagamentos com Stripe e Webhooks**
* ORM com Prisma
* Modelagem de dados relacional
* Validação robusta de formulários

É uma aplicação preparada para evolução contínua e pronta para o mercado.

```
