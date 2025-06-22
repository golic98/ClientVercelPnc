import { MdDelete } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import "./AdminDeleteUser.css";

export default function UserCard({usr}) {

    return(
        <div>
            <div className="card">
                <h2>{usr.username}</h2>
                <p>{usr.email}</p>
            </div>
        </div>
    )
};