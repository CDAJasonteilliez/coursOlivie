import styles from "./Header.module.scss";
import logo from "../../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context";

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  return (
    <header className={`d-flex align-items-center ${styles.header}`}>
      <div className="flex-fill">
        <NavLink to="/" className={`mr10 tdn`}>
          <img src={logo} alt="logo du blog" />
        </NavLink>
      </div>
      { user ? (
        <ul>
          <NavLink className={`mr10 tdn`}>
            <span onClick={() => setUser(null)}>Logout</span>
          </NavLink>
          <NavLink to="/profile" className={`mr10 tdn`}>
            <span>Profile</span>
          </NavLink>
        </ul>
      ) : (
        <ul>
          <NavLink to="/login" className={`mr10 tdn`}>
            <span>Login</span>
          </NavLink>
          <NavLink to="/register" className={`mr10 tdn`}>
            <span>Register</span>
          </NavLink>
        </ul>
      )
    }
    </header>
  );
}
