<script setup>
definePageMeta({
  layout: 'vuetify-app',
  path: '/account/verify-email/:token',
  title: 'Verify Email'
})
const route = useRoute()
const verifying = ref(false)
const status = ref('')

const verifyEmail = async () => {
  verifying.value = true
  const { data, error } = await useFetch(`/api/account/registration/verify-email/`, {
    method: 'POST',
    body: JSON.stringify({
      key: route.params.token
