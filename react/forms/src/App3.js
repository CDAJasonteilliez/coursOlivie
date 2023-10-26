import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function App() {
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
        .oneOf([true], "Vous devez accepter")
  })  

  const { 
    register, 
    handleSubmit, 
    formState: {errors} 
  } = useForm({
    defaultValues:{
      name: "jason",
      email: "jason.teilliez@gmail.com",
      password: "aA123456789",
      confirmPassword: "aA123456789",
      gender: "man",
      cgu: false,
      techno: "css"
    },
    mode: "onChange",
    resolver: yupResolver(yupSchema),
  });

  async function submit (values) {
    console.log(values);
    try {
      await fetch("http://localhost:8000/addUser", {
        method: "POST",
        headers: {
          "content-Type": "application/json"
        },
        body: JSON.stringify(values),
      })
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

        <div className="d-flex flex-column mb20">
          <label htmlFor="email" className="mb10">Adresse mail</label>
          <input 
            type="text" 
            id="email"
            {...register("email")}
          ></input>
          {errors.email && <p className="text-error">{errors.email.message}</p>}
        </div>

        <div className="d-flex flex-column mb20">
          <label htmlFor="password" className="mb10">Password</label>
          <input 
            type="password" 
            id="password"
            {...register("password")}
          ></input>
          {errors.password && <p className="text-error">{errors.password.message}</p>}
        </div>

        <div className="d-flex flex-column mb20">
          <label htmlFor="confirmPassword" className="mb10">Confirme password</label>
          <input 
            type="password" 
            id="confirmPassword"
            {...register("confirmPassword")}
          ></input>
          {errors.confirmPassword && <p className="text-error">{errors.confirmPassword.message}</p>}
        </div>

        <div className="d-flex flex-column mb20">
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

        <div className="d-flex flex-column mb20">
          <label htmlFor="cgu" className="mb10">CGU</label>
          <input 
            type="checkbox" 
            id="cgu"
            {...register("cgu")}
          ></input>
          {errors.cgu && <p className="text-error">{errors.cgu.message}</p>}
        </div>

        <div className="d-flex flex-column mb20">
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
      </form>
    </div>
  );
}

export default App;
