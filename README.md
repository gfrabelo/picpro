<div align="center">
<img width="1200" height="475" alt="PicPro Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

<h1>PicPro ✨</h1>
<p>Transforme sua foto em uma foto de perfil profissional para LinkedIn com IA — em segundos.</p>

<a href="https://picpro-khaki.vercel.app/">🌐 Ver Demo</a> ·
<a href="#-como-fazer-deploy-na-vercel-grátis">🚀 Deploy Grátis</a> ·
<a href="#-como-rodar-localmente">💻 Rodar Localmente</a>

</div>

---

## 📌 Sobre o Projeto

O **PicPro** é uma aplicação web que usa a API do **Google Gemini** para transformar qualquer foto em uma imagem de perfil profissional estilo LinkedIn. Ele foi construído do zero como projeto educativo, demonstrando como criar e publicar um app com IA moderno.

> Este repositório é o resultado final do tutorial em vídeo. Sinta-se livre para usar, modificar, monetizar e fazer o que quiser!

### O que o app faz?
1. O usuário faz upload de uma foto qualquer
2. A foto é enviada para a API do Gemini
3. O Gemini transforma a foto com iluminação profissional, fundo neutro e aparência polida
4. O resultado é exibido para download

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Para quê? |
|---|---|
| **React + TypeScript** | Interface do usuário |
| **Vite** | Bundler e servidor de desenvolvimento |
| **Google Gemini API** | Geração de imagem com IA |
| **Vercel** | Hospedagem (deploy grátis) |

---

## 💸 Custo

| Serviço | Custo |
|---|---|
| Deploy na Vercel | **Grátis** |
| Domínio | **Grátis** (subdomínio `.vercel.app`) |
| Google Gemini API | **~$0,03–0,04 por imagem gerada** |

> ⚠️ O único custo real é a **API do Gemini**, paga por uso. Para uso pessoal ou testes, o Google oferece **$300 de crédito gratuito** para novas contas do Google Cloud — o suficiente para milhares de imagens.

---

## 💻 Como Rodar Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v18 ou superior)
- Uma chave de API do [Google AI Studio](https://aistudio.google.com/app/apikey)

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/picpro.git
cd picpro

# 2. Instale as dependências
npm install

# 3. Configure sua chave de API
# Renomeie o arquivo .env.example para .env.local
# e adicione sua chave do Gemini:
# GEMINI_API_KEY=sua_chave_aqui

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173` no navegador. 🎉

---

## 🚀 Como Fazer Deploy na Vercel (Grátis)

Você pode publicar esse app na internet **de graça** em menos de 5 minutos!

### 1. Faça um fork ou clone o repositório para sua conta do GitHub

### 2. Acesse [vercel.com](https://vercel.com) e crie uma conta gratuita

### 3. Importe o repositório
- Clique em **"Add New Project"**
- Conecte sua conta do GitHub e selecione o repositório `picpro`
- Clique em **"Deploy"**

### 4. Configure a variável de ambiente
- Ainda nas configurações do projeto na Vercel, vá em **Settings → Environment Variables**
- Adicione:
  - **Name:** `GEMINI_API_KEY`
  - **Value:** sua chave do [Google AI Studio](https://aistudio.google.com/app/apikey)
- Clique em **Save** e faça um novo deploy (ou redeploy)

### 5. Pronto! 🎉
Seu app estará online em um link `.vercel.app` gratuito.

---

## 🔑 Como Obter a Chave da API do Gemini

1. Acesse [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Faça login com sua conta Google
3. Clique em **"Create API Key"**
4. Selecione ou crie um projeto no Google Cloud
5. Ative o **Cloud Billing** no projeto (necessário para modelos de geração de imagem)
6. Copie a chave gerada e use no `.env.local` ou nas variáveis da Vercel

> 💡 Dica: Novas contas do Google Cloud recebem **$300 de crédito gratuito**. Aproveite para testar à vontade!

---

## 🗂️ Estrutura do Projeto

```
picpro/
├── src/
│   ├── components/    # Componentes React (UI)
│   ├── services/
│   │   └── gemini.ts  # Integração com a API do Gemini
│   └── main.tsx       # Entrada da aplicação
├── index.html
├── vite.config.ts
└── .env.local         # Suas variáveis de ambiente (não subir para o GitHub!)
```

---

## 💡 Ideias para Melhorar o Projeto

Quer evoluir o PicPro? Aqui estão algumas ideias:

- [ ] Adicionar autenticação com Google (Supabase Auth)
- [ ] Salvar histórico de fotos geradas por usuário
- [ ] Adicionar diferentes estilos (casual, criativo, executivo)
- [ ] Criar um sistema de créditos e monetizar o app
- [ ] Adicionar suporte a múltiplos idiomas

---

## 📄 Licença

Este projeto é open-source e está disponível sob a licença **MIT**. Use, modifique e distribua à vontade.

---

<div align="center">
Feito com ❤️ como projeto educativo · <a href="https://github.com/seu-usuario">GitHub</a>
</div>
