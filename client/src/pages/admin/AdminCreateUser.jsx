import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "./AdminCreateUser.css";
import assets from "../../../src/assets";

export default function AdminCreateUser() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, logout, errors: registerErrors } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    useEffect(() => {
        if (submitted) {
            if (registerErrors.length === 0) {
                setSuccessMessage("¡Cuenta creada con éxito!");
            }
            setSubmitted(false);
        }
    }, [registerErrors, submitted]);

    const onSubmit = handleSubmit(async (values) => {
        try {
            const payload = {
                name: values.name,
                username: values.username,
                email: values.email,
                telephone: values.telephone,
                age: values.age,
                role: values.role,
                password: values.password,
            };

            await createUser(payload);
            setSubmitted(true);
            navigate("/admin");
        } catch (error) {
            console.error("Error al crear el usuario:", error);
            alert("Hubo un error al crear el usuario. Intenta de nuevo.");
        }
    });

    return (
        <div className="admin-create-container">
            <header className="admin-create-header">
                <div className="logo-container">

                </div>
                <div className="header-icons">
                    <img
                        src={assets.casa}
                        alt="Inicio"
                        className="menu-icon"
                        onClick={() => navigate("/admin")}
                    />
                    <div className="profile-menu">
                        <button
                            className="profile-button"
                            onClick={toggleMenu}
                        >
                            <img
                                src={assets.usuario1}
                                alt="Perfil"
                                className="profile-icon"
                            />
                        </button>
                        {isMenuOpen && (
                            <div className={`dropdown-menu ${isMenuOpen ? 'open' : ''}`}>
                                <Link to="/profileAdmin" className="menu-item">
                                    <img src={assets.ojo} alt="Ver perfil" className="menu-item-icon" />
                                    Ver perfil
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="menu-item"
                                >
                                    <img src={assets.cerrarSesion} alt="Cerrar sesión" className="menu-item-icon" />
                                    Cerrar sesión
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <main className="admin-create-main">
                <div className="form-container">
                    <header className="form-header">
                        <h2>Creación de Usuario</h2>
                    </header>
                    {successMessage && (
                        <div className="success-message">
                            <p>{successMessage}</p>
                        </div>
                    )}
                    {errorMessage && (
                        <div className="error-messages">
                            <p>{errorMessage}</p>
                        </div>
                    )}
                    <form onSubmit={onSubmit} className="form">
                        <div className="form-group">
                            <label htmlFor="name">Nombre</label>
                            <input type="text" {...register("name", { required: true })}
                                placeholder="Ingrese el nombre del usuario"
                            />
                            {errors.name && <p className="register-error-text">El nombre es requerido</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" {...register("username", { required: true })}
                                className=""
                                placeholder="Ingrese su usuario nuevo"
                            />
                            {errors.username && <p className="register-error-text">El usuario es requerido</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" {...register("email", { required: true })}
                                className=""
                                placeholder="Ingrese su email"
                            />
                            {errors.email && <p className="register-error-text">El email es requerido</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" {...register("password", { required: true })}
                                className=""
                                placeholder="Ingrese una contraseña para el usuario"
                            />
                            {errors.password && <p className="register-error-text">La contraseña es requerida</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="telephone">Teléfono</label>
                            <input type="text" {...register("telephone", { required: true })}
                                className=""
                                placeholder="Ingrese el número de telefono"
                            />
                            {errors.telephone && <p className="register-error-text">El teléfono es requerido</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="age">Edad</label>
                            <input
                                type="number"
                                {...register("age", { required: true })}
                                placeholder="Ingrese su edad"
                                min="0"
                                step="1"
                            />
                            {errors.age && <p className="register-error-text">La edad es requerida</p>}
                        </div>
                        <div className="form-group">
                            <select
                                {...register("role", { required: true })}
                                className="register-input"
                                defaultValue="normal"
                            >
                                <option value="normal">Normal</option>
                                <option value="vigilant">Vigilant</option>
                                <option value="admin">Admin</option>
                            </select>
                            {errors.role && <p className="register-error-text">El rol es requerido</p>}
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                className="cancel-button"
                                onClick={() => reset()}
                            >
                                Cancelar
                            </button>
                            <button type="submit" className="submit-button">
                                Crear cuenta
                            </button>
                        </div>
                    </form>
                    <br />
                    {registerErrors.map((error, i) => (
                        <div key={i} className="register-error">
                            {error}
                        </div>
                    ))}
                    {successMessage && (
                        <div className="register-error">
                            {successMessage}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}