import React, { useState } from 'react';
import SupplierService from '../../services/SupplierService.js';
import { useNavigate } from 'react-router-dom';

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
        // Validar o campo CNPJ para conter apenas números e ter 14 caracteres
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
        <div style={{ width: '75%', margin: '0 auto', marginTop: '20px' }}>
            <h2>Cadastrar Fornecedor</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Nome Fantasia:</label>
                    <input
                        type="text"
                        name="fantasyName"
                        value={form.fantasyName}
                        onChange={handleChange}
                        required
                        style={{ fontSize: '16px', padding: '8px', width: '100%' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Razão Social:</label>
                    <input
                        type="text"
                        name="corporateReason"
                        value={form.corporateReason}
                        onChange={handleChange}
                        required
                        style={{ fontSize: '16px', padding: '8px', width: '100%' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>CNPJ:</label>
                    <input
                        type="text"
                        name="cnpj"
                        value={form.cnpj}
                        onChange={handleChange}
                        required
                        style={{ fontSize: '16px', padding: '8px', width: '100%' }}
                        pattern="\d{14}" // Adiciona o padrão para 14 dígitos numéricos
                        title="Por favor, insira um CNPJ válido com 14 dígitos."
                    />
                    {cnpjError && <span style={{ color: 'red' }}>{cnpjError}</span>}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Endereço:</label>
                    <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        required
                        style={{ fontSize: '16px', padding: '8px', width: '100%' }}
                    />
                </div>
                <button type="submit" style={{ fontSize: '16px', padding: '8px', marginTop: '10px' }}>
                    Cadastrar
                </button>
            </form>
        </div>
    );
}

export default AddSupplier;
