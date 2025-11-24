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

app.get("/tarefas", async (req, res) => {
    const { data, error } = await supabase
        .from("tarefas")
        .select("*");

    if (error) return res.status(400).json({ error: error.message });

    res.json(data);
});

app.get("/tarefas/:id", async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from("tarefas")
        .select("*")
        .eq("id", id)
        .single(); 

    if (error) return res.status(400).json({ error: error.message });

    res.json(data);
});

app.put("/tarefas/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, data, nivel, status } = req.body;

    const { data: updated, error } = await supabase
        .from("tarefas")
        .update([{ nome, descricao, data, nivel, status }])
        .eq("id", id);

    if (error) return res.status(400).json({ error: error.message });

    res.json({
        message: `Tarefa ${id} atualizada com sucesso!`,
        updated
    });
});

app.delete("/tarefas/:id", async (req, res) => {
    const { id } = req.params;

    const { error } = await supabase
        .from("tarefas")
        .delete()
        .eq("id", id);

    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: `Tarefa ${id} deletada com sucesso!` });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});