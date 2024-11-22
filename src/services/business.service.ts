import { getAuthToken } from "@/utils/auth"
import axios from "../lib/axios"
import { getUserId } from "./auth.service"

export const getBusinesses = async() => {
    try {
        const token = getAuthToken()
        const response = await axios.get('/business', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.log('Error Fetching the business', error)
    }
}

export const addNewBusiness = async(name: string, phoneNumber:string='', location:string='') => {
    try {
        const token = getAuthToken()
        const userId = getUserId()
        console.log(userId)
        const data = {
            name,
            phone_number: phoneNumber,
            location,
            userIds: [userId]
        }
        const response = await axios.post('/business', data,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.log('Error Fetching the business', error)
    }
}