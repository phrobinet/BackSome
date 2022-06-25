import {useFetch } from '@vueuse/core';

let url = 'https://gwaoqugot2.execute-api.us-east-1.amazonaws.com/user/p.robinet@gmail.com'

const useAuth = () => {
  const user = useState('user', () => null);
  const { supabase } = useSupabase();

  supabase.auth.onAuthStateChange((e, session) => {
    user.value = session?.user || null
  })

  // Creates a new user
  const signup = async ({ email, password, ...metadata }) => {
    console.log("click");
    
    const { isFetching, data, err } = await useFetch(url)
    console.log('data._value:', data._value)
    console.log('url + email:', url + email)
    if(data.value != "Couldn't find user.") throw new Error('User already exist');
    
    const { user: u, session, error } = await supabase.auth.signUp({
      email,
      password,
    }, {
      data: metadata
    });
    if(error) throw error;

    console.log('session: ', session);

    return u
  }

  return {
    user,
    signup,
  }
}
export default useAuth