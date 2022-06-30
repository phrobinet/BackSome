import { startOfDay, compareAsc, addDays } from "date-fns";
import { useFetch } from '@vueuse/core'
const useProfileUrl = () => {

  const createUser = async(id) => {
    const response = await $fetch('https://gwaoqugot2.execute-api.us-east-1.amazonaws.com/user', {
      method: 'POST',
      body: {
        id,
      }
    })
  };

  const getUser = async(id) => {
    const response: string = await $fetch(`https://gwaoqugot2.execute-api.us-east-1.amazonaws.com/user/${id}`)
    try {
      return JSON.parse(response)
    } catch (error) {
      console.error('error getUser:', error)      
    }
  };

  const getDB = async() => {
    const response: string = await $fetch(`https://gwaoqugot2.execute-api.us-east-1.amazonaws.com/user/db`)
    try {
      return JSON.parse(response)
    } catch (error) {
      console.error('error getUser:', error)      
    }
  };

  const updateUser = async(id, data) => {
    const { pending, error } = await $fetch(`https://gwaoqugot2.execute-api.us-east-1.amazonaws.com/user/${id}`, {
      method: 'PUT',
      body: data
    })
    if(error) throw error
  };

  const dbMemory = async () => {
    let { data } = await useFetch('https://gwaoqugot2.execute-api.us-east-1.amazonaws.com/user/DB')
    console.log('response:', JSON.parse(data))
    
  }

  return {
    createUser,
    getUser,
    updateUser,
    getDB,
    dbMemory
  }
}

export default useProfileUrl;