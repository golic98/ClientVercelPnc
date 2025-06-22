import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTask } from "../../context/TaskContext";
import { useEffect, useState } from "react";
import TaskCardAdmin from "../../components/TaskCardAdmin.jsx";
import assets from "../../../src/assets";
import "./AdminCreateReports.css";

function AdminCreateReports() {

    const { register, handleSubmit, setValue } = useForm();
    const { createTask, tasksAdmin, getTaskAdmin } = useTask();
    const [imageBase64, setImageBase64] = useState("");
    const [imageError, setImageError] = useState("");

    useEffect(() => {
        getTaskAdmin();
    }, []);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
            if (!validImageTypes.includes(file.type)) {
                setImageError("Por favor, selecciona un archivo de imagen válido, por ejemplo: JPG, PNG, GIF, WEBP.");
                setImageBase64("");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setImageBase64(reader.result);
                setValue("image", reader.result);
                setImageError("");
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = handleSubmit((data) => {
        if (imageBase64) {
            const formData = { ...data, image: imageBase64 };
            createTask(formData);
        } else {
            setImageError("La imagen no es válida o no se ha seleccionado ninguna.");
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

            <div className="add-topic">
                <form onSubmit={onSubmit}>
                    <div>
                        <input
                            type="text"
                            placeholder="Ingrese el titulo de su reporte"
                            {...register("title")}
                            autoFocus
                        />
                    </div>
                    <div>
                        <textarea
                            rows={3}
                            placeholder="Descripción"
                            {...register("description")}
                        ></textarea>
                    </div>
                    <div>
                        <input
                            type="file"
                            onChange={handleImageChange}
                        />
                        {imageError && <p style={{ color: "red" }}>{imageError}</p>} { }
                    </div>
                    <button type="submit">Publicar</button>
                </form>
            </div>
            <div>
                {
                    tasksAdmin.map(task => (<TaskCardAdmin task={task} key={task._id} />))
                }
            </div>
        </div>
    )
}

export default AdminCreateReports;
