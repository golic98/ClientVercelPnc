import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import assets from "../../../src/assets";
import "./Profile.css";

export default function Profile() {
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
                        <Link to="/user">
                            <img
                                src={assets.casa}
                                alt="Inicio"
                                className="user-home-icono"
                            />
                        </Link>
                        <div className="user-home-dropdown">
                            <Link to="/profile">
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
                        <h2>{user.username}</h2>
                        <p className="description">Bienvenido a tu perfil {user.name}</p>
                        <Link to={`/profile/${user.id}`} className="edit-button">Editar Perfil</Link>
                    </div>
                    <div className="right-side">
                        <div className="info-card">
                            <h3>Nombre:</h3>
                            <p>{profile.name}</p>
                            <h3>Email:</h3>
                            <p>{profile.email}</p>
                            <h3>Edad:</h3>
                            <p>{profile.age}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
};