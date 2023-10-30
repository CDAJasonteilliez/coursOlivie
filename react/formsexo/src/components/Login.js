import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

const Login = ({ setPage, setAuth }) => {
  const [feedbackMessage, setFeedbackMessage] = useState({
    message: "",
    color: "",
  });

  const yupSchema = yup.object({
    email: yup.string().required("Le champ est obligatoire"),
    password: yup.string().required("Le champ est obligatoire"),
  });

  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(yupSchema),
  });

  async function submit(values) {
    let user = {};
    user.email = values.email;
    user.password = values.password;
    try {
      const response = await fetch("http://localhost:8000/getUserByEmail", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const res = await response.json();
        if (res.message === "Connection refuse") {
          setFeedbackMessage({
            message: "Adresse mail ou mot de passe incorrecte",
            color: "text-error",
          });
        } else {
          setAuth(res.id);
          setFeedbackMessage({
            message:
              "Connexion réussi, vous allez être redirigé sur la page d'accueil dans 3 secondes",
            color: "text-ok",
          });
          setTimeout(() => {
            reset(defaultValues);
            setPage("HomePage");
          }, 3000);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className={`mh100 d-flex flex-column justify-content-center align-items-center`}
    >
      <h1 className={`mb50`}>Connexion</h1>

      <form onSubmit={handleSubmit(submit)}>
        <div className="d-flex flex-column mb20">
          <label htmlFor="email" className="mb10">
            Adresse mail
          </label>
          <input type="text" id="email" {...register("email")}></input>
          {errors.email && <p className="text-error">{errors.email.message}</p>}
        </div>
        <div className="d-flex flex-column mb20">
          <label htmlFor="password" className="mb10">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
          ></input>
          {errors.password && (
            <p className="text-error">{errors.password.message}</p>
          )}
        </div>
        <button className="btn btn-primary">Submit</button>
        {feedbackMessage.message && (
          <p className={feedbackMessage.color}>{feedbackMessage.message}</p>
        )}
      </form>
    </div>
  );
};

export default Login;
