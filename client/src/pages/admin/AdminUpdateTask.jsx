import { useForm } from "react-hook-form";
import { useTask } from "../../context/TaskContext";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import assets from "../../../src/assets";
import "./AdminUpdateTask.css";

export default function AdminUpdateTask() {

    const { register, handleSubmit, setValue } = useForm();
    const { updateTask, oneTask } = useTask();
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                const task = await oneTask(params.id);
                setValue("title", task.title);
                setValue("description", task.description);
            }
        }
        loadTask();
    }, []);

    const handleReload = () => {
        window.location.reload();
    };

    const onSubmit = handleSubmit((data) => {
        if (params.id) {
            updateTask(params.id, data);
            navigate("/admin");
            alert("Actualizado");
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
                    <input type="text" placeholder="Titulo nuevo"
                        {...register("title")}
                        autoFocus
                        className=""
                    />
                    <div>
                        <textarea rows={3} placeholder="Descripción nueva"
                            {...register("description")}
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