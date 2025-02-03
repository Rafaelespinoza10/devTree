import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { ResponseUserUpdated, SocialData, UserProfileUpdated } from '../interface';
import { updateUser } from '../../api/DevTreeApi';
import { toast } from 'sonner';
import { isValid } from '../utils';
import { social } from '../data/social';

export const useDevTreeLinks = () => {
    const queryClient = useQueryClient();
    const user: ResponseUserUpdated | undefined = queryClient.getQueryData(["user"]);

    // Obtener los datos y actualizar el estado
    const { data: devLinkTree, isLoading } = useQuery({
        queryKey: ["devLinkTree"],
        queryFn: () => {
            if (!user) return social;
            return social.map((item) => {
                const existsUrls = user.user.links.find((link) => link.includes(item.name));
                return {
                    ...item,
                    url: existsUrls || item.url,
                    enabled: Boolean(existsUrls),
                };
            });
        },
        initialData: social,
    });

    // Mutación para actualizar usuario
    const { mutate, isPending } = useMutation({
        mutationFn: (userUpdatedData: UserProfileUpdated) => updateUser(userUpdatedData),
        onError: (error) => toast.error(error.message),
        onSuccess: () => {
            toast.success("Actualizado correctamente");
            queryClient.invalidateQueries({queryKey: ['user']})

        },
    });

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedLinks = devLinkTree!.map((link) =>
            link.name === name ? { ...link, url: value } : link
        );
        updateLinksCache(updatedLinks);
    };
    
    
      // Función para activar/desactivar un enlace
const handleEnableLink = (name: string) => {
    const updatedLinks = devLinkTree.map((link) => {
        if(link.name === name){
            const shouldEnable  = !link.enabled && isValid(link.url);
            return { ...link, enabled: shouldEnable};
        }
        return link;
    });
    updateLinksCache(updatedLinks);
}




        // Función para actualizar el caché de enlaces
        const updateLinksCache = (newLinks: SocialData[]) => {
            queryClient.setQueryData(["devLinkTree"], newLinks);
            queryClient.setQueryData(["user"], (prevData?: ResponseUserUpdated) =>
                prevData
                    ? {
                          ...prevData,
                          user: {
                              ...prevData.user,
                              links: newLinks.filter((link) => isValid(link.url)).map((link) => link.url),
                          },
                      }
                    : prevData
            );
        };

        
    // Función para actualizar enlaces
    const updatedLinks = (newLinks: SocialData[]) => {
        queryClient.setQueryData(["devLinkTree"], newLinks);
        queryClient.setQueryData(["user"], (prevData?: ResponseUserUpdated) => 
            prevData ? {
                ...prevData,
                user: {
                    ...prevData.user,
                    links: newLinks.filter((link) => isValid(link.url)).map((link) => link.url),
                },
            } : prevData
        );
    };


    const saveChanges = () => {
        const currentLinks = queryClient.getQueryData<SocialData[]>(["devLinkTree"]) || devLinkTree!;
        
        // Filtra solo los enlaces habilitados con URL válida
        const activeLinks = currentLinks.filter((link) => link.enabled && isValid(link.url));
        
        // Envía solo las URLs activas al backend
        const userUpdated: UserProfileUpdated = {
            links: activeLinks.map((link) => link.url),
        };
        
        console.log('userUpdated', userUpdated);
        mutate(userUpdated, {
            onSuccess: () => {
                // Actualiza el estado local (devTreeLink) después de guardar
                const updatedLinks = currentLinks.map((link) => ({
                    ...link,
                     enabled: activeLinks.some((activeLink) => activeLink.name === link.name),
                }));
                queryClient.setQueryData(["devLinkTree"], updatedLinks);
            },
        });
    };

    return {
        devLinkTree,
        isLoading,
        updatedLinks,
        handleEnableLink,
        handleUrlChange,
        saveChanges,
        isSaving: isPending,
    };
};
