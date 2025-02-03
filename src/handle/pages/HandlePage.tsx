
import { Navigate, useParams } from "react-router-dom"
import { useQuery }from '@tanstack/react-query';
import { getUserByHandle } from "../../api/DevTreeApi";
import { HandleData } from "../components/HandleData";

export const HandlePage = () => {
  const params = useParams();
  const handle = params.handle!;
  const  { data, isError, isLoading } = useQuery({
    queryFn: () => getUserByHandle(handle),
    queryKey:  ['handle', handle],
    retry: 1, 
  });

 if(isLoading) return 'Cargando...'
 if(isError) return <Navigate  to='/404'/>


 if(data) return(
   <HandleData 
    key={data.user.name}
    data={data.user}
    handle={handle}
   />
 )
   
}
