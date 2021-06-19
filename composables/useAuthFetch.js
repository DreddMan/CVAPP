export const useAuthFetch = async (url, options = {}) => {
    const { $auth } = useNuxtApp()

    const res = await useFetch(url, options)
    if (res.error.value && res.err