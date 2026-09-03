import { create } from "../services/user";
import { useState } from "react";

const formUser = () => {

    const [form, setForm] = useState({
        nome: '',
        email: '',
        senha: '',
        cpf: '',
    });

    const [erros, setErros] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const validaFormulario = () => {
        const novosErros = {};

        // Nome
        if (!form.nome || form.nome.trim().length < 3) {
            novosErros.nome = "o campo nome é obrigatório e deve ter pelo menos 3 caracteres";
        }

        // CPF
        if (!form.cpf || form.cpf.trim().length < 11) {
            novosErros.cpf = "o campo CPF é obrigatório e deve ter 11 caracteres";
        }

        // Email
        if (!form.email || !form.email.includes('@')) {
            novosErros.email = "o campo email é obrigatório e deve ser um email válido";
        }

        // Senha
        if (!form.senha || form.senha.trim().length < 8 || !form.senha.trim().length > 32) {
            novosErros.senha = "o campo senha é obrigatório e deve ter entre 8 e 32 caracteres";
        }

        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!validaFormulario()) 
            return

            try {

                const resultado = await create(form);
                console.log('Resultado:', resultado);

            } catch (error) {
                console.error("Erro ao enviar o formulário:", error);
            }
    };

    return (
        <div>
            <h1>Cadastro de Usuário</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nome">Nome:</label>
                <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                />
                {erros.nome && <span className="error">{erros.nome}</span>}

                <label htmlFor="cpf">CPF:</label>
                <input
                    type="text"
                    id="cpf"
                    name="cpf"
                    value={form.cpf}
                    onChange={handleChange}
                />
                {erros.cpf && <span className="error">{erros.cpf}</span>}

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                />
                {erros.email && <span className="error">{erros.email}</span>}

                <label htmlFor="senha">Senha:</label>
                <input
                    type="password"
                    id="senha"
                    name="senha"
                    value={form.senha}
                    onChange={handleChange}
                />
                {erros.senha && <span className="error">{erros.senha}</span>}

                <button type="submit">Cadastrar</button>
            </form>
        </div>
    )
}

export default formUser