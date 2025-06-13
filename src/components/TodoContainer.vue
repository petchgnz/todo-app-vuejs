<script setup>
import { ref, onMounted, computed } from 'vue';
import { useTodoStore } from '../stores/todo.js';
import { FaTrash } from 'vue3-icons/fa';
import { CiEdit } from 'vue3-icons/ci';

import TodoInputs from './TodoInputs.vue';
import TodoEditForm from './TodoEditForm.vue';

const todoStore = useTodoStore();

const isTodoComplete = ref(false);
const isInEdit = ref(false);

// Filtered todo lists variables
const completedLists = computed(() => {
  return todoStore.lists.filter((todo) => todo.isCompleted === true);
});
const inCompletedLists = computed(() => {
  return todoStore.lists.filter((todo) => todo.isCompleted === false);
});

onMounted(async () => {
  try {
    await todoStore.loadTodos();
  } catch (err) {
    console.log(`Mounted Error: ${err}`);
  }
});

// DELETE Function
async function DeleteTodo(id) {
  try {
    await todoStore.deleteTodo(id);
    alert(`List: ${id} deleted!`);
    await todoStore.loadTodos();
  } catch (err) {
    console.log("Can't delete todo");
  }
}

// Update list Function
async function UpdateTodo(newTodoData, id) {
  try {
    const newData = {
      task: newTodoData.task,
      status: newTodoData.status,
      isCompleted: newTodoData.isCompleted,
    };
    await todoStore.updateTodo(newData, id);
    await todoStore.loadTodos();

    console.log(`Updated todo: from main`);
  } catch (err) {
    console.log(`Update Todo Error: ${err}`);
  }
}

// Open Edit Form
async function OpenEditForm(id) {
  try {
    await todoStore.loadTodo(id);

    isInEdit.value = true;
  } catch (err) {
    console.log(`Can't open edit form!`);
  }
}

// Close edit form
function CloseEditForm() {
  isInEdit.value = false;
}

// isCompleted Toggle Function
function ToggleCompletedTodo() {
  isTodoComplete.value = !isTodoComplete.value;
}
</script>

<template>
  <div class="bg-bg2 w-100 p-4 max-h-[650px]">
    <TodoEditForm
      v-if="isInEdit"
      @close-form="CloseEditForm"
      :updateMethod="UpdateTodo"
    />

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
    <!-- If isCompleted is TRUE -->
    <ul
      v-if="isTodoComplete"
      class="space-y-3 max-h-[390px] overflow-scroll scroll-smooth"
    >
      <li
        v-for="list in completedLists"
        class="p-4 pr-6 bg-bg3 flex items-center justify-between"
      >
        <div class="flex flex-col">
          <div class="text-2xl capitalize font-semibold">{{ list.task }}</div>
          <div class="capitalize text-md">> {{ list.status }}</div>
        </div>

        <div class="flex gap-4">
          <FaTrash
            class="text-2xl text-white cursor-pointer"
            @click="DeleteTodo(list.id)"
          />
        </div>
      </li>
    </ul>
    <!-- If isCompleted is FALSE -->
    <ul
      v-else="!isTodoComplete"
      class="space-y-3 max-h-[390px] overflow-scroll scroll-smooth"
    >
      <li
        v-for="list in inCompletedLists"
        class="p-4 pr-6 bg-bg3 flex items-center justify-between"
      >
        <div class="flex flex-col">
          <div class="text-2xl capitalize font-semibold">{{ list.task }}</div>
          <div class="capitalize text-md">> {{ list.status }}</div>
        </div>

        <div class="flex gap-4">
          <CiEdit
            class="text-2xl text-white cursor-pointer"
            @click="OpenEditForm(list.id)"
          />
          <FaTrash
            class="text-2xl text-white cursor-pointer"
            @click="DeleteTodo(list.id)"
          />
        </div>
      </li>
    </ul>
  </div>
</template>
