import { useForm } from "react-hook-form"
import  { useQueryClient, useMutation } from "@tanstack/react-query"
import { ResponseUserAuthenticated } from "../../auth/interface/AuthFormData.interface";
import { UserProfileUpdated } from "../interface/user-profile.interface";
import { updateUser, uploadImage } from "../../api/DevTreeApi";
import { toast } from "sonner";
import React from "react";

export const ProfileUserPage = () => {
  const queryClient =  useQueryClient();
  const data : ResponseUserAuthenticated= queryClient.getQueryData(['user'])!;

  const { register, handleSubmit, formState: { errors} } = useForm<UserProfileUpdated>({ defaultValues: {
    handle: data.user.handle,
    description: data.user.description,
  }});


  
const updateProfileMutation = useMutation({
  mutationFn: updateUser, 
  onError: (error) => {
    toast.error(error.message)
  },
  onSuccess: (data) => {
    toast.success(data?.message);
    queryClient.invalidateQueries({ queryKey: ['user']})  //eliminar los datos cacheados y actualiza el estado actual
  }
})


const uploadImageMutation = useMutation({
  mutationFn: uploadImage,
  onError: (error) => {
    toast.error(error.message);
  },
  onSuccess: (data) =>{
    queryClient.invalidateQueries({ queryKey: ['user']})  //eliminar los datos cacheados y actualiza el estado actual
    toast.success(data?.message);
  }
})


const handleProfileForm = async(dataForm: UserProfileUpdated) =>{
 await  updateProfileMutation.mutateAsync(dataForm);
}

const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {

  if(e.target.files){
  uploadImageMutation.mutate(e.target.files[0]);
  }
}

  return (
    <form 
        className="bg-white p-10 rounded-lg space-y-5"
        onSubmit={handleSubmit(handleProfileForm)}
    >
        <legend className="text-2xl text-slate-800 text-center">Editar Información</legend>
        <div className="grid grid-cols-1 gap-2">
            <label
                htmlFor="handle"
            >Handle:</label>
            <input
                type="text"
                className="border-none bg-slate-100 rounded-lg p-2"
                placeholder="handle o Nombre de Usuario"
                {...register('handle', {
                  required: "El nombre de usuario es obligatorio"
                })}
            />
            {errors.handle &&  <span className="text-sm text-red-500">{ errors.handle.message }</span>}
        </div>

        <div className="grid grid-cols-1 gap-2">
            <label
                htmlFor="description"
            >Descripción:</label>
            <textarea
                className="border-none bg-slate-100 rounded-lg p-2"
                placeholder="Tu Descripción"
                {...register('description',{
                  required: 'La descripcion es obligatoria'
                })}
              
            />
            {errors.description &&  <span className="text-sm text-red-500">{ errors.description?.message }</span>}

        </div>

        <div className="grid grid-cols-1 gap-2">
            <label
                htmlFor="handle"
            >Imagen:</label>
            <input
                id="image"
                type="file"
                name="handle"
                className="border-none bg-slate-100 rounded-lg p-2"
                accept="image/*"
                onChange={ handleChanges }
            />
        </div>

        <input
            type="submit"
            className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
            value='Guardar Cambios'
        />
    </form>
  )
}
