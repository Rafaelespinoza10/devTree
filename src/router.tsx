
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./auth/pages/LoginPage";
import { RegisterPage } from "./auth/pages/RegisterPage";
import { AuthLayout } from "./auth/layout/AuthLayout";
import { AdminLayout } from "./admin/layout/AdminLayout";
import { ProfileUserPage } from "./admin/pages/ProfileUserPage";
import { LinkTreePage } from "./admin/components/LinkTreePage";
import { HandlePage } from "./handle/pages/HandlePage";
import { NotFound404 } from "./shared/pages/NotFound404";
import { HomePage } from "./home/pages/HomePage";

export default function Router(){
    return(
        <BrowserRouter>
            <Routes>

                <Route path='/' element={<HomePage />} />
                
                <Route element={ <AuthLayout />}>
                    <Route path="auth/login" element={ <LoginPage />} />
                    <Route path="auth/register" element={ <RegisterPage />} />
                 </Route>
            
                <Route path="/admin" element={ <AdminLayout /> }>
                    <Route index={ true } element={ <LinkTreePage />} />
                    <Route path="profile" element={ <ProfileUserPage />} />
                </Route>

                <Route path="/:handle" element={ <AuthLayout /> }>
                    <Route element={<HandlePage /> } index={ true }></Route>
                </Route>

                <Route path="/404" element={ <AuthLayout />}>
                    <Route element={ <NotFound404 />} index={ true } />
                </Route>
            </Routes>

        </BrowserRouter>
    )
}