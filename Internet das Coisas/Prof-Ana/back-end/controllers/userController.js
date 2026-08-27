import db from "../config/db.js"

export const createUser = async (req, res) => {
    const { nome, email, senha, cpf } = req.body;

    //===========================
    // VALIDAÇÃO
    //===========================

    if (!nome || typeof nome !== "string" || nome.trim().length < 3) {
        return res.status(400).json({ message: "Nome inválido. Este campo é obrigatório.", success: false });
    }

    if (!email || typeof email !== "string" || !email.includes("@") || email.trim().length > 150) {
        return res.status(400).json({ message: "E-mail inválido. Este campo é obrigatório.", success: false });
    }

    if (!cpf || typeof cpf !== "string" || cpf.length !== 11) {
        return res.status(400).json({ message: "CPF inválido. Este campo é obrigatório.", success: false });
    }

    if (!senha) {
        return res.status(400).json({
            message: "Senha inválida. Este campo é obrigatório.",
            success: false
        });
    } else {
        // Precisa ter entre 8 e 32 caracteres
        if (senha.length < 8 || senha.length > 32) {
            return res.status(400).json({
                message: "Senha inválida. Deve ter entre 8 e 32 caracteres.",
                success: false
            });
        }
    }

    //===========================
    // SANITIZAÇÃO
    //=========================== 

    if (!validarCPF(cpf)) {
        return res.status(400).json({
            message: "CPF inválido.",
            success: false
        })
    }

    // remove hifen e ponto 
    const cpfLimpo = cpf.replace(/[-.]/g, "");

    const nomeSanitizado = nome.trim().replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, "").replace(/\s+/g, " ");

    // inserção no banco
    try {
        const sql = "INSERT INTO usuario (nome, email, senha, cpf) VALUES (?, ?, ?, ?)";
        const valores = [nomeSanitizado, email, senha, cpfLimpo];
        const result = await db.execute(sql, valores);

        if (result[0].affectedRows === 0) {
            return res.status(400).json({ message: "Erro ao criar usuário.", success: false });
        }

        return res.status(201).json({ message: "Usuário criado com sucesso.", success: true });
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        return res.status(500).json({ message: "Erro interno do servidor.", success: false });
    }

}


function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");

    if (cpf.length !== 11) return false;

    // Rejeita CPFs com todos os números iguais
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;

    // Primeiro dígito verificador
    for (let i = 0; i < 9; i++) {
        soma += Number(cpf[i]) * (10 - i);
    }

    let resto = soma % 11;
    let digito1 = resto < 2 ? 0 : 11 - resto;

    if (digito1 !== Number(cpf[9])) return false;

    soma = 0;

    // Segundo dígito verificador
    for (let i = 0; i < 10; i++) {
        soma += Number(cpf[i]) * (11 - i);
    }

    resto = soma % 11;
    let digito2 = resto < 2 ? 0 : 11 - resto;

    return digito2 === Number(cpf[10]);
}