import { useForm } from "react-hook-form";

function App() {
  const { 
    register, 
    handleSubmit, 
    formState: {errors} 
  } = useForm({
    defaultValues:{
      name: "Jane"
    }
  });

  function submit (values) {
    console.log(values);
  }
  return (
    <div className={`mh100 d-flex flex-column justify-content-center align-items-center`}>
      <form onSubmit={handleSubmit(submit)}>
        <div className="d-flex flex-column mb20">
          <label htmlFor="name">Nom</label>
          <input 
            type="text" 
            id="name"
            {...register("name",{
              required: {
                value: true,
                message: 'Ce champ doit être remplie.'
              },
              minLength: {
                value: 3,
                message: "Le champ doit contenir 3 caractères"
              }
            })}
          ></input>
          {errors?.name && <p className="text-error">{errors.name.message}</p>}
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default App;
