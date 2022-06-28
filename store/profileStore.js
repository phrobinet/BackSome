import { defineStore } from 'pinia';
const { updateUser } = useProfileUrl();
import { format, compareAsc } from 'date-fns'



export const useProfileStore = defineStore('profileStore', {
  state: () => {
    return {
      date: format(new Date(2014, 1, 11), 'MM/dd/yyyy'),
      u: null,
      
    }
  },
  actions: {
    addUser(u) {
      this.user = u
    }
  }
})