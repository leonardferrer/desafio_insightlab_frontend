import { useState, useEffect } from 'react';
import SupplierService from "../../services/SupplierService.js";
import SearchField from "../../components/SearchField/SearchField.jsx";
import CustomModal from "../../components/CustomModal/CustomModal.jsx";
import { Link } from "react-router-dom";
import './SuppliersList.css';

function SupplierList() {
    const [suppliers, setSuppliers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [loading, setLoading] = useState(false); // Estado de carregamento

    useEffect(() => {
        const fetchSuppliers = async () => {
            setLoading(true);
            try {
                const data = await SupplierService.getAll();
                setSuppliers(data);
            } catch (error) {
                setModalMessage('Erro ao buscar fornecedores: ' + error.message);
                setModalIsOpen(true);
            } finally {
                setLoading(false);
            }
        };

        fetchSuppliers();
    }, []);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const data = await SupplierService.searchByName(searchTerm);
            setSuppliers(data);
        } catch (error) {
            setModalMessage('Erro ao buscar fornecedores: ' + error.message);
            setModalIsOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await SupplierService.delete(id);
            const updatedSuppliers = suppliers.filter(supplier => supplier.idSupplier !== id);
            setSuppliers(updatedSuppliers);
            setModalMessage('Fornecedor excluído com sucesso!');
            setModalIsOpen(true);
        } catch (error) {
            setModalMessage('Erro ao excluir fornecedor: ' + error.message);
            setModalIsOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className="container">
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <>
                    <SearchField
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleSearch={handleSearch}
                    />
                    <h1>Fornecedores</h1>
                    <table>
                        <thead>
                        <tr>
                            <th>NOME</th>
                            <th>RAZÃO SOCIAL</th>
                            <th colSpan="2" className="actions-cell">AÇÕES</th>
                        </tr>
                        </thead>
                        <tbody>
                        {suppliers.map(supplier => (
                            <tr key={supplier.idSupplier}>
                                <td>{supplier.fantasyName}</td>
                                <td>{supplier.corporateReason}</td>
                                <td>
                                    <Link to={`/details/${supplier.idSupplier}`} className="link">
                                        Ver detalhes
                                    </Link>
                                </td>
                                <td>
                                    <button className="delete-button" onClick={() => handleDelete(supplier.idSupplier)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </>
            )}
            <CustomModal isOpen={modalIsOpen} message={modalMessage} closeModal={closeModal}/>
        </div>
    );
}

export default SupplierList;
