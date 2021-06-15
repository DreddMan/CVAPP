export const useAuthFetch = async (url, options = {}) => {
    const { $auth } = useNuxtApp()

    const res = await useFet