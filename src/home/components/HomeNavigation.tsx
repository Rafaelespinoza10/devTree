import { Link } from 'react-router-dom';


export default function HomeNavigation() {
  return (
    <>
        <Link 
            className='text-white p-2 uppercase font-black text-xs cursor-pointer'
            to='/auth/login'
        > Iniciar Sesion
        </Link>

        <Link 
            className='text-black bg-lime-500 rounded-lg gap-2 ml-4 p-2 uppercase font-black text-xs cursor-pointer'
            to='/auth/register'
        > Registrarme
        </Link>


    </>
)
}
