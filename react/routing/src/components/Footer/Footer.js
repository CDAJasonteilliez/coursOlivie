import { NavLink } from "react-router-dom";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer
      className={`d-flex justify-content-center align-items-center p20 ${styles.footer}`}
    >
      Copyright © 2023 MySeriesBlog Inc.
      <NavLink className={`ml20 tdn white`} to="legal#RGPD">
        Rgpd
      </NavLink>
      <NavLink className={`ml20 tdn white`} to="legal#CGU">
        CGU
      </NavLink>
      <NavLink className={`ml20 tdn white`} to="legal#COOKIE">
        COOKIE
      </NavLink>
    </footer>
  );
}
