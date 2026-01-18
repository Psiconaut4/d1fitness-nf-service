# 📦 D1 Fitness – NF Service (Backend)

Serviço backend responsável por consumir uma API externa de vendas e notas fiscais, gerar a DANFE em PDF a partir do XML da NF-e e enviar a DANFE por e-mail.

Projeto desenvolvido como parte de um teste técnico, com foco em backend, integrações, organização de código e boas práticas em APIs REST.

---

## 💻 Tecnologias

### Backend
- Node.js + Express
- Axios
- nodemailer
- fast-xml-parser
- swagger-jsdoc / swagger-ui-express

### Frontend
- Vue 3 
- Vuetify
- Axios

### Dev / Testes
- Vitest (testes unitários)
- dotenv

---
## ⚙️ Setup Backend


### 1 Clonar o repositório

```bash
git clone https://github.com/Psiconaut4/d1fitness-nf-service.git
cd d1fitness-nf-service
```

### 2 Entrar na pasta `backend`:
```bash
cd backend
```

### 3 Instalar dependências:

```bash
npm install
```

### 4 Criar .env a partir do .env.example:

```bash
cp .env.example .env
```
## 5 Configurar variáveis de ambiente:
```env
# API externa
API_D1_URL=http://localhost:3000

# SMTP / Mailtrap
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=seu_usuario
MAIL_PASS=sua_senha

# Porta backend
PORT=3000
```
Substitua "seu_usuario" e "sua_senha" pelas suas credenciais do MailStrap

## 6 Rodar o Backend
```bash
npm run dev
```

---
## ⚙️ Setup Frontend

## 1 Entrar na pasta `frontend`:

```bash
cd frontend
```

## 2 Instalar dependências:
```bash
npm install
```

## 3 Criar .env com a URL do backend
```env
VITE_API_URL=http://localhost:3000/api
```

## 4 Rodar o frontend:
```bash
npm run dev
```

## 5 Acesse o dashboard:
```bash
http://localhost:5173
```
(ou porta exibida no terminal)

## 📌 Rotas do Backend (API)

Health

* GET /api/health
Retorna status da aplicação.

Vendas

* GET /api/sales — Lista códigos de vendas

* GET /api/sales/:saleId — Detalhes de uma venda

Notas Fiscais

* GET /api/nf/:invoiceId — Retorna NF (XML + info)

DANFE

* GET /api/danfe/:invoiceId — Retorna PDF do DANFE

* POST /api/danfe/:invoiceId/email — Envia DANFE + XML por email

Histórico de envios

* GET /api/history — Lista histórico de envios

## 📚 Swagger

Documentação interativa disponível em:
```bash
http://localhost:3000/api/docs
```

Inclui:

Rotas
Parâmetros
RequestBody e Responses

## 📝 Testes

No backend, execute:
```bash
npm test
```

Exemplo: teste unitário para geração de DANFE, mockando API externa e gerador de PDF.

## 🛠 Funcionalidades do Frontend

Dashboard com lista de vendas

Botão “Ver detalhes” → abre SaleDetailsView

Modal para envio de DANFE + XML por email

Feedback de sucesso/erro

Histórico de envios

Responsivo (desktop / mobile)

## 🔧 Observações

DANFE é gerado a partir do XML da NF obtido da API externa.

Validação do XML feita com fast-xml-parser.

Emails enviados via nodemailer (Mailtrap para testes).