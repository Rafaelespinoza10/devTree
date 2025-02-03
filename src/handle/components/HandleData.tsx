import { social } from "../../admin/data/social"
import { UserWithHandle } from "../interface/response-user-by-handle.response"



type HandleDataProps = {
    data: UserWithHandle
    handle: string
}

export const HandleData = ({ data, handle}: HandleDataProps) => {

    console.log(data.links);

    const links = data.links.map(link => {
        // Encontramos el nombre de la red social basada en el enlace
        const socialItem = social.find(item => link.includes(item.name));
        // Si encontramos un item que coincida, lo asignamos con url y enabled
        return socialItem ? { ...socialItem, url: link, enabled: true } : null;
    }).filter(item => item !== null);

    console.log(links);

  return (
    <div className="space-y-6 text-white">
        <p className="text-5xl text-center font-black ">{ handle }</p>
        {data.image && <img src={data.image} className="max-w-250 mx-auto"/>}

        <p className="text-lg text-center font-bold ">{ data.description }</p>
        <div className="mt-20 flex flex-col gap-6 ">
            {links.length ? 
                links.map( link => (
                    <a
                        key={link.name}
                        className="bg-white px-5 py-2 flex items-center gap-5 rounded-lg"
                        href={ link.url }
                        target="_blank"
                        rel="noreferrer noopener"

                    >
                        <img src={`/social/icon_${link.name}.svg`} alt="image red social"  className="w-12"/>
                        <p className="text-black capitalize font-black text-lg">  Visita mi: {link.name}   </p> 
                    </a>
                ))
            :<p className="text-center">No hay enlaces en este perfil</p>}
        </div>


    </div>
  )
}
