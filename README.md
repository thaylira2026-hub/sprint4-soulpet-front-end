<div align="center">

<img src="public/img/logo.svg" alt="SoulPet" width="320" />

### Gamificação para o bem-estar animal

Plataforma onde tutores de pets completam missões, acumulam pontos e trocam por recompensas reais ou doações a ONGs parceiras.

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Java](https://img.shields.io/badge/API_Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## 📖 Sobre o projeto

O *SoulPet* é uma comunidade dentro da rede social *SoulUp*, focada no bem-estar animal. Nela, tutores de pets completam missões, acumulam pontos e trocam por produtos reais para seus animais — ou doam esses pontos para ONGs de proteção animal.

Este repositório contém o *Front-End da Sprint 04* do *Challenge FIAP — 2º Semestre 2026, na disciplina de **Front-End Design Engineering. Nesta etapa, a aplicação em **React + Vite + TypeScript* foi integrada à *API REST desenvolvida em Java* (disciplina de Domain Driven Design), consumindo dados reais do back-end, e publicada na *Vercel*.

## ✨ Funcionalidades

- 🎯 *Missões* com 3 níveis de dificuldade, filtráveis por categoria
- 🎁 *Loja de recompensas* com filtro por categoria e resgate de pontos
- 🔌 *Integração com a API Java* usando fetch nativo (GET, POST, PUT e DELETE)
- ⏳ *Tratamento de carregamento, erro e lista vazia* em todas as telas que usam a API
- 📄 *Rotas dinâmicas* para detalhe de missões e recompensas (/missao/:id e /recompensa/:id)
- 💡 *Página Solução*, apresentando o problema e a proposta do projeto
- 🚫 *Página 404* com redirecionamento automático para o início
- ❓ *FAQ em accordion* e ✉️ *formulário de contato* com validação
- 📱 *Totalmente responsivo* (mobile, tablet e desktop) com Tailwind CSS

## 🚀 Tecnologias utilizadas

| Tecnologia | Finalidade |
|---|---|
| ⚛️ *React* | Construção da interface e componentização |
| ⚡ *Vite* | Build tool e servidor de desenvolvimento |
| 🔷 *TypeScript* | Tipagem estática (interfaces, union types e intersection types) |
| 🎨 *Tailwind CSS* | Estilização utilitária e responsiva |
| 🧭 *React Router DOM* | Navegação SPA, rotas estáticas e dinâmicas |
| 📋 *React Hook Form* | Validação do formulário de contato |
| 🌐 *Fetch API* | Requisições HTTP para a API Java (sem bibliotecas externas) |
| ☕ *Java (API REST)* | Back-end que fornece e armazena os dados |
| ▲ *Vercel* | Hospedagem e deploy contínuo da aplicação |
| 🐙 *Git / GitHub / Gitflow* | Versionamento colaborativo (branches main, develop e feature/*) |

## 📁 Estrutura de pastas


sprint4-soulpet-front-end/
├── public/
│   ├── img/              # Logo e fotos das integrantes
│   └── screenshots/      # Capturas de tela usadas no README
├── src/
│   ├── components/       # Componentes reutilizáveis (Header, Footer, Cards, estados de loading/erro/vazio)
│   ├── data/             # Dados estáticos (FAQ, equipe)
│   ├── hooks/            # Hooks personalizados (useFetch)
│   ├── pages/            # Páginas da aplicação (Home, Solução, Missões, Recompensas, etc.)
│   ├── services/         # Camada de integração com a API (http.ts)
│   ├── types/            # Tipos TypeScript compartilhados
│   ├── App.tsx           # Configuração das rotas
│   ├── main.tsx          # Ponto de entrada da aplicação
│   └── index.css         # Configuração do Tailwind e design tokens
├── .env.example          # Modelo da variável de ambiente VITE_API_URL
├── vercel.json           # Configuração de rotas SPA na Vercel
├── package.json
└── vite.config.ts

