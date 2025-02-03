import { Outlet } from "react-router-dom"
import { Toaster } from 'sonner';
import { Logo } from "../../shared/components/Logo";

export const AuthLayout = () => {
  return (
        <>

                <div className="max-w-lg mx-auto pt-10 px-5">
                        <Logo />
                        <Outlet />
                    <div className="py-10">
                    </div>

                </div>

                <Toaster position="top-right" />
        </>
  )
}
