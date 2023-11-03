import styles from "./Serie.module.scss";
import { useState } from "react";


export default function Serie({ serie, setRefresh }) {
    const {id, title, image , like } = serie

    const handleClick = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/series/patchLike", {
                method: "PATCH",
                headers: {
                    "content-Type": "application/json",
                },
                body: JSON.stringify({
                    id:id,
                    like:like
                })
            });
            if (response.ok) {
                const res = await response.json();
                setRefresh((curr) => curr+1);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/series/deleteLike", {
                method: "DELETE",
                headers: {
                    "content-Type": "application/json",
                },
                body: JSON.stringify({
                    id:id
                })
            });
            if (response.ok) {
                const res = await response.json();
                setRefresh((curr) => curr+1);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={`${styles.serie}`}>
            <div className={`${styles.imgContainer}`}>
                <img src={image} alt="oneSerie"></img>
                <i onClick={handleDelete} className={`fa-regular fa-trash-can`}></i>
            </div>
            <div  className={`${styles.title} d-flex flex-column justify-content-center align-items-center`}>
                <h3 className="mb10" >{title}</h3>
                <i onClick={handleClick} className={`fas fa-heart ${like ? "text-liked": ""}`}></i>
            </div>
        </div>
    );
}