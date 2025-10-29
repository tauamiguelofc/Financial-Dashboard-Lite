import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Serve os arquivos estáticos do frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../frontend")));

// Rota da API Alpha Vantage
app.get("/api/stock", async (req, res) => {
  const symbol = req.query.ticker || "AAPL"; // valor padrão se não passar ticker
  const apiKey = process.env.ALPHA_VANTAGE_KEY;

  try {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;
    const { data } = await axios.get(url);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar dados da Alpha Vantage" });
  }
});

// Redireciona todas as outras rotas para o index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(3000, () => console.log("Servidor ativo em http://localhost:3000"));
