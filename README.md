# Gerador de Roteiros para Vídeo com IA

Aplicação criada em **React Native + Expo**, integrada à API do **Google Gemini**, para gerar roteiros completos e estruturados para vídeos em diferentes plataformas:

- YouTube  
- YouTube Shorts  
- Instagram Reels  
- TikTok  

O usuário preenche informações simples sobre o vídeo e recebe um roteiro formatado e pronto para gravação.

---

## Tecnologias Utilizadas

| Tecnologia | Descrição |
|-----------|-----------|
| React Native (Expo Router) | Interface e navegação |
| Node.js + Express | Backend intermediário para segurança da API |
| Google Gemini API | Geração do roteiro |
| react-native-render-html | Exibição formatada do texto |
| @react-native-picker/picker | Seleção de opções no formulário |

---

## Funcionalidades

- Formulário claro e objetivo
- Escolha da plataforma de vídeo
- Definição da duração (1 a 30 minutos)
- Ajuste de palavras-chave e tom
- Geração automática via IA
- Visualização formatada do roteiro
- Opção para gerar novamente

---

## Pré-requisitos

- Node.js instalado
- Expo CLI instalado
- Chave da API do Gemini obtida em:  
  https://aistudio.google.com/app/apikey

---

## Configuração do Backend

Crie a pasta do backend:

bash
mkdir backend
cd backend
npm init -y
npm install express cors dotenv @google/genai

Crie o arquivo .env dentro de backend/:

GEMINI_API_KEY=SUA_CHAVE_AQUI


Crie o arquivo server.js:

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post("/api/gemini", async (req, res) => {
  try {
    const { prompt } = req.body;
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    res.json({ result: result.text });
  } catch (err) {
    res.status(500).json({ error: "Erro ao chamar Gemini" });
  }
});

app.listen(5500, () => console.log("Servidor rodando em http://localhost:5500"));


Para executar:

node server.js

Executando o App Mobile

Na pasta do projeto mobile:

npm install
npm start


Abra no celular com Expo Go ou em um emulador Android/iOS.

Estrutura Visual do Formulário

Design limpo e centralizado

Sem cores chamativas

Foco em legibilidade

Campos essenciais apenas

Melhorias Futuras (Opcional)

Exportar roteiro como PDF

Histórico de roteiros

Teleprompter integrado

Login & projetos salvos

Licença

Este projeto é distribuído sob a licença MIT.

Contribuição

Sinta-se livre para abrir Issues, dar sugestões e enviar PRs.

Se este projeto te ajudou, considere deixar uma estrela ⭐ no repositório.