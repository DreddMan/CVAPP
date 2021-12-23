
<script setup>
definePageMeta({
  layout: 'vuetify-app',
  middleware: ['auth']
})
const route = useRoute()
const sending = ref(false)
const resent = ref(false)
const errorMsg = ref(null)
const resendEmail = async () => {
  errorMsg.value = null
  sending.value = true
  const { data, error } = await useFetch('/api/account/registration/resend-email/', {
    method: 'POST',
  })
  if (error.value) {
    errorMsg.value = 'Something went wrong. Please try again later.'
  } else {
    resent.value = true
  }
  sending.value = false
}

onNuxtReady(() => {
  if (route.query.resend) {
    resendEmail()
  }
})
</script>

<template>
  <v-card
      class="h-100vh"
  >
    <v-container>
      <v-row>
        <v-col
            sm="9"
            offset-sm="1"
            md="8"
            offset-md="2"
        >
          <v-card
              class="mt-20vh"
              elevation="0"
          >