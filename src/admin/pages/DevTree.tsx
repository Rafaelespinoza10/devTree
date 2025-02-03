
import NavigationTabs from '../components/NavigationTabs'
import { Link, Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import { ResponseUserAuthenticated } from '../../auth/interface/AuthFormData.interface'
import {  SocialData } from '../interface'
import { DevTreeEnabledLinks } from '../components/DevTreeEnabledLinks'
import { DndContext, DragEndEvent, closestCenter} from '@dnd-kit/core';
import {SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Header } from '../../shared/components/Header'

type DevTreeProps ={
    data: ResponseUserAuthenticated,
    devTreeLink : SocialData[]
}

export const DevTree = ({ devTreeLink, data }: DevTreeProps) => {


    const queryClient = useQueryClient();
  const generateId = (item: SocialData) => item.id ?? crypto.randomUUID();

  const enabledDevTreeLinks = devTreeLink.filter(link => link.enabled);

  // Estado inicial con los enlaces habilitados
  const [items, setItems] = useState<SocialData[]>(() =>
    enabledDevTreeLinks.map(item => ({
      id: generateId(item),
      name: item.name,
      url: item.url,
      enabled: item.enabled,
    }))
  );
  
  // Sincroniza `items` cuando `devTreeLink` cambia
  useEffect(() => {
    setItems(prevItems => {
      const updatedItems = enabledDevTreeLinks.map(item => ({
        id: item.id ?? generateId(item),
        name: item.name,
        url: item.url,
        enabled: item.enabled,
      }));
  
      // Mantiene el orden actual y solo actualiza si es necesario
      return prevItems.length === updatedItems.length ? prevItems : updatedItems;
    });
  }, [devTreeLink]);
  
  const disabledLinks = devTreeLink.filter(link => !link.enabled);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex(item => item.id === active.id);
    const newIndex = items.findIndex(item => item.id === over.id);

    const newEnabledOrder = arrayMove(items, oldIndex, newIndex);
    setItems(newEnabledOrder);

    const newOrdered = [...newEnabledOrder, ...disabledLinks];

    queryClient.setQueryData(["devLinkTree"], newOrdered);
  };

  console.log("items después de renderizar:", items);
    return (
    <>
    <Header />
    <div className="bg-gray-100  min-h-screen py-10">
        <main className="mx-auto max-w-5xl p-10 md:p-0">
        <NavigationTabs />
            
            <div className="flex justify-end">
                <Link
                    className="font-bold text-right text-slate-800 text-2xl"
                    to={`/${data.user.handle}`}
                    target="_blank"
                    rel="noreferrer noopener"
                >Visitar Mi Perfil: /{ data.user.handle }  </Link>
            </div>

            <div className="flex flex-col md:flex-row gap-10 mt-10">
                <div className="flex-1 ">
                    <Outlet />
                </div>
                <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">
                    <p className='text-4xl text-center text-white'>{ data.user.handle }</p>
                    
                    {data.user.image  &&
                     <img  src={data.user.image } alt='Image Perfil'  className='mx-auto max-w-[300px]' />
                    }
                    <p className='text-center text-lg font-black text-white'> { data.user.description }</p>
                    
                    <DndContext
                        collisionDetection={ closestCenter }
                        onDragEnd={ handleDragEnd }
                    >
                        <div className='mt-20 flex flex-col gap-5'>
                            <SortableContext
                                items={ items.map(item => item.id!) }
                                strategy={ verticalListSortingStrategy }
                            >
                            {  items.map(link => (
                                <DevTreeEnabledLinks 
                                key={link.name }
                                link={link}
                                />   
                            ))
                            }
                            </SortableContext>
                        </div>
                    </DndContext>
                
                </div>  
            </div>
        </main>
    </div>
    <Toaster position="top-right" />
</>
  )
}

