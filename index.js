// npm install, se sertificar que tem o node.modules
// npm install express dotenv @supabase/supabase-js
// No postman o método get deve ser enviado em none, o resto pode ser row

import express from "express";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();
const app = express();
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Criar produto
app.post("/produtos", async (req, res) => {
    const { nome, preco, categoria } = req.body;

    const { data, error } = await supabase
        .from("produtos")
        .insert([{ nome, preco, categoria }]);

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: "Produto criado com sucesso!" });
});

// Listar produtos
app.get("/produtos", async (req, res) => {
    const { data, error } = await supabase
        .from("produtos")
        .select("*");

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.json(data);
});

// Deletar produto
app.delete("/produtos/:id", async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from("produtos")
        .delete()
        .eq("id", id);

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.json(data);
});

// Atualizar produto
app.put("/produtos/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, preco, categoria } = req.body;

    const { data, error } = await supabase
        .from("produtos")
        .update([{ nome, preco, categoria }])
        .eq("id", id);

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
        message: `Produto com id ${id} atualizado com sucesso!`,
        data
    });
});

// Buscar um produto por ID
app.get("/produtos/:id", async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from("produtos")
        .select("*")
        .eq("id", id);

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.json(data);
});

// Subir servidor
app.listen(3000, () => {
    console.log("O servidor subiu na porta 3000");
});
