import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import assets from "../../../src/assets";
import { useLocation } from "react-router-dom";
import "./AdminProfile.css";

export default function AdminProfile() {
    const { user, getOneProfile } = useAuth();
    const [profile, setProfile] = useState(user);
    const location = useLocation();

    useEffect(() => {
        const fetchProfile = async () => {
            const updated = await getOneProfile(user.id);
            setProfile(updated);
        };
        if (user?.id) fetchProfile();
    }, [user?.id, location.key]);

    if (!profile) return <p>Cargando...</p>;

    return (
        <div>
            <div>
                <nav className="user-home-navbar">
                    <div className="user-home-navbar-left">
                        <Link>

                        </Link>
                    </div>
                    <div className="user-home-navbar-right">
                        <Link to="/admin">
                            <img
                                src={assets.casa}
                                alt="Inicio"
                                className="user-home-icono"
                            />
                        </Link>
                        <div className="user-home-dropdown">
                            <Link to="/profileAdmin">
                                <img
                                    src={assets.usuario1}
                                    alt="Usuario"
                                    className="user-home-icono-usuario"
                                />
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
            <main className="main-content">
                <div className="content-container">
                    <div className="left-side">
                        <img src={assets.usuario1} alt="Usuario" className="profile-pic" />
                        <h2>Administrador</h2>
                        <p className="description">Administrador general de ésta organización</p>
                        <Link to={`/editAdmin/${user.id}`} className="edit-button">Editar Perfil</Link>
                    </div>
                    <div className="right-side">
                        <div className="info-card">
                            <h3>Nombre:</h3>
                            <p>{profile.name}</p>
                            <h3>Email:</h3>
                            <p>{profile.email}</p>
                            <h3>Edad:</h3>
                            <p>{profile.age}</p>
                            <h3>Contacto</h3>
                            <p>{profile.telephone}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
};