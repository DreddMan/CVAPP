
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
    conversation.value = Object.assign(conversation.value, currentConversation)
    conversation.value.loadingMessages = true
    const { data, error } = await useAuthFetch('/api/chat/messages/?conversationId=' + currentConversation.id)
    if (!error.value) {
        conversation.value.messages = data.value
    }
    conversation.value.loadingMessages = true
}

export const genTitle = async (conversationId) => {