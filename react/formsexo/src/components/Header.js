import styles from "./Header.module.scss";
import logo from "../assets/images/logo.png"
import { useState } from "react";
import MobileMenu from "./MobileMenu";

export default function Header({ setPage }) {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <header className={`d-flex align-items-center ${styles.header}`}>
            <div className="flex-fill">
                <img onClick={() => setPage("HomePage")} src={logo} alt="logo" />
            </div>
            <ul className={`${styles.desktopHeader}`}>
                <button onClick={() => setPage("Register")} className="mr10 btn btn-primary">
                    <i className="fas fa-star mr5"></i>
                    <span >Register</span>
                </button>
                <button onClick={() => setPage("Login")} className="mr10 btn btn-primary-reverse">
                <i className="fas fa-right-to-bracket mr10"></i>
                    <span >Login</span>
                </button>
            </ul>
            <i 
                className={`fas fa-bars mr10 ${styles.mobileHeader}`}
                onClick={() => setShowMenu(true)}
            ></i>
            {showMenu && (
                <>
                    <div onClick={() => setShowMenu(false)} className={`calc`}></div>
                    <MobileMenu setPage={setPage}/>
                </>
            )}
        </header>
    )
}