import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const DEFAULT_LANGUAGE = process.env.DEFAULT_LANGUAGE || "es";
const CONTENT_PATH = process.env.CONTENT_PATH || "./content.json";

const __dirname = new URL(".", import.meta.url).pathname;

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Endpoint de contenido
app.get("/content", (req, res) => {
  const lang = req.query.lang || DEFAULT_LANGUAGE;

  try {
    const rawData = fs.readFileSync(CONTENT_PATH, "utf-8");
    const data = JSON.parse(rawData);

    if (!data[lang]) {
      return res.status(404).json({ error: "Idioma no disponible" });
    }

    res.json(data[lang]);
  } catch (error) {
    res.status(500).json({ error: "Error al cargar el contenido" });
  }
});

// Fallback SPA
app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
