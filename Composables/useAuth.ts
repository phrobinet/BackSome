import { useFetch, useStorage } from '@vueuse/core';
import { useProfileStore } from '../store/profileStore';
const { getUser } = useProfileUrl();
let url =
  'https://gwaoqugot2.execute-api.us-east-1.amazonaws.com/user/p.robinet@gmail.com';

const useAuth = () => {
  const profileStore = useProfileStore();
  const user = useState('user', () => null);
  const { supabase } = useSupabase();
  const router = useRouter();

  supabase.auth.onAuthStateChange((e, session) => {
    user.value = session?.user || null;
  });

  // Creates a new user
  const signUp = async ({ email, password, ...metadata }) => {
    // Check if user exist
    const { isFetching, data, err } = await useFetch(url);
    if (data._value != "Couldn't find user.")
      throw new Error('User already exist$');

    const {
      user: u,
      session,
      error,
    } = await supabase.auth.signUp(
      {
        email,
        password,
      },
      {
        data: metadata,
        // lors de la confirmation par mail, on va être renvoyé sur cette page
        redirectTo: `${window.location.origin}/profile?source=email`,
      }
    );
    if (err) throw error;
    return u;
  };

  // Connexion User
  const signIn = async ({ email, password }) => {
    const { user: u, error } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) throw error;
    return u;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    profileStore.u = null;
    if (error) throw error;
    router.push('/');
    const email = useStorage('backStorage', null);
    email.value = null;
    profileStore.isLog = false;
  };

  const isLoggedIn = () => {
    // if (user.value) {
    //   if(profileStore.u === null){
    //     profileStore.u = await getUser(user.value.email);
    //   }

    // }
    // console.log('user.value: ', user.value);
    if (!!user.value) {
      profileStore.isLogged()
    } else {
      profileStore.isLogged()
    }
    return !!user.value;
  };

  return {
    user,
    signUp,
    signIn,
    signOut,
    isLoggedIn,
  };
};
export default useAuth;
