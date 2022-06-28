import { useProfileStore } from '../store/profileStore';
import { useStorage } from "@vueuse/core";

export default defineNuxtRouteMiddleware(async () => {
  const { isLoggedIn } = useAuth();
  const profileStore = useProfileStore();
  const { getUser } = useProfileUrl();
  const backStorage = useStorage('backStorage', 'email')
  

  if(!isLoggedIn()){    
    console.log('!isLoggedIn():', !isLoggedIn())
    return  navigateTo('/')
  } else if(profileStore.u === null || profileStore.u === undefined){
    profileStore.u = await getUser(backStorage.value);
  }
})