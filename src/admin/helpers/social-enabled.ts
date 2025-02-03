import { SocialData } from "../interface";

export const socialNetworkEnabled = (social: SocialData[], links: string[]) =>{
   return social.map(socialNetwork => {
            // Buscamos la URL que corresponde a cada red social
            const matchedLink = links.find(link => link.toLowerCase().includes(socialNetwork.name.toLowerCase()));
            
            // Si encontramos un link que coincide, lo asignamos y activamos 'enabled'
            if (matchedLink) {
                return { ...socialNetwork, url: matchedLink, enabled: true };
            }
            
            // Si no encontramos un link, dejamos el objeto como está
            return socialNetwork;
        }).filter(socialNetwork => socialNetwork.enabled);
        ;
}