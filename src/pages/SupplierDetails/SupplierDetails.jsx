import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SupplierService from "../../services/SupplierService.js";

function SupplierDetails() {
    const { id } = useParams();
    const [supplier, setSupplier] = useState(null);

    useEffect(() => {
        const fetchSupplierDetails = async () => {
            try {
                const data = await SupplierService.getOne(id);
                setSupplier(data);
            } catch (error) {
                console.error('Erro ao buscar detalhes do fornecedor:', error.message);
            }
        };

        fetchSupplierDetails();
    }, [id]);

    if (!supplier) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <h2>Detalhes do Fornecedor</h2>
            <p><strong>Nome Fantasia:</strong> {supplier.fantasyName}</p>
            <p><strong>Razão Social:</strong> {supplier.corporateReason}</p>
            <p><strong>CNPJ:</strong> {supplier.cnpj}</p>
            <p><strong>Endereço:</strong> {supplier.address}</p>
        </div>
    );
}

export default SupplierDetails;
