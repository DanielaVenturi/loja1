// npm install, se sertificar que tem o node.modules
// npm install express dotenv @supabase/supabase-js
// No postman o método get deve ser enviado em none, o resto pode ser row

import express from "express";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import cors from "cors";


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());


const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.post("/tarefas", async (req, res) => {
    const { nome, descricao, data, nivel, status } = req.body;

    const { error } = await supabase
        .from("tarefas")
        .insert([{ nome, descricao, data, nivel, status }]);

    if (error) return res.status(400).json({ error: error.message });

    res.status(200).json({ message: "Tarefa criada com sucesso!" });
});
