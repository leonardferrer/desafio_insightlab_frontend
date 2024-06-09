import React, { useState } from 'react';
import SupplierService from '../../services/SupplierService.js';
import { useNavigate } from 'react-router-dom';
import './AddSupplier.css'; // Importe o arquivo CSS

function AddSupplier() {
    const [form, setForm] = useState({
        fantasyName: '',
        corporateReason: '',
        cnpj: '',
        address: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await SupplierService.create(form);
            alert('Fornecedor cadastrado com sucesso!');
            navigate('/'); // Redirecionar para a lista de fornecedores
        } catch (error) {
            console.error('Erro ao cadastrar fornecedor:', error.message);
            alert('Erro ao cadastrar fornecedor!');
        }
    };

    return (
        <div className="form-container">
            <h2>Cadastrar Fornecedor</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <label>Nome Fantasia:</label>
                    <input
                        type="text"
                        name="fantasyName"
                        value={form.fantasyName}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Outros campos de input */}
                <button type="submit" className="submit-button">Cadastrar</button>
            </form>
        </div>
    );
}

export default AddSupplier;
