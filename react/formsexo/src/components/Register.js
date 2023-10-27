import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

function Register({ setPage }) {
  const [registerOk, setRegisterOk] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const yupSchema = yup.object({
    name: yup
      .string()
      .required("Le champ est obligatoire")
      .min(2, "Le champ doit comporter 2 caratères minimum")
      .max(12, "Le champ doit comporter 12 caratères maximum"),
    email: yup
      .string()
      .required("Le champ est obligatoire")
      .email(),
    password: yup
      .string()
      .required("Le champ est obligatoire")
      .min(5, "Le champ doit comporter 5 caractères minimum")
      .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
          "Min. 1 majuscule, 1 chiffre et 1 caractère spécial."
      ),
    confirmPassword: yup
      .string()
      .required("Le champ est obligatoire")
      .oneOf([
          yup.ref("password"), ""],
          "Les mots de passe ne correspondent pas."
      ),
    cgu: yup
      .bool()
      .oneOf([true], "Vous devez accepter"),
    hobbies: yup.array().of(
      yup.object({
        value: yup.string().required("Ce champ dout être renseigné"),
      })
    )
  });
  
  const defaultValues = {
    name: "jason",
    email: "jason.teilliez@gmail.com",
    password: "aA123456789",
    confirmPassword: "aA123456789",
    gender: "man",
    cgu: false,
    techno: "css",
    hobbies: []
  };

  const { 
    register, 
    handleSubmit, 
    formState: { errors } ,
    control,
    reset
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(yupSchema),
  });

  const {fields, append, remove} = useFieldArray({
    name: "hobbies",
    control
  })

  function addHobby() {
    append({
      value:"",
      level:"beginner"
    });
  }

  function deleteHobby(id) {
    remove(id)
  }

  async function submit (values) {
    console.log(values);
    let user = {};
    user.username = values.name;
    user.email = values.email;
    user.password = values.password;
    user.gender = values.gender;
    user.techno = values.techno;
    user.hobbies = values.hobbies;

    try {
      const response = await fetch("http://localhost:8000/addUser", {
        method: "POST",
        headers: {
          "content-Type": "application/json"
        },
        body: JSON.stringify(user),
      })
      if (response.ok) {
        const res = await response.json();
        if (res.message === "Email existant") {
            setFeedbackMessage("L'adresse mail est déjà utilisé.");
        } else {
            setFeedbackMessage("");
            setRegisterOk(true);
            setTimeout(() => {
                reset(defaultValues);
                setPage("Login");
            }, 3000);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`mh100 d-flex flex-column justify-content-center align-items-center`}>
      <form onSubmit={handleSubmit(submit)}>
        <div className="d-flex flex-column mb20">
          <label htmlFor="name" className="mb10">Nom</label>
          <input 
            type="text" 
            id="name"
            {...register("name")}
          ></input>
          {errors.name && <p className="text-error">{errors.name.message}</p>}
        </div>

        <div className="d-flex align-items-center flex-column mb20">
          <label htmlFor="email" className="mb10">Adresse mail</label>
          <input 
            type="text" 
            id="email"
            {...register("email")}
          ></input>
          {errors.email && <p className="text-error">{errors.email.message}</p>}
        </div>

        <div className="d-flex align-items-center flex-column mb20">
          <label htmlFor="password" className="mb10">Password</label>
          <input 
            type="password" 
            id="password"
            {...register("password")}
          ></input>
          {errors.password && <p className="text-error">{errors.password.message}</p>}
        </div>

        <div className="d-flex align-items-center flex-column mb20">
          <label htmlFor="confirmPassword" className="mb10">Confirme password</label>
          <input 
            type="password" 
            id="confirmPassword"
            {...register("confirmPassword")}
          ></input>
          {errors.confirmPassword && <p className="text-error">{errors.confirmPassword.message}</p>}
        </div>

        <div className="d-flex align-items-center flex-column mb20">
          <label htmlFor="gender" className="mb10">gender</label>
          <div>
            <label htmlFor="man">man</label>
            <input 
                type="radio" 
                id="man"
                value="man"
                {...register("gender")}
                ></input>
          </div>
          <div>
            <label htmlFor="woman">woman</label>
            <input 
                type="radio" 
                id="woman"
                value="woman"
                {...register("gender")}
                ></input>
          </div>
          <div>
            <label htmlFor="poulet">poulet</label>
            <input 
                type="radio" 
                id="poulet"
                value="poulet"
                {...register("gender")}
                ></input>
          </div>
          {errors.gender && <p className="text-error">{errors.gender.message}</p>}
        </div>

        <div className="d-flex flex-column align-items-center mb20">
          <label 
            htmlFor="hobbies" 
            className="mb10 d-flex justify-content-center align-items-center"
          >
          <span className="flex-fill mr10">Hobbies</span>
          <button 
            onClick={addHobby}
            type="button"
            className="btn btn-primary-reverse"
          >+</button>
          </label>
          <ul>
            {fields.map((hobby, index) => (
              <div key={hobby.id}>
                <li className="mb10">
                  <input 
                    type="text" 
                    className="flex-fill mr10"
                    {...register(`hobbies[${index}].value`)} 
                  />
                  <select
                    className="mr20"
                    {...register(`hobbies[${index}].level`)} 
                  >
                    <option value="beginner">debutant</option>
                    <option value="bigfan">pro</option>
                  </select>
                  <button 
                    className="btn btn-primary"
                    onClick={() => deleteHobby(index)}
                  >-</button>
                </li>
                {errors.hobbies && errors.hobbies[index] && (
                <p className="text-error">{errors.hobbies[index].value.message}</p>
                )}
              </div>
            ))}
          </ul>

        </div>

        <div className="d-flex align-items-center flex-column mb20">
          <label htmlFor="cgu" className="mb10">CGU</label>
          <input 
            type="checkbox" 
            id="cgu"
            {...register("cgu")}
          ></input>
          {errors.cgu && <p className="text-error">{errors.cgu.message}</p>}
        </div>

        <div className="d-flex align-items-center flex-column mb20">
          <label htmlFor="techno" className="mb10">techno préférée</label>
          <select
            id="techno"
            {...register("techno")}
          >
            <option value="css">CSS</option>
            <option value="html">HTML</option>
            <option value="js">JS</option>
            <option value="sql">SQL</option>
          </select>
        </div>

        <button className="btn btn-primary">Submit</button>

        {registerOk ? <p className="text-ok">L'inscription c'est effectué correctement, vous allez être redirigé sur la page de connexion dans 3 secondes</p> : ""}
        {feedbackMessage ? <p className="text-error">{feedbackMessage}</p> : ""}
      </form>
    </div>
  );
}

export default Register;
