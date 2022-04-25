<script setup>
definePageMeta({
  layout: 'vuetify-app',
  path: '/account/verify-email/:token',
  title: 'Verify Email'
})
const route = useRoute()
const verifying = ref(fals