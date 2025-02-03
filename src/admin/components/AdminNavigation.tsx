import { useQueryClient } from "@tanstack/react-query";

export const AdminNavigation = () => {

    const queryClient = useQueryClient()

    const handleLogOut = () =>{
        localStorage.removeItem('token');
        queryClient.invalidateQueries({queryKey: ['user']})
    }
  return (
    <>
      <button
        className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
        onClick={ handleLogOut}
      >
        Cerrar Sesión
      </button>
    </>
  );
};
