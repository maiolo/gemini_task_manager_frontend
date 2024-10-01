<template>
  <div class="task-feed" v-if="isLoggedIn">
    <h2>Task Feed</h2>

    <div v-if="isLoading">
      Loading tasks...
    </div>

    <div v-else-if="tasks.length === 0">
      No tasks found.
    </div>

    <ul v-else>
      <li v-for="task in tasks" :key="task.id">
        <p>{{ task.title }}</p>
      </li>
    </ul>
  </div>
  <div v-else>
    <p>You need to be logged in to view this page.</p>
    <router-link to="/login">Go to Login</router-link>
  </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '../stores/index.js';

export default {
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  data() {
    return {
      tasks: [],
      isLoading: false,
      isLoggedIn: false,
    };
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    async checkLogin() {
      if (this.authStore.token) {
        this.isLoggedIn = true;
        this.fetchTasks();
      }
    },
    async fetchTasks() {
      this.isLoading = true;
      try {
        const response = await axios.get('http://localhost:3001/api/v1/tasks', {
          headers: {
            Authorization: `Bearer ${this.authStore.token}` // Access token from the store
          }
        });
        this.tasks = response.data;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
