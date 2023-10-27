import styles from "./MobileMenu.module.scss";

export default function MobileMenu( { setPage }) {
    return (
        <ul className={`card ${styles.mobileContainer}`}>
            <li onClick={() => setPage("Register")}>Favorites</li>
            <li onClick={() => setPage("Login")}>Login</li>
        </ul>
    )
}