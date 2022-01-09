<script setup>
definePageMeta({
  layout: 'vuetify-app'
})

const { $auth } = useNuxtApp()

const formData = ref({
  username: '',
  email: '',
  password1: '',
  password2: '',
})

const fieldErrors = ref({
  username: '',
  email: '',
  password1: '',
  password2: '',
})

const formRules = ref({
  username: [
    v => !!v || 'Please enter your username',
    v => v.length >= 4 || 'Username must be at least 4 chara