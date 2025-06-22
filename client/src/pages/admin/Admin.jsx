import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import assets from "../../../src/assets";
import "./Admin.css";
import ButtonAddReport from "../../components/ButtonAddReport.jsx";
import ButtonAddAnuncio from "../../components/ButtonAddAnuncio.jsx";

function Admin() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState("");
    const [showButtonReporte, setShowButtonReporte] = useState(false);
    const [showButtonAnuncio, setShowButtonAnuncio] = useState(false);

    const handleButtonClick = () => {
        setShowButtonReporte(true);
    };

    const handleCloseButtonModal = () => {
        setShowButtonReporte(false);
    };

    const handleButtonClick2 = () => {
        setShowButtonAnuncio(true);
    };

    const handleCloseButtonModal2 = () => {
        setShowButtonAnuncio(false);
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    function handleNavigation(route) {
        navigate(route);
    }

    function toggleMenu() {
        setMenuOpen(!menuOpen);
    }

    function toggleForm() {
        setFormOpen(!formOpen);
    }

    return (
        <div className="user-home-container">
            <nav className="user-home-navbar">
                <div className="user-home-navbar-left">
                    
                </div>
                <div className="user-home-navbar-right">
                    <img
                        src={assets.casa}
                        alt="Inicio"
                        className="user-home-icono"
                    />
                    <div className="user-home-dropdown">
                        <Link to="/profileAdmin">
                            <img
                                src={assets.usuario1}
                                alt="Usuario"
                                className="user-home-icono-usuario"
                            />
                        </Link>
                    </div>
                    <img
                        src={assets.menu}
                        alt="Menú"
                        className="user-home-menu"
                        onClick={toggleMenu}
                    />
                </div>
            </nav>

            {menuOpen && (
                <div className="user-home-menu-desplegable">
                    <button className="menu-item" onClick={() => { handleNavigation("/admincreate") }}>
                        <img src={assets.usuario1} alt="Participantes" />
                        Agregar usuarios
                    </button>
                    <button className="menu-item" onClick={() => { handleNavigation("/admindelete") }}>
                        <img src={assets.borrar} alt="Historial" />
                        Eliminar usuarios
                    </button>
                    <button className="menu-item" onClick={handleLogout} >
                        <img src={assets.cerrarSesion} alt="Cerrar sesión" />
                        Cerrar sesión
                    </button>
                </div>
            )}

            <div className="user-home-contenido">
                <div className="user-home-select-contenedor">
                   
                </div>
                
                <div className="user-home-cards">
                    <div className="user-home-card" onClick={handleButtonClick}>
                        <img src={assets.formularioDeLlenado} alt="Reportes" />
                        <p className="user-home-card-texto">Reportes</p>
                    </div>
                    <div className="user-home-card" onClick={handleButtonClick2}>
                        <img src={assets.nota} alt="Anuncios" />
                        <p className="user-home-card-texto">Anuncios</p>
                    </div>
                    <div className="user-home-card" onClick={() => { handleNavigation("/adminpayvigilance") }}>
                        <img src={assets.dinero} alt="Gestión de pagos" />
                        <p className="user-home-card-texto">Gestión de pagos</p>
                    </div>
                </div>
            </div>
            {showButtonReporte && <ButtonAddReport onClose={handleCloseButtonModal}/>}
            {showButtonAnuncio && <ButtonAddAnuncio onClose={handleCloseButtonModal2}/>}
        </div>
    );
}

export default Admin;
