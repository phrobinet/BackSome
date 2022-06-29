import { defineStore } from 'pinia';
const { updateUser, checkToday } = useProfileUrl();
import { format, startOfDay, addDays } from 'date-fns'



export const useProfileStore = defineStore('profileStore', {
  state: () => {
    return {
      date: format(new Date(2014, 1, 11), 'MM/dd/yyyy'),
      u: null,
      notes: [],
      isToCheck: false
    }
  },
  actions: {
    addUser(u) {
      this.user = u
    },

    getAllNotes() {
      console.log('enter getAllNotes');
      this.notes = [];
      console.log('this.notes:', this.notes)
      this.isToCheck = false
      return this.notes = this.u.notes
    },

    updateMemory(index) {
      if(this.u.notes[index].layer < 6) this.u.notes[index].layer = this.u.notes[index].layer + 1;

      this.u.notes[index].updatedAt = new Date();
      updateUser(this.u.id, this.u);
      const idxNotes = this.notes.find(note => note.id === this.u.notes[index].id);
      this.notes.splice(idxNotes, 1)
    },

    dontRemember(index) {
      if(this.u.notes[index].layer > 0)this.u.notes[index].layer = this.u.notes[index].layer - 1;
      this.u.notes[index].updatedAt = new Date();
      updateUser(this.u.id, this.u);
      const idxNotes = this.notes.find(note => note.id === this.u.notes[index].id);
      this.notes.splice(idxNotes, 1)
    },

    async getNotesToCheck() {
      console.log('enter getNotes');
      let arrInit = this.u.notes;
      this.notes = [];
      this.isToCheck = true
      const today = startOfDay(new Date())

      await arrInit.filter(item => {
        if(item.layer === 0) {
          if(today >= addDays(new Date(item.createdAt), 1)){
            this.notes.push(item)
            return item
          }
        }
        
        if(item.layer === 1) {
          if(today >= addDays(new Date(item.updatedAt), 2)){
            this.notes.push(item)
            return item
          }
        }
        
        if(item.layer === 2) {
          if(today >= addDays(new Date(item.updatedAt), 4)){
            this.notes.push(item)
            return item
          }
        }
        
        if(item.layer === 3) {
          if(today >= addDays(new Date(item.updatedAt), 7)){
            this.notes.push(item)
            return item
          }
        }
        
        if(item.layer === 4) {
          if(today >= addDays(new Date(item.updatedAt), 14)){
            this.notes.push(item)
            return item
          }
        }
        
        if(item.layer === 5) {
          if(today >= addDays(new Date(item.updatedAt), 30)){
            this.notes.push(item)
            return item
          }
        }
        
        if(item.layer === 6) {
          if(today >= addDays(new Date(item.updatedAt), 30)){
            this.notes.push(item)
            return item
          }
        }
      })
    },

    createMemory() {
      updateUser(this.u.id, this.u)
    }
  }
})