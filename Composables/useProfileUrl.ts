
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
    console.log('enter getUser');
    
    const response: string = await $fetch(`https://gwaoqugot2.execute-api.us-east-1.amazonaws.com/user/${id}`)
    try {
      console.log('response getUser:', response)
      return JSON.parse(response)
    } catch (error) {
      console.log('error:', error)
      
    }
  };

  const updateUser = async(id, data) => {
    console.log('enter updateUser', id);    
    console.log('data:', data)
    const { pending, error } = await $fetch(`https://gwaoqugot2.execute-api.us-east-1.amazonaws.com/user/${id}`, {
      method: 'PUT',
      body: data
    })
    if(error) throw error
  };

  const dataToday = async(id) => {
    const response: string = await $fetch(`https://gwaoqugot2.execute-api.us-east-1.amazonaws.com/dataToday/${id}`)
    return JSON.parse(response)
  }

  return {
    createUser,
    getUser,
    updateUser,
  }
}

export default useProfileUrl;