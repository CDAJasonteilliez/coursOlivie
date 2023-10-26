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
    age: yup
        .number()
        .min(18, "Il faut être majeur")
  })  

  const { 
    register, 
    handleSubmit, 
    formState: {errors} 
  } = useForm({
    defaultValues:{
      name: ""
    },
    mode: "onChange",
    resolver: yupResolver(yupSchema),
  });

  function submit (values) {
    console.log(values);
  }
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
          <label htmlFor="age" className="mb10">Age</label>
          <input 
            type="number" 
            id="age"
            {...register("age", {
                valueAsNumber: true
            })}
          ></input>
          {errors.age && <p className="text-error">{errors.age.message}</p>}
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default App;
