import styles from "./MobileMenu.module.scss";

export default function MobileMenu() {
    return (
        <ul className={`card ${styles.mobileContainer}`}>
            <li>Favorites</li>
            <li>login</li>
        </ul>
    )
}