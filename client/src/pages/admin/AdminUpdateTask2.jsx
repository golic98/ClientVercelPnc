import { useForm } from "react-hook-form";
import { useTask } from "../../context/TaskContext";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import assets from "../../../src/assets";
import "./AdminUpdateTask.css";

export default function AdminUpdateTask2() {

    const { register, handleSubmit, setValue } = useForm();
    const { updateTask2, oneTask2 } = useTask();
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                const task = await oneTask2(params.id);
                setValue("title2", task.title2);
                setValue("description2", task.description2);
            }
        }
        loadTask();
    }, []);

    const onSubmit = handleSubmit((data) => {
        if (params.id) {
            updateTask2(params.id, data);
            navigate("/admincreateanuncios");
        }
    });

    return (
        <div>
            <div>
                <nav className="user-home-navbar">
                    <div className="user-home-navbar-left">
                        <Link>
                            <img src={assets.meg} alt="Logo MEG" className="user-home-logo" />
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
                    <input type="text" placeholder="Titulo nuevo"
                        {...register("title2")}
                        autoFocus
                        className=""
                    />
                    <div>
                        <textarea rows={3} placeholder="Descripción nueva"
                            {...register("description2")}
                            className=""
                        ></textarea>
                    </div>
                    <button type="submit">
                        Actualizar datos
                    </button>
                </form>
            </div>
        </div>
    )
};