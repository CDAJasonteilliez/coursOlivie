import styles from "./Header.module.scss";
import logo from "../assets/images/logo.png";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

export default function Header({ setPage, setAuth, auth }) {
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setAuth(-1);
    setPage("HomePage");
  };

  return (
    <header className={`d-flex align-items-center ${styles.header}`}>
      <div className="flex-fill">
        <img onClick={() => setPage("HomePage")} src={logo} alt="logo" />
      </div>
      <ul className={`${styles.desktopHeader}`}>
        {auth === -1 ? (
          <button
            onClick={() => setPage("Register")}
            className="mr10 btn btn-primary"
          >
            <i className="fas fa-star mr5"></i>
            <span>Register</span>
          </button>
        ) : (
          ""
        )}
        {auth === -1 ? (
          <button
            onClick={() => setPage("Login")}
            className="mr10 btn btn-primary-reverse"
          >
            <i className="fas fa-right-to-bracket mr10"></i>
            <span>Login</span>
          </button>
        ) : (
          ""
        )}
        {auth !== -1 ? (
          <button onClick={() => logout()} className="mr10 btn btn-primary">
            <i className="fas fa-right-from-bracket mr10"></i>
            <span>logout</span>
          </button>
        ) : (
          ""
        )}
        {auth !== -1 ? (
          <button
            onClick={() => setPage("Profil")}
            className="mr10 btn btn-primary-reverse"
          >
            <i className="fa-regular fa-user mr10"></i>
            <span>Profil</span>
          </button>
        ) : (
          ""
        )}
      </ul>
      <i
        className={`fas fa-bars mr10 ${styles.mobileHeader}`}
        onClick={() => setShowMenu(true)}
      ></i>
      {showMenu && (
        <>
          <div onClick={() => setShowMenu(false)} className={`calc`}></div>
          <MobileMenu setPage={setPage} auth={auth} logout={logout} />
        </>
      )}
    </header>
  );
}
