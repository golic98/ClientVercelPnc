import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CardShowUserAdmin from "../../components/CardShowUserAdmin";
import "./AdminDeleteUser.css";
import assets from "../../../src/assets";

export default function AdminDeleteUser() {
    const { getAdminUsers, getUsers, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const goToProfile = () => {
        navigate("/profileAdmin");
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const handleNavigateToAdmin = () => {
        navigate("/admin");
    };

    return (
        <div>
            <nav className="admin-navbar">
                <div className="logo-container">
                    
                </div>
                <div className="nav-icons">
                    <img
                        src={assets.casa}
                        alt="Inicio"
                        onClick={handleNavigateToAdmin}
                    />
                    <div className="profile-menu">
                        <button
                            className="profile-button"
                            onClick={toggleMenu}
                        >
                            <img
                                src={assets.usuario1}
                                alt="Usuario"
                            />
                        </button>
                        {isMenuOpen && (
                            <div className={`dropdown-menu ${isMenuOpen ? 'open' : ''}`}>
                                <div className="menu-item" onClick={goToProfile}>
                                    <img src={assets.ojo} alt="Ver perfil" className="menu-item-icon" />
                                    Ver perfil
                                </div>
                                <div className="menu-item" onClick={handleLogout}>
                                    <img src={assets.cerrarSesion} alt="Cerrar sesión" className="menu-item-icon" />
                                    Cerrar sesión
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <div className="admin-header">
                <h2>Lista de usuarios</h2>
            </div>

            <div className="admin-users-container">
                {getAdminUsers.map((usr) => (
                    <CardShowUserAdmin
                        user={usr.name}
                        key={usr.id}
                    />
                ))}
            </div>
        </div>
    );
}