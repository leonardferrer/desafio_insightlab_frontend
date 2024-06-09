import { useState, useEffect } from 'react';
import SupplierService from "../../services/SupplierService.js";
import SearchField from "../../components/SearchField/SearchField.jsx";
import CustomModal from "../../components/CustomModal/CustomModal.jsx";
import {Link} from "react-router-dom";

function SupplierList() {
    const [suppliers, setSuppliers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const data = await SupplierService.getAll();
                setSuppliers(data);
            } catch (error) {
                setModalMessage('Erro ao buscar fornecedores: ' + error.message);
                setModalIsOpen(true);
            }
        };

        fetchSuppliers();
    }, []);

    const handleSearch = async () => {
        try {
            const data = await SupplierService.searchByName(searchTerm);
            setSuppliers(data);
        } catch (error) {
            setModalMessage('Erro ao buscar fornecedores: ' + error.message);
            setModalIsOpen(true);
        }
    };

    const handleDelete = async (id) => {
        try {
            await SupplierService.delete(id);
            const updatedSuppliers = suppliers.filter(supplier => supplier.idSupplier !== id);
            setSuppliers(updatedSuppliers);
            setModalMessage('Fornecedor excluído com sucesso!');
            setModalIsOpen(true);
        } catch (error) {
            setModalMessage('Erro ao excluir fornecedor: ' + error.message);
            setModalIsOpen(true);
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div style={{ width: '75%', margin: '0 auto' }}>
            <SearchField
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
            />
            <h1 style={{ textAlign: 'center' }}>Fornecedores</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr>
                    <th style={{ border: '1px solid black', padding: '8px' }}>NOME</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>RAZÃO SOCIAL</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>AÇÕES</th>
                </tr>
                </thead>
                <tbody>
                {suppliers.map(supplier => (
                    <tr key={supplier.idSupplier}>
                        <td style={{border: '1px solid black', padding: '8px'}}>{supplier.fantasyName}</td>
                        <td style={{border: '1px solid black', padding: '8px'}}>{supplier.corporateReason}</td>
                        <td style={{border: '1px solid black', padding: '8px'}}>
                            <Link to={`/details/${supplier.idSupplier}`}
                                  style={{textDecoration: 'none', color: 'blue'}}>
                                Ver detalhes
                            </Link>
                        </td>
                        <td style={{border: '1px solid black', padding: '8px'}}>
                            <button onClick={() => handleDelete(supplier.idSupplier)}>Excluir</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <CustomModal isOpen={modalIsOpen} message={modalMessage} closeModal={closeModal}/>
        </div>
    );
}

export default SupplierList;

/*
import { useState, useEffect } from 'react';
import SupplierService from "../../services/SupplierService.js";
import SearchField from "../../components/SearchField/SearchField.jsx";
import {Link} from "react-router-dom";
import error from "eslint-plugin-react/lib/util/error.js";

function SupplierList() {
    const [suppliers, setSuppliers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const data = await SupplierService.getAll();
                setSuppliers(data);
            } catch (error) {
                console.error('Erro ao buscar fornecedores:', error.message);
            }
        };

        fetchSuppliers();
    }, []);

    const handleSearch = async () => {
        try {
            const data = await SupplierService.searchByName(searchTerm);
            setSuppliers(data);
            alert('dcd');
        } catch (error) {
            console.error('Erro ao buscar fornecedores:', error.message);
        }
    };

    return (
        <div style={{ width: '75%', margin: '0 auto' }}>
            <SearchField
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
            />
            <h1 style={{ textAlign: 'center' }}>Fornecedores</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr>
                    <th style={{ border: '1px solid black', padding: '8px' }}>COD. FORNECEDOR</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>NOME</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>AÇÕES</th>
                </tr>
                </thead>
                <tbody>
                {suppliers.map(supplier => (
                    <tr key={supplier.idSupplier}>
                        <td style={{ border: '1px solid black', padding: '8px' }}>{supplier.idSupplier}</td>
                        <td style={{ border: '1px solid black', padding: '8px' }}>{supplier.corporateReason}</td>
                        <td style={{ border: '1px solid black', padding: '8px' }}>
                            <Link to={`/details/${supplier.idSupplier}`} style={{ textDecoration: 'none', color: 'blue' }}>
                                Ver detalhes
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default SupplierList;
*/
