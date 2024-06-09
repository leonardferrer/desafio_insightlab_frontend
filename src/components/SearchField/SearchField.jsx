import React from 'react';
import './SearchField.css';
import {useNavigate} from "react-router-dom";

function SearchField({ searchTerm, setSearchTerm, handleSearch }) {
    const navigate = useNavigate();

    const handleAddSupplier = () => {
        navigate('/add');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="search-container">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Digite a razao social" className="search-input"
            />
            <button onClick={handleSearch}  className="search-button">Pesquisar</button>
            <button onClick={handleAddSupplier} className="filter-button">Cadastrar</button>
        </div>
    );
}

export default SearchField;
