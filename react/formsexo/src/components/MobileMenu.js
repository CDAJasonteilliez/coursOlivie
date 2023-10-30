import styles from "./MobileMenu.module.scss";

export default function MobileMenu({ setPage, auth, logout }) {
  return (
    <ul className={`card ${styles.mobileContainer}`}>
      {auth === -1 ? (
        <li onClick={() => setPage("Register")}>Favorites</li>
      ) : (
        ""
      )}
      {auth === -1 ? <li onClick={() => setPage("Login")}>Login</li> : ""}
      {auth !== -1 ? <li onClick={() => logout()}>Logout</li> : ""}
      {auth !== -1 ? <li onClick={() => setPage("Profil")}>Profil</li> : ""}
    </ul>
  );
}
