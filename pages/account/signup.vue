<script setup>
definePageMeta({
  layout: 'vuetify-app'
})

const { $auth } = useNuxtApp()

const formData = ref({
  username: '',
  email: '',
  password1: