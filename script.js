// script.js

document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();
    const responseMessage = document.getElementById("responseMessage");

    // Validação básica
    if (!name || !email || !subject || !message) {
        responseMessage.textContent = "Por favor, preencha todos os campos.";
        responseMessage.style.color = "red";
        return;
    }

    // Envio para o backend
    try {
        const response = await fetch("/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, subject, message }),
        });

        const result = await response.json();
        if (response.ok) {
            responseMessage.textContent = "Mensagem enviada com sucesso!";
            responseMessage.style.color = "green";
        } else {
            responseMessage.textContent = `Erro: ${result.error || "Não foi possível enviar a mensagem."}`;
            responseMessage.style.color = "red";
        }
    } catch (error) {
        responseMessage.textContent = "Erro de conexão. Tente novamente mais tarde.";
        responseMessage.style.color = "red";
    }
});


const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        // Configuração do transporte
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "afonsofernando2356@gmail.com",
                pass: "Baguvix1",
            },
        });

        // Enviar e-mail
        await transporter.sendMail({
            from: email,
            to: "afonsofernando2356@gmail.com",
            subject: `Contato: ${subject}`,
            text: `Nome: ${name}\nEmail: ${email}\nMensagem: ${message}`,
        });

        res.status(200).json({ message: "Email enviado com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao enviar o email." });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


