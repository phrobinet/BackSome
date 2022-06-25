import {useFetch } from '@vueuse/core';

let url = 'https://gwaoqugot2.execute-api.us-east-1.amazonaws.com/user/p.robinet@gmail.com'

const useAuth = () => {
  const user = useState('user', () => null);
  const { supabase } = useSupabase();
  const router = useRouter();

  supabase.auth.onAuthStateChange((e, session) => {
    user.value = session?.user || null
  })

  // Creates a new user
  const signUp = async ({ email, password, ...metadata }) => {
    // Check if user exist
    const { isFetching, data, err } = await useFetch(url)
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
    const { error } = await supabase.auth.signOut()
    if(error) throw error
    router.push('/')
  }

  const isLoggedIn = () => {
    return !!user.value
  }

  return {
    user,
    signUp,
    signIn,
    signOut,
    isLoggedIn,
  }
}
export default useAuth