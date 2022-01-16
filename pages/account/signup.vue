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
    v => v.length >= 4 || 'Username must be at least 4 characters'
  ],
  email: [
    v => !!v || 'Please enter your e-mail address',
    v => /.+@.+\..+/.test(v) || 'E-mail address must be valid'
  ],
  password1: [
    v => !!v || 'Please enter your password',
    v => v.length >= 8 || 'Password must be at least 8 characters'
  ],
  password2: [
    v => !!v || 'Please confirm your password',
    v => v.length >= 8 || 'Password must be at least 8 characters',
    v => v === formData.value.password1 || 'Confirm passwor