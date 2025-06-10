<script setup>
import { ref, onMounted } from 'vue';
import { useTodoStore } from '../stores/todo.js';
import { FaTrash } from 'vue3-icons/fa'
import { CiEdit } from 'vue3-icons/ci'

import TodoInputs from './TodoInputs.vue';

const todoStore = useTodoStore();

const isTodoComplete = ref(false);

onMounted(async () => {
  try {
    await todoStore.loadTodos();
    console.log(todoStore.lists);
  } catch (err) {
    console.log(`Mounted Error: ${err}`);
  }
});

// Delete Function
async function DeleteTodo(id) {
  try {
    await todoStore.deleteTodo(id)
    alert(`List: ${id} deleted!`)
    await todoStore.loadTodos()

  } catch(err) {
    console.log("Can't delete todo")
  }
}

// isCompleted Toggle Function
function ToggleCompletedTodo() {
  isTodoComplete.value = !isTodoComplete.value;
}
</script>

<template>
  <div class="bg-bg2 w-100 p-4 max-h-[650px]">
    <TodoInputs />

    <hr class="my-6 text-white/50" />

    <!-- Toggle completed button -->
    <div>
      <button
        :class="[
          'p-2 transition-all rounded-xs shadow-xl cursor-pointer mb-5',
          {
            'bg-green-600': isTodoComplete,
            'bg-[#49494986]': !isTodoComplete,
          },
        ]"
        @click="ToggleCompletedTodo"
      >
        Completed
      </button>
    </div>
    <!-- End Toggle completed button -->

    <!-- Todo List -->
    <ul class="space-y-3 max-h-[390px]  overflow-scroll scroll-smooth ">
      <li
        v-for="list in todoStore.lists"
        class="p-4 pr-6 bg-bg3 flex items-center justify-between"
      >
        <div class="flex flex-col">
          <div class="text-2xl capitalize font-semibold">{{ list.task }}</div>
          <div class="capitalize text-md">> {{ list.status }}</div>
        </div>

        <div class="flex gap-4">
          <CiEdit class="text-2xl text-white cursor-pointer" />
          <FaTrash class="text-2xl text-white cursor-pointer" @click="DeleteTodo(list.id)"/>
        </div>

      </li>
    </ul>
  </div>
</template>