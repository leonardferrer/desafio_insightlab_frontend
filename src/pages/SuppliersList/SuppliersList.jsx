import { useState, useEffect } from 'react';
import SupplierService from "../../services/SupplierService.js";
import SearchField from "../../components/SearchField/SearchField.jsx";
import {Link} from "react-router-dom";

function SupplierList() {
    const [suppliers, setSuppliers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
               /* const data = await SupplierService.getAll();
                setSuppliers(data);*/
            } catch (error) {
                console.error('Erro ao buscar fornecedores:', error.message);
            }
        };

        fetchSuppliers();
    }, []);

    const handleSearch = async () => {
        try {
            const data = await SupplierService.searchByName(searchTerm);
            console.log(data);
            setSuppliers(data);
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
                            {/*<a href={supplier.links[0].href} style={{ textDecoration: 'none', color: 'blue' }}>
                                Ver detalhes
                            </a>*/}
                            {/* Link para os detalhes do fornecedor */}
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
