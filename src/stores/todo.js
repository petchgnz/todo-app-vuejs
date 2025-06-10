import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const BASE_URL = 'https://68447cec71eb5d1be0336f9f.mockapi.io'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    lists: [],
    selectedList: {},
    statuses: ["Pending", "Doing", "Done"]
  }),
  actions: {
    // GET - Load all todo lists
    async loadTodos() {
      try {
        const res = await axios.get(`${BASE_URL}/todos`)
        this.lists = res.data
        console.log(`API-Load todos completed`)

      } catch (err) {
        console.log(`API-Load todos error: ${err}`)
      }
    },
    
    // GET/:id - Load selected todo list
    // use with Edit button
    async loadTodo(id) {
      try {
        const res = await axios.get(`${BASE_URL}/todos/${id}`)
        this.selectedList = res.data
        console.log(`API-Load selected todo completed`)
      } catch (err) {
        console.log(`API-Load selected todo error: ${err}`)
      }
    },

    // POST - Create new todo
    // use with create button
    async postTodo(todoData) {
      try {
        await axios.post(`${BASE_URL}/todos/`, todoData)

      } catch (err) {
        console.log(`API-Create todo error: ${err}`)
      }
    },

    // PUT - Update existing todo
    // use with update button (In edit page)
    async updateTodo(newTodoData, id) {
      try {

      } catch (err) {
        console.log(`API-Update todo error: ${err}`)
      }
    },

    // DELETE - Delete selected todo
    // use with Delete button
    async deleteTodo(id) {
      try {
        await axios.delete(`${BASE_URL}/todos/${id}`)
        console.log(`API-Todo Deleted`)
      } catch (err) {
        console.log(`API-Delete todo error: ${err}`)
      }
    },
  }
})
