import { getAuthToken } from "@/utils/auth"
import axios from "../lib/axios"



export const addTransaction = async(values, businessId: string) => {

    try {
        const token = getAuthToken()
        const bookId = await getBookId(businessId)
        console.log('Values', values)
        const response = await axios.post(`/bookTransactions/${bookId}`, values,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.log('Add Transaction', error)
    }
}

export const getTransactions = async(businessId) => {
    
    try {
        const token = getAuthToken()
        const bookId = await getBookId(businessId)

        const dataResponse = await axios.get(`/bookTransactions/${bookId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return dataResponse
    } catch (error) {
        console.log('GetTransactions', error)
    }
}

export const getBookId= async(businessId: string) => {
    try {
        const token = getAuthToken()
        const bookResponse = await axios.get(`/book/business/${businessId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return bookResponse.data.id
    } catch (error) {
        console.log('Get BookId', error)
    }

}

export const updateTransaction = async(updatedTransaction) => {
    try {
        const token = getAuthToken()
        console.log('Upodating', updatedTransaction)
        await axios.put(`/bookTransactions/${updatedTransaction.id.toString()}`, updatedTransaction, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log('UpdateTransaction', error)
    }
}