
export const getDefaultConversionData = () => {
    return {
        id: null,
        topic: null,
        messages: [],
        loadingMessages: false,
    }
}

export const getConversions = async () => {
    const { data, error } = await useAuthFetch('/api/chat/conversations/')
    if (!error.value) {
        return data.value
    }
    return []
}

export const createNewConversion = () => {
    const conversation = useConversion()
    conversation.value = getDefaultConversionData()
}

export const openConversationMessages = async (currentConversation) => {
    const conversation = useConversion()
    conversation.value = Object.assign(conve