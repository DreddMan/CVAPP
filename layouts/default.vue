
<script setup>
import {useDisplay} from "vuetify";

const { $i18n } = useNuxtApp()
const runtimeConfig = useRuntimeConfig()
const colorMode = useColorMode()
const drawer = ref(null)
const themes = ref([
  { title: $i18n.t('lightMode'), value: 'light' },
  { title: $i18n.t('darkMode'), value: 'dark' },
  { title: $i18n.t('followSystem'), value: 'system'}
])
const setTheme = (theme) => {
  colorMode.preference = theme
}
const feedback = () => {
  window.open('https://github.com/WongSaang/chatgpt-ui/issues', '_blank')
}

const { locale, locales, setLocale } = useI18n()
const setLang = (lang) => {
  setLocale(lang)
}

const conversations = useConversions()
const currentConversation = useConversion()

const editingConversation = ref(null)
const deletingConversationIndex = ref(null)

const editConversation = (index) => {
  editingConversation.value = conversations.value[index]
}

const updateConversation = async (index) => {
  editingConversation.value.updating = true
  const { data, error } = await useAuthFetch(`/api/chat/conversations/${editingConversation.value.id}/`, {
    method: 'PUT',
    body: JSON.stringify({
      topic: editingConversation.value.topic
    })