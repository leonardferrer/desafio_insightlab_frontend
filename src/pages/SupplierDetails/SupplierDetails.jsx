import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SupplierService from "../../services/SupplierService.js";
import './SupplierDetails.css'; // Importa o arquivo de estilos

function SupplierDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [supplier, setSupplier] = useState(null);
    const [editedSupplier, setEditedSupplier] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);

    useEffect(() => {
        const fetchSupplierDetails = async () => {
            try {
                const data = await SupplierService.getOne(id);
                setSupplier(data);
                setEditedSupplier(data);
            } catch (error) {
                console.error('Erro ao buscar detalhes do fornecedor:', error.message);
            }
        };

        fetchSupplierDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedSupplier({
            ...editedSupplier,
            [name]: value
        });
        setIsSaveButtonDisabled(false);
    };


    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedSupplier(supplier);
        setIsSaveButtonDisabled(true);
    };

    const handleSave = async () => {
        try {
            await SupplierService.update(id, editedSupplier);
            alert('Fornecedor atualizado com sucesso!');
            setSupplier(editedSupplier);
            setIsEditing(false);
            setIsSaveButtonDisabled(true);
        } catch (error) {
            console.error('Erro ao atualizar fornecedor:', error.message);
            alert('Erro ao atualizar fornecedor!');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Tem certeza que deseja excluir este fornecedor?')) {
            try {
                await SupplierService.delete(id);
                alert('Fornecedor excluído com sucesso!');
                navigate('/'); // Redirecionar para a lista de fornecedores após a exclusão
            } catch (error) {
                console.error('Erro ao excluir fornecedor:', error.message);
                alert('Erro ao excluir fornecedor!');
            }
        }
    };

    if (!supplier) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="supplier-details-container">
            <h2>Detalhes do Fornecedor</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="fantasyName">Nome Fantasia:</label>
                    <input
                        type="text"
                        id="fantasyName"
                        name="fantasyName"
                        value={editedSupplier.fantasyName}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="corporateReason">Razão Social:</label>
                    <input
                        type="text"
                        id="corporateReason"
                        name="corporateReason"
                        value={editedSupplier.corporateReason}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cnpj">CNPJ:</label>
                    <input
                        type="text"
                        id="cnpj"
                        name="cnpj"
                        value={editedSupplier.cnpj}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Endereço:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={editedSupplier.address}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        required
                    />
                </div>
                <div className="buttons">
                    {!isEditing ? (
                        <button type="button" onClick={handleEdit} className="edit-button">Editar</button>
                    ) : (
                        <>
                            <button type="button" onClick={handleCancelEdit} className="cancel-button">Cancelar</button>
                            <button type="button" onClick={handleSave} className="save-button" disabled={isSaveButtonDisabled}>Salvar</button>
                        </>
                    )}
                    <button type="button" onClick={handleDelete} className="delete-button">Excluir</button>
                </div>
            </form>
        </div>
    );
}

export default SupplierDetails;


// **************************************************************************************************

/*import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SupplierService from "../../services/SupplierService.js";

function SupplierDetails() {
    const { id } = useParams();
    const [supplier, setSupplier] = useState(null);
    const [editedSupplier, setEditedSupplier] = useState(null);

    useEffect(() => {
        const fetchSupplierDetails = async () => {
            try {
                const data = await SupplierService.getOne(id);
                setSupplier(data);
                setEditedSupplier(data); // Inicialize o editedSupplier com os dados do fornecedor
            } catch (error) {
                console.error('Erro ao buscar detalhes do fornecedor:', error.message);
            }
        };

        fetchSupplierDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedSupplier({
            ...editedSupplier,
            [name]: value
        });
    };

    const handleSave = async () => {
        try {
            await SupplierService.update(id, editedSupplier);
            alert('Fornecedor atualizado com sucesso!');
            setSupplier(editedSupplier); // Atualize o estado supplier com os dados atualizados
        } catch (error) {
            console.error('Erro ao atualizar fornecedor:', error.message);
            alert('Erro ao atualizar fornecedor!');
        }
    };

    if (!supplier) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <h2>Detalhes do Fornecedor</h2>
            <div>
                <label htmlFor="fantasyName">Nome Fantasia:</label>
                <input
                    type="text"
                    id="fantasyName"
                    name="fantasyName"
                    value={editedSupplier.fantasyName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="corporateReason">Razão Social:</label>
                <input
                    type="text"
                    id="corporateReason"
                    name="corporateReason"
                    value={editedSupplier.corporateReason}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="cnpj">CNPJ:</label>
                <input
                    type="text"
                    id="cnpj"
                    name="cnpj"
                    value={editedSupplier.cnpj}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="address">Endereço:</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={editedSupplier.address}
                    onChange={handleChange}
                />
            </div>
            <button onClick={handleSave}>Salvar</button>
        </div>
    );
}

export default SupplierDetails;*/


// *******************************************************************************************************

/*
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
*/
