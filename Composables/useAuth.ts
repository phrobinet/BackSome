import {useFetch } from '@vueuse/core';

let url = 'https://gwaoqugot2.execute-api.us-east-1.amazonaws.com/user/p.robinet@gmail.com'

const useAuth = () => {
  const user = useState('user', () => null);
  const { supabase } = useSupabase();

  supabase.auth.onAuthStateChange((e, session) => {
    user.value = session?.user || null
  })

  // Creates a new user
  const signUp = async ({ email, password, ...metadata }) => {
    console.log("click");
    // Check if user exist
    const { isFetching, data, err } = await useFetch(url)
    console.log('data:', data._value)
    console.log('err:', err)
    if(data._value != "Couldn't find user.") throw new Error('User already exist$');
    
    const { user: u, session, error } = await supabase.auth.signUp({
      email,
      password,
    }, {
      data: metadata,
      // lors de la confirmation par mail, on va être renvoyé sur cette page
      redirectTo: `${window.location.origin}/profile?source=email`
    });
    if(error) throw error;
    return u
  };

  // Connexion User
  const signIn = async({ email, password }) => {
    const { user: u, error } = await supabase.auth.signIn({
      email,
      password
    })
    if(error) throw error
    return u
  };

  const signOut= async() => {
    console.log("signout");
    
    const { error } = await supabase.auth.signOut()
    if(error) throw error
  }

  return {
    user,
    signUp,
    signIn,
    signOut,
  }
}
export default useAuth