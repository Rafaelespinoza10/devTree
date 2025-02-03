import { isAxiosError } from "axios";
import { api } from "../auth/utils/axios";
import {  ResponseUserAuthenticated } from "../auth/interface/AuthFormData.interface";
import { UserProfileUpdated } from "../admin/interface/user-profile.interface";
import { ResponseUserUpdated } from "../admin/interface/response-user-updated.interface";
import { ResponseUploadImage } from "../admin/interface";
import { ResponseUserByHandle } from "../handle/interface/response-user-by-handle.response";

export async function getUser() { 
    try {
        const { data } = await api<ResponseUserAuthenticated>(`/user`);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message);
        }
      }

}


export async function updateUser(dataForm: UserProfileUpdated) { 
    try {
        const { data } = await api.patch<ResponseUserUpdated>(`/update-profile`, dataForm);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message);
        }
      }
}

export async function uploadImage(file: File){
    try{
        const formData = new FormData();
        formData.append('file', file);
        const { data } = await api.post<ResponseUploadImage>(`/user/image`, formData);
        return data;
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message);
        }
    }
}

export async function getUserByHandle(handle: string){
    try {
        
        const { data } = await api<ResponseUserByHandle>(`/${handle}`);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message);
        }
    }
}

export async function searchAvailableHandle(handle: string){
    try {
        console.log(handle)
        const { data } = await api.post('/search', {handle});
        console.log(data?.message);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message);
        }
    }
}