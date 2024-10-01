<template>
  <div class="signup-container">
    <h2>Create an Account</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="name" id="name" v-model="name" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" :disabled="isLoading">
        <span v-if="isLoading">Signing up...</span>
        <span v-else>Sign Up</span>
      </button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p> <router-link to="/login">Log in</router-link>
  </div>
</template>

<script>
import axios from 'axios'; // Or your preferred HTTP client
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      isLoading: false,
      errorMessage: null,
      successMessage: null, // Add for success message
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true;
      this.errorMessage = null;
      this.successMessage = null; // Clear previous messages

      try {
        const response = await axios.post('http://127.0.0.1:3001/signup', {
          user: {
            name: this.name,
            email: this.email,
            password: this.password,
          }
        });

        // Handle successful signup
        console.log('Signup successful:', response.data);
        this.successMessage = 'Signup successful! You can now log in.';
        setTimeout(() => {
          this.router.push('/login'); // Redirect after a delay
        }, 2000); // Redirect to login after 2 seconds (adjust as needed)

      } catch (error) {
        this.errorMessage = 'Error during signup. Please try again.';
        console.error('Signup error:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
/* ... your signup page styles ... */
.error-message {
  color: red;
}
.success-message {
  color: green;
}
</style>
