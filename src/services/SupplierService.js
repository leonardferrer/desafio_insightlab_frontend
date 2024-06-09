import axios from 'axios';

const API_URL = 'https://desafio-insightla.onrender.com';

const SupplierService = {
    getAll: async () => {
        try {
            const response = await axios.get(`${API_URL}/suppliers`);
            return response.data;
        } catch (error) {
            throw new Error('Erro ao buscar fornecedores');
        }
    },
    getOne: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/suppliers/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Erro ao buscar fornecedor');
        }
    },
    create: async (supplierData) => {
        try {
            const response = await axios.post(`${API_URL}/suppliers`, supplierData);
            return response.data;
        } catch (error) {
            throw new Error('Erro ao criar fornecedor');
        }
    },

    update: async (id, supplierData) => {
        try {
            const response = await axios.put(`${API_URL}/suppliers/${id}`, supplierData);
            return response.data;
        } catch (error) {
            throw new Error('Erro ao atualizar fornecedor');
        }
    },

    delete: async (id) => {
        try {
            await axios.delete(`${API_URL}/suppliers/${id}`);
        } catch (error) {
            throw new Error('Erro ao excluir fornecedor');
        }
    },

    searchByName: async (name) => {
        try {
            const response = await axios.get(`${API_URL}/suppliers/search`, {
                params: { name }
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw new Error('Erro ao buscar fornecedores por nome');
        }
    },
};

export default SupplierService;
