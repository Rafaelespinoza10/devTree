import { useForm } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";
import { searchAvailableHandle } from "../../api/DevTreeApi";
import { Link } from "react-router-dom";

export const SearchFormData = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { handle: "" },
  });

  const mutation = useMutation({
    mutationFn: searchAvailableHandle,
  });

  const handle = watch("handle");

  const handleSearchSubmit = () => {
    // const slug = slugfy(handle);
    mutation.mutate(handle);

    console.log(mutation);
  };

  return (
    <form onSubmit={handleSubmit(handleSearchSubmit)} className="space-y-5">
      <div className="relative flex items-center bg-white px-2">
        <label htmlFor="handle">devtree.com/</label>
        <input
          type="text"
          id="handle"
          className="border-none bg-transparent p-2 focus:ring-0 flex-1"
          placeholder="elonmusk, zuck, jeffbezos"
          {...register("handle", {
            required: "Un Nombre de Usuario es obligatorio",
          })}
        />
      </div>
      {errors.handle && (
        <p className="text-red-500">El Nombre de usuario es obligatorio</p>
      )}

      <div className="mt-10">
        {mutation.isPending && (
          <p className="text-white text-center font-black text-lg">
            Cargando...
          </p>
        )}
        {mutation.error && (
          <p className="text-red-600 text-center font-black text-lg">
           {mutation.error.message}
          </p>
        )}
        {mutation.data && (
          <p className="text-green-600 text-center font-black text-lg">
            {mutation.data.message} ir a <Link to="/auth/register" state={{ handle: handle }} > Registro </Link>
          </p>
        )}
      </div>
      <input
        type="submit"
        className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value="Obtener mi DevTree"
      />
    </form>
  );
};
