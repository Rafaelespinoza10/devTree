import { Header } from "../../shared/components/Header"
import { SearchFormData } from "../components/SearchFormData"

export const HomePage = () => {
  return (
   <>
    <Header />
    <main className="py-10 min-h-screen bg-no-repeat bg-right-top lg:bg-home lg:bg-home-xl" >
        <div className="max-w-5xl mx-auto mt-10">
            <div className="lg:w-1/2 px-10 lg:p-0 space-y-6 font-black">
                <h1 className="text-6xl font-blak text-white">Todas tus <span className="text-cyan-400">Redes Sociales</span> en un enlace</h1>

            <p className="text-white text-xl">Únete a esta gran comunidad de desarrolladores compartiendo sus redes sociales, comparte tu perfil de 
                TikTok, Facebook, Instagram, YouTube, LinkedIn y más.
            </p>

            <SearchFormData />
            </div>
        </div>

    </main>
   </>
  )
}
