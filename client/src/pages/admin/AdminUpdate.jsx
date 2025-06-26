import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import bcrypt from "bcryptjs";
import assets from "../../../src/assets";
import "./AdminUpdate.css";

export default function AdminUpdate() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const { getOneProfile, updateProfile, setUser } = useAuth();
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function loadProfile() {
            if (params.id) {
                const profile = await getOneProfile(params.id);
                setValue("name", profile.name);
                setValue("username", profile.username);
                setValue("email", profile.email);
                setValue("password", "");
                setValue("telephone", profile.telephone);
                setValue("age", profile.age);
            }
        }
        loadProfile();
    }, []);

    const onSubmit = handleSubmit(async(data) => {
        if(data.password && data.password.trim() !== "") {
            const salt = bcrypt.genSaltSync(10);
            data.password = bcrypt.hashSync(data.password, salt);
        } else {
            delete data.password; 
        }
        if(params.id) {
            await updateProfile(params.id, data);

            if (params.id === user?._id) {
                const perfilActualizado = await getOneProfile(params.id);
                setUser(perfilActualizado);
            }

            navigate("/admin");
            alert("Datos actualizados");
        }
    });

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
            <div>
                <form onSubmit={onSubmit}>
                    <input type="text" {...register("name", { required: true })}
                        className=""
                        placeholder="Nombre nuevo"
                    />
                    <input type="text" {...register("username", { required: true })}
                        className=""
                        placeholder="Usuario nuevo"
                    />
                    <input type="email" {...register("email", { required: true })}
                        className=""
                        placeholder="Correo nuevo"
                    />
                    <input type="password" {...register("password")}
                        className=""
                        placeholder="Contraseña nueva"
                    />
                    <input type="text" {...register("telephone", { required: true })}
                        className=""
                        placeholder="Teléfono actualizado"
                    />
                    <input type="number" {...register("age", { required: true })}
                        placeholder="Edad actualizada"
                    />
                    <button type="submit">Actualizar datos</button>
                </form>
            </div>
        </div>
    )
};