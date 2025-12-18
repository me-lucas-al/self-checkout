# 🍽️ Sistema de Autoatendimento para Restaurantes (Self-Checkout)

## 📌 Visão Geral

Este projeto é uma **aplicação web de autoatendimento (self-checkout) para restaurantes**, desenvolvida com o objetivo de permitir que clientes realizem pedidos de forma **autónoma**, sem a necessidade de interação direta com atendentes.

A solução funciona como um **cardápio digital interativo**, acessado por meio de um link único do restaurante, onde o cliente escolhe como deseja consumir, seleciona os produtos e finaliza o pedido diretamente pelo navegador.

---

## 🎯 Objetivo do Projeto

* Automatizar o processo de pedidos em restaurantes
* Reduzir filas e tempo de espera
* Oferecer uma experiência moderna e intuitiva ao cliente
* Garantir segurança e integridade dos dados no processo de compra

---

## 🔄 Fluxo do Utilizador

1. O cliente acessa a página do restaurante através de um **identificador único (slug)**.
2. Seleciona o **método de consumo**:

   * 🍽️ **Para comer aqui (DINE_IN)**
   * 🥡 **Para levar (TAKE_AWAY)**
3. Navega pelo **menu do restaurante**, organizado por categorias.
4. Seleciona os produtos desejados e as respetivas quantidades.
5. Finaliza o pedido informando:

   * Nome do cliente
   * CPF (com validação e tratamento dos dados)
6. O pedido é registado na base de dados com:

   * Cálculo seguro do valor total
   * Associação aos produtos selecionados
   * Definição do estado inicial do pedido

---

## 🧩 Funcionalidades Principais

* Cardápio digital por restaurante
* Organização de produtos por categorias
* Escolha de método de consumo
* Criação de pedidos via **Server Actions**
* Validação de formulários com feedback ao utilizador
* Cálculo seguro de preços no servidor
* Persistência de pedidos e produtos

---

## 🛠️ Stack Tecnológica

O projeto utiliza tecnologias modernas do ecossistema JavaScript/TypeScript:

### Frontend

* **Next.js 16** (App Router)
* **React 19**
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui** (componentes reutilizáveis)
* **Lucide React** (ícones)

### Formulários e Validação

* **React Hook Form**
* **Zod**

### Backend

* **Server Actions (Next.js)**
* **Prisma ORM**
* **PostgreSQL** (com suporte ao **Neon Serverless**)

---

## 🗄️ Modelo de Dados

O esquema da base de dados foi projetado de forma relacional para garantir integridade e escalabilidade.

### Principais Entidades

#### 🍴 Restaurant

* Nome
* Slug (identificador único)
* Avatar e imagem de capa
* Descrição

#### 📂 MenuCategory

* Nome da categoria (ex: Bebidas, Hambúrgueres)
* Associação com um restaurante

#### 🛒 Product

* Nome
* Preço
* Ingredientes
* Imagem
* Associação com categoria e restaurante

#### 🧾 Order

* Nome do cliente
* CPF
* Método de consumo
* Estado do pedido:

  * PENDENTE
  * EM_PREPARAÇÃO
  * FINALIZADO
* Valor total

#### 🔗 OrderProduct

* Relação entre pedidos e produtos
* Quantidade
* Preço do produto no momento da compra

---

## 🔐 Segurança e Regras de Negócio

* **Revalidação de preços no servidor:** o valor total do pedido é sempre recalculado no backend, evitando manipulação no frontend.
* **Verificação de existência do restaurante** antes da criação do pedido.
* **Tratamento do CPF:** remoção de pontuação antes do armazenamento na base de dados.
* **Server Actions:** garantem que toda a lógica sensível execute apenas no servidor.

---

## 📐 Arquitetura

* Organização por rotas utilizando o **App Router do Next.js**
* Separação clara entre:

  * Interface do utilizador
  * Validação de dados
  * Regras de negócio
  * Persistência

Essa abordagem facilita manutenção, escalabilidade e leitura do código.

---

## ▶️ Como instalar o projeto

### Pré-requisitos

Antes de iniciar, certifique-se de ter instalado na sua máquina:

* **Node.js** (versão 18 ou superior)
* **pnpm**, **npm** ou **yarn**
* **PostgreSQL** (ou conta no Neon)

---

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/seu-usuario/self-checkout.git
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
```

Caso utilize **Neon Serverless**, use a URL fornecida pela plataforma.

---

### 4️⃣ Rodar as migrações do banco de dados

```bash
pnpx prisma migrate dev
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

👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🚀 Considerações Finais

Este projeto representa uma **solução completa de autoatendimento para restaurantes**, integrando frontend moderno, backend seguro e uma base de dados bem estruturada.

Além de resolver um problema real do mercado, o sistema demonstra domínio de:

* React e Next.js moderno
* Server Actions
* ORM com Prisma
* Modelagem de dados relacional
* Validação robusta de formulários

É uma aplicação preparada para evolução futura, como integração com pagamentos, painel administrativo e acompanhamento de pedidos em tempo real.
