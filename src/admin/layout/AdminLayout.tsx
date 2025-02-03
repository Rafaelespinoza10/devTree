import { useQuery } from '@tanstack/react-query'
import { getUser } from "../../api/DevTreeApi"
import { Navigate } from "react-router-dom"
import { DevTree } from "../pages/DevTree"
import { useDevTreeLinks } from '../hooks/useDevTreeLinks'

export const AdminLayout = () => {

    const { data, isLoading, isError } = useQuery({
        queryFn: getUser,
        queryKey: ['user'],
        retry: 1,
        refetchOnWindowFocus: false
    }) 
    const { devLinkTree } = useDevTreeLinks();


      
    if(isLoading) return 'Cargando ...';
    if(isError) {
        return <Navigate to={ '/auth/login' } />
    }

    if (data) {
        console.log('DEVLINK TREE DESPUES DE GUARDAR PAPU ', devLinkTree);

        const orderedActive = data!.user.links.map(link => {
            // Convertimos la URL a minúsculas para hacer la comparación más robusta
            const lowerLink = link.toLowerCase();
            
            // Buscamos la red que coincida con la URL (usando el nombre de la red)
            const network = devLinkTree.find(net => lowerLink.includes(net.name));
        
            // Si se encontró una coincidencia, devolvemos el objeto con el nombre, URL y el valor de enabled de devLinkTree
            if (network) {
                return {
                    name: network.name,
                    url: link,
                    enabled: network.enabled // Tomamos el valor de enabled desde devLinkTree
                };
            }
        
            // Si no se encontró, no retornamos nada
            return undefined;
        }).filter(item => item !== undefined); // Filtramos los valores undefined que puedan surgir si no hay coincidencias
        
        // Ahora buscamos las redes que no están activas (las que no aparecen en user.links)
        const missing = devLinkTree.filter(net => 
            // Filtramos las redes que no aparecen en los enlaces del usuario
            !data!.user.links.some(link => link.toLowerCase().includes(net.name))
        ).map(net => ({
    
            // Filtramos las redes no encontradas en el array de activeLinks
            name: net.name,
            url: "", // No tiene URL porque es un enlace inactivo
            enabled: net.enabled, // Usamos el valor de enabled de devLinkTree
        }));
        
        // Combinamos ambos arrays, los enlaces activos primero y luego los inactivos, asegurando el orden de user.links
        const finalSocial = orderedActive.concat(missing);
    
        console.log('Dev link tree combinado: ', finalSocial);
              
        return <DevTree 
            data={data}
            devTreeLink={finalSocial}
        />
    }
    
}
