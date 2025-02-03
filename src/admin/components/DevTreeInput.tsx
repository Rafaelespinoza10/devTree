import React, { useState } from "react"
import { Switch } from '@headlessui/react'
import { SocialData } from "../interface"
import { classNames, isValid } from "../utils"


type  DevTreeInputProps ={
    input: SocialData,
    handleUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleEnableLink: ( socialNetwork: string) => void,
}

export const DevTreeInput: React.FC<DevTreeInputProps> = ({ input, handleUrlChange, handleEnableLink }) => {
    const [url, setUrl] = useState(input.url);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setUrl(value);
        handleUrlChange(e); // Actualiza la URL en el estado global
    };

    const isUrlValid = isValid(url); // Verifica si la URL es válida

    return (
        <div className="bg-white shadow-sm p-5 flex items-center gap-3">
            <div
                className="w-12 h-12 bg-cover"
                style={{ backgroundImage: `url('social/icon_${input.name}.svg')` }}
            ></div>

            <input 
                type="text" 
                className="flex-1 border border-gray-100 rounded-lg"
                value={input.url}
                onChange={handleChange}
                name={input.name}
            />
            {input.enabled}

            <Switch
                checked={input.enabled}
                disabled={!isUrlValid}
                onChange={() => handleEnableLink(input.name)}  // Aquí llamamos al mismo `handleEnableLink`
                className={classNames(
                    input.enabled ? 'bg-blue-500' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                )}
            >
                <span
                    aria-hidden="true"
                    className={classNames(
                        input.enabled ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                />
            </Switch>
        </div>
    );
};