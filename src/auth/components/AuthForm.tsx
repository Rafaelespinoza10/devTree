import React from 'react';
import { useForm } from 'react-hook-form';
import { AuthFormData, AuthFormProps } from '../interface/AuthFormData.interface';

export const AuthForm: React.FC<AuthFormProps> = ({ formType, onSubmit , handle}) => {
    const { register, handleSubmit, watch, formState: { errors }} = useForm<AuthFormData>({
      defaultValues: { handle: ''}
    });
    const isRegister = formType === 'register';


  return (
    <>
         <form 
      onSubmit={handleSubmit(onSubmit)}
      className="mt-10 w-full rounded-2xl bg-slate-900"
        >
      <div className="flex flex-col gap-2 p-8">

        {isRegister && (  
            <div className="mt-8">
            <label className='text-md font-bold text-slate-500 mb-2'> Nombre: </label>
          <input
            className="text-white bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
            placeholder="Nombre"
            type="text"
            {...register('name', {
                required: 'El nombre es obligatorio',
            })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
        )}

          <div className="mt-1">
            <label className="text-md font-bold text-slate-500 mb-2">Email:</label>
            <input
              className="text-white bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
              type="text"
              placeholder="Email"
              {...register('email', {
                required: 'El email es obligatorio',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'El correo no tiene un formato válido',
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

        {isRegister && (
        <div className="mt-1">
        <label className='text-md font-bold text-slate-500 mb-2'> Handle: </label>
          <input
          className="text-white bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
            placeholder="Handle"
            {...register('handle', {
                required: 'El handle es obligatorio',
            })}
            value={ handle }
            
            />
            {errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p> }
        </div>
        )}

        <div className="mt-1">
          <label className="text-md font-bold text-slate-500 mb-2">Password:</label>
          <input
            className="text-white bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
            placeholder="Password"
            type="password"
            {...register('password', {
              required: 'El password es obligatorio',
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                message:
                  'El password debe contener al menos 6 caracteres, una letra mayúscula, una minúscula, un número y un carácter especial',
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {isRegister && (
        <div className='mt-1'>
            <label className='text-md font-bold text-slate-500 mb-2'> Confirmar Password: </label>
          <input
              className="text-white bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
            placeholder="Confirmar password"
            type="password"
            {...register('confirmPassword', {
                required: 'El password debe ser igual',
                validate: (value) =>
                  value === watch('password') || 'Los passwords no coinciden',
            })}
            />
            { errors.confirmPassword && <p className='text-red-500 text-sm'> { errors.confirmPassword.message }</p>}
        </div>
        )}

        
        <button
          type="submit"
          className="mt-8 inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
        >
          {isRegister ? 'Registrar' : 'Iniciar Sesion'}
        </button>
      </div>
    </form>
    </>
 )
}
