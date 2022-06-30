import { useProfileStore } from '../store/profileStore';
import { useStorage } from "@vueuse/core";

export default defineNuxtRouteMiddleware(async () => {
  const { isLoggedIn } = useAuth();
  const profileStore = useProfileStore();
  const { getUser } = useProfileUrl();
  const backStorage = useStorage('backStorage', 'email')
  
  if(!isLoggedIn()){    
    return  navigateTo('/')
  } else if(profileStore.u === null || profileStore.u === undefined){
    console.log('enter getUser');
    
    profileStore.u = await getUser(backStorage.value);
  }
})