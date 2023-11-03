import styles from "./Homepage.module.scss";
import Serie from "./Components/Serie.js";
import Loading from "../../components/Loading/Loading";
// import {series} from "../../data.js";
import { useEffect, useState } from "react";


export default function Homepage() {
    const [filter, setFilter] = useState("");
    const [series, setSeries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/series/getSeries",{
                    method: "GET",
                    headers: {
                        "content-Type": "application/json",
                    },
                    body: JSON.stringify()
                })
                if (response.ok) {
                    const res = await response.json();
                    setSeries(res);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [refresh])

    const handleInput = (e) => {
        const search = e.target.value;
        setFilter(search.trim().toLowerCase());
    }

    return (
        <div className="d-flex flex-column flex-fill container">
            <h1 className="mb20">Découvrez nos dedrnières critiques</h1>
            <div className={`card p20 mb20 flex-fill d-flex flex-column ${styles.contentCard}`}>
                <div className={`d-flex justify-content-center align-items-center my30 ${styles.searchBar}`}>
                    <i className="fas fa-magnifying-glass mr10"></i>
                    <input onInput={handleInput} className="flex-fill" type="text" placeholder="Search..."/>
                </div>
                <div className={`${styles.grid}`}>
                    {
                        isLoading ? (
                            <Loading />
                        ) : (
                            series.filter(serie => serie.title.toLowerCase().includes(filter)).map((el) => {return <Serie key={el.id} serie={el} setRefresh={setRefresh}/>})
                        )
                    }
                </div>
            </div>
        </div>
    )
}