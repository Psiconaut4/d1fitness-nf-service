# 📦 D1 Fitness – NF Service (Backend)

Serviço backend responsável por consumir uma API externa de vendas e notas fiscais, gerar a DANFE em PDF a partir do XML da NF-e e enviar a DANFE por e-mail.

Projeto desenvolvido como parte de um teste técnico, com foco em backend, integrações, organização de código e boas práticas em APIs REST.

---

## 🧱 Stack utilizada

- Node.js
- Express
- Axios
- nfe-danfe-pdf
- Nodemailer
- dotenv
- ES Modules

---
## ⚙️ Configuração do ambiente

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/Psiconaut4/d1fitness-nf-service.git
cd d1fitness-nf-service/backend
```

### 2️⃣ Instalar dependências

```bash
npm install
```

### 3️⃣ Configurar variáveis de ambiente

Crie um arquivo .env baseado no .env.example:

```bash
cp .env.example .env
```
Preencha as variáveis conforme o ambiente.

### ▶️ Executando o projeto

```bash
npm run dev
```
Servidor iniciado em:

```bash
http://localhost:3000
```