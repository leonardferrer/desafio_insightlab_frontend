import React, { useState } from 'react';
import SupplierService from '../../services/SupplierService.js';
import { useNavigate } from 'react-router-dom';
import './AddSupplier.css';

function AddSupplier() {
    const [form, setForm] = useState({
        fantasyName: '',
        corporateReason: '',
        cnpj: '',
        address: ''
    });
    const [cnpjError, setCnpjError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {

        if (e.target.name === 'cnpj') {
            const value = e.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
            if (value.length <= 14) {
                setForm({
                    ...form,
                    [e.target.name]: value
                });
                setCnpjError('');
            } else {
                setCnpjError('O CNPJ deve conter exatamente 14 dígitos.');
            }
        } else {
            setForm({
                ...form,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(form).every(value => value !== '') && form.cnpj.length === 14) {
            try {
                await SupplierService.create(form);
                alert('Fornecedor cadastrado com sucesso!');
                navigate('/'); // Redirecionar para a lista de fornecedores
            } catch (error) {
                console.error('Erro ao cadastrar fornecedor:', error.message);
                alert('Erro ao cadastrar fornecedor!');
            }
        } else {
            alert('Por favor, preencha todos os campos do formulário e verifique o CNPJ.');
        }
    };

    return (
        <div className="container">
            <h2>Cadastrar Fornecedor</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nome Fantasia:</label>
                    <input
                        type="text"
                        name="fantasyName"
                        value={form.fantasyName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Razão Social:</label>
                    <input
                        type="text"
                        name="corporateReason"
                        value={form.corporateReason}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>CNPJ:</label>
                    <input
                        type="text"
                        name="cnpj"
                        value={form.cnpj}
                        onChange={handleChange}
                        required
                        pattern="\d{14}"
                        title="Por favor, insira um CNPJ válido com 14 dígitos."
                    />
                    {cnpjError && <span className="error-message">{cnpjError}</span>}
                </div>
                <div className="form-group">
                    <label>Endereço:</label>
                    <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">
                    Cadastrar
                </button>
            </form>
        </div>
    );
}

export default AddSupplier;
