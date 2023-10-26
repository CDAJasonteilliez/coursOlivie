import styles from "./Serie.module.scss";
import { useState } from "react";


export default function Serie({ title, image }) {
    const [liked, setLiked] = useState(false);

    const handleClick = () => {
        setLiked(!liked);
    }

    return (
        <div className={`${styles.serie}`}>
            <div className={`${styles.imgContainer}`}>
                <img src={image} alt="oneSerie"></img>
            </div>
            <div onClick={handleClick} className={`${styles.title} d-flex flex-column justify-content-center align-items-center`}>
                <h3 className="mb10" >{title}</h3>
                <i className={`fas fa-heart ${liked ? "text-liked": ""}`}></i>
            </div>
        </div>
    );
}