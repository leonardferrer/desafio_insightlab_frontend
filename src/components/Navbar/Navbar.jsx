import React from 'react';
import './Navbar.css';
import {Link} from "react-router-dom"; // Importando o arquivo de estilos CSS

function Navbar() {
    return (
        <nav className="navbar">
            {/*<div className="logo"> DevLab </div>*/}
            <Link to="/" className="logo">DevLab</Link>

        </nav>
    );
}

export default Navbar;
