import { defineStore } from 'pinia';
const { updateUser } = useProfileUrl();
import { format, compareAsc } from 'date-fns'



export const useProfileStore = defineStore('profileStore', {
  state: () => {
    return {
      date: format(new Date(2014, 1, 11), 'MM/dd/yyyy'),
      u: null,
      allNotes: []
    }
  },
  actions: {
    addUser(u) {
      this.user = u
    },

    getAllNotes() {
      console.log('this.u.notes:', this.u.notes)
      return this.allNotes = this.u.notes
    },

    createMemory() {
      updateUser(this.u.id, this.u)
    }
  }
})