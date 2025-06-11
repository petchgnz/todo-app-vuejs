<script setup>
import { useTodoStore } from '../stores/todo.js';
import { onMounted, reactive } from 'vue';

const todoStore = useTodoStore();

const todoData = reactive({
  task: '',
  status:'selectStatus',
  isComplete: false,
})

onMounted(() => {
  try {

  } catch (err) {
    console.log(`TodoInputs > onMounted Error ${err}`);
  }
});


// Create(POST) Function
async function CreateTodo(newTodoData) {
  try {
    if (!newTodoData.task || !newTodoData.status === "selectStatus") {
      alert("Invalid Task Title! Please try again.")
      return
    }

    const newData = {
      task: newTodoData.task,
      status: newTodoData.status,
      isCompleted: false
    }

    await todoStore.postTodo(newData)
    alert(`${newData.task} has been created!`)
    todoData.task = ""
    todoData.status = "selectStatus"
    await todoStore.loadTodos()

  } catch(err) {
    throw new Error("Create Error")
  }
}
</script>

<template>
  <div class="flex flex-col">
    <!-- Input Section -->
    <div class="flex gap-3 w-full">
      <!-- Task Section -->
      <div class="flex flex-col space-y-2 w-4/5">
        <span class="font-semibold text-lg">Task</span>
        <input
          type="text"
          class="bg-bg3 outline-none p-1 w-full text-black"
          v-model="todoData.task"
        />
      </div>

      <!-- Status Section -->
      <div class="flex flex-col space-y-2 w-2/5">
        <span class="font-semibold text-lg">Status</span>
        <select class="bg-bg3 p-1 h-full text-black outline-none " v-model="todoData.status" >
          <option value="selectStatus" disabled>Select Status</option>
          <option
            v-for="status in todoStore.statuses"
            :value="status"
            class="outline-none"
          >
            {{ status }}
          </option>
        </select>
      </div>
    </div>

    <!-- Add Task Button -->
    <!-- POST api here -->
    <div class="mt-4">
      <button
        class="bg-main outline-none p-2 w-full h-full cursor-pointer rounded-xs hover:bg-mainDarker transition-all"
        @click="CreateTodo(todoData)"
      >
        Add Task
      </button>
    </div>
  </div>
</template>
