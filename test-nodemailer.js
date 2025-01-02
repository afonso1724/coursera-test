const nodemailer = require("nodemailer");

(async () => {
    try {
        console.log("Nodemailer foi carregado com sucesso!");
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "afonsofernando2356@gmail.com",
                pass: "Baguvix1",
            },
            tls: {
                rejectUnauthorized: false, // Ignorar erros de certificado
            },
        });

        await transporter.verify();
        console.log("Servidor de e-mail está configurado corretamente.");
    } catch (error) {
        console.error("Erro ao testar o Nodemailer:", error);
    }
})();

