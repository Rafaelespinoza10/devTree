import { SocialData } from "../interface"
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'


type DevTreeEnabledLinksProps = {
    link: SocialData,
}
export const DevTreeEnabledLinks = ({ link } : DevTreeEnabledLinksProps) => 
    {

const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: link.id!
})

const style ={
    transform: CSS.Transform.toString(transform),
    transition
}
  return (
    <li 
        ref={setNodeRef}
        style={ style }   
       className="bg-white px-5 py-2 flex items-center gap-5 rounded-lg"
        {...attributes}
        {...listeners}
    >
        <div
            className="w-12 h-12 bg-cover"
            style={{backgroundImage: `url('/social/icon_${ link.name }.svg')`}}
       ></div>
        <p className="capitalize">Sigueme en: <span className="font-bold"> {link.name} </span></p>
    </li>
  )
}