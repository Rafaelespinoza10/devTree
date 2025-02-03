import { useDevTreeLinks } from "../hooks/useDevTreeLinks";
import { DevTreeInput } from "./DevTreeInput";

export const LinkTreePage = () => {
  const {
    devLinkTree,
    isLoading,
    handleUrlChange,
    handleEnableLink,
    saveChanges,
    isSaving
  } = useDevTreeLinks();

  if (isLoading) return <p>Cargando enlaces...</p>;

  return (
    <>
      <div className="space-y-5">
          
          { devLinkTree.map( item => (
            <DevTreeInput
              key={ item.name }
              input={item}
              handleUrlChange={ handleUrlChange}
              handleEnableLink={ handleEnableLink }
            />
          ))} 
          <button 
          className="bg-cyan-400 text-lg w-full uppercase text-slate-600 rounded font-bold"
          onClick={() => saveChanges()}
          disabled={isSaving}
          >
          {isSaving ? "Guardando..." : "Guardar Cambios"}
          </button>

      </div>
    
    </>
  )
}
