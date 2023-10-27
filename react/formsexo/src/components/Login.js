import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Login = () => {
    const yupSchema = yup.object({
        email: yup
        .string()
        .required("Le champ est obligatoire"),
        password: yup
        .string()
        .required("Le champ est obligatoire")        
    });

    const defaultValues = {
        email: "",
        password: ""
    };

    const { 
        register, 
        handleSubmit, 
        formState: { errors } ,
        control,
        reset
    } = useForm({
        defaultValues,
        resolver: yupResolver(yupSchema),
    });

    const submit = () => {
        console.log('bonjour');
    }

    return (
        
        <div className={`mh100 d-flex flex-column justify-content-center align-items-center`}>
            <h1 className={`mb50`}>Connexion</h1>

            <form onSubmit={handleSubmit(submit)}>
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
                    <label htmlFor="password" className="mb10">Mot de passe</label>
                    <input 
                        type="password" 
                        id="password"
                        {...register("password")}
                    ></input>
                    {errors.password && <p className="text-error">{errors.password.message}</p>}
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>

    )
}

export default Login