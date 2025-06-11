<script setup>
import { useTodoStore } from '../stores/todo.js';
import { onMounted, reactive, defineEmits, defineProps, watch } from 'vue';

const props = defineProps({
  updateMethod: Function,
});

const todoStore = useTodoStore();

const selectedTodo = reactive({
  task: '',
  status: 'selectStatus',
  isCompleted: false,
});

const emit = defineEmits(['close-form']);

onMounted(() => {
  try {
    selectedTodo.task = todoStore.selectedList.task;
    selectedTodo.status = todoStore.selectedList.status;
    selectedTodo.isCompleted = todoStore.selectedList.isCompleted;
  } catch (err) {
    console.log(`Form Mounted Error: ${err}`);
  }
});

watch(
  () => selectedTodo.status,
  (newVal) => {
    selectedTodo.isCompleted = newVal === "Done"
  },
);

function HandleCloseForm() {
  emit('close-form');
}

function HandleUpdateTodo() {
  props.updateMethod(selectedTodo, todoStore.selectedList.id);
  console.log(selectedTodo);
  alert(
    `Update task: '${todoStore.selectedList.task}' to '${selectedTodo.task}'`,
  );
  alert(
    `Update status: '${todoStore.selectedList.status}' to '${selectedTodo.status}'`,
  );
  HandleCloseForm();
}
</script>

<template>
  <div
    class="absolute bg-black/50 backdrop-blur-xs z-99 w-screen h-screen left-0 top-0 flex items-center justify-center"
    @click.self="HandleCloseForm"
  >
    <!-- Form Contents -->
    <div
      class="transition-all bg-bg2 p-4 text-start space-y-3 shadow-2xl shadow-amber-900-100"
    >
      <div class="text-2xl font-semibold text-center">Edit</div>

      <hr class="my-2 text-white/50" />

      <div class="flex flex-col space-y-2">
        <span class="font-semibold text-lg text-left">Task</span>
        <input
          type="text"
          class="bg-bg3 outline-none p-1 w-full text-black"
          v-model="selectedTodo.task"
        />
      </div>

      <div class="flex flex-col space-y-2">
        <span class="font-semibold text-lg text-left">Status</span>
        <select
          class="bg-bg3 p-1 h-full text-black outline-none"
          v-model="selectedTodo.status"
        >
          <option
            value="selectStatus"
            disabled
          >
            Select Status
          </option>
          <option
            v-for="status in todoStore.statuses"
            :value="status"
            class="outline-none"
          >
            {{ status }}
          </option>
        </select>
      </div>

      <!-- Buttons -->
      <div class="flex items-center gap-3 mt-4">
        <button
          class="transition-all p-2 bg-[#5f5f5f] hover:bg-[#525252] cursor-pointer rounded-xs w-1/2"
          @click="HandleCloseForm"
        >
          Close
        </button>
        <button
          class="transition-all p-2 bg-main hover:bg-mainDarker cursor-pointer rounded-xs w-1/2"
          @click="HandleUpdateTodo"
        >
          Update
        </button>
      </div>
    </div>
  </div>
</template>
