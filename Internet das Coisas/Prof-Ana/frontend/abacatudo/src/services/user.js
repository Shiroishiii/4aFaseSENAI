import api from "./api.js";

export const create = async (form) => {
    try {
        const response = await api.post('/create', form);
        console.log("usuario criado: ", response)

        return response.data
        
    } catch (error) {
        console.error('erro interno', error)
    }
}