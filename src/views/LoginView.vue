<template>
  <div class="login-container">
    <h2>Welcome Back!</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" :disabled="isLoading">
        <span v-if="isLoading">Logging in...</span>
        <span v-else>Login</span>
      </button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p>Don't have an account? <router-link to="/signup">Sign up</router-link></p>
  </div>
</template>

<script>
import axios from 'axios';

// Assuming you are using Vuex for state management
import { useAuthStore } from '../stores/index.js';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      email: '',
      password: '',
      isLoading: false,
      errorMessage: null,
    };
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    return { router, authStore };
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true;
      this.errorMessage = null;

      try {
        const response = await axios.post('http://127.0.0.1:3001/login', {
          user: {
            email: this.email,
            password: this.password,
          }
        });

        // Assuming your backend sends back a token in the response
        const token = response.headers.authorization; // Adjust if needed
        console.log('Signup successful:', response.data);
        console.log('Signup successful:', response);
        // Store the token in Vuex
        this.authStore.setToken(token); // Assuming you have a 'setToken' mutation

        // Redirect to the desired route (e.g., '/tasks')
        this.router.push('/');

      } catch (error) {
        this.errorMessage = 'Invalid email or password';
        console.error('Login error:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
/* ... your login page styles ... */
.error-message {
  color: red;
}
</style>
