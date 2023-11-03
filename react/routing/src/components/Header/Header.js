import styles from "./Header.module.scss";
import logo from "../../assets/images/logo.png";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className={`d-flex align-items-center ${styles.header}`}>
      <div className="flex-fill">
        <img src={logo} alt="logo du blog" />
      </div>
      <ul>
        <NavLink to="/" className={`mr10 tdn`}>
          <span>Homepage</span>
        </NavLink>
        <NavLink to="/profile" className={`mr10 tdn`}>
          <span>Profil</span>
        </NavLink>
        <NavLink to="/errorTest" className={`mr10 tdn`}>
          <span>TestPageError</span>
        </NavLink>
      </ul>
    </header>
  );
}
