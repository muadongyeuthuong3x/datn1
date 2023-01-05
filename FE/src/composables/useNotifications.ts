import { reactive } from 'vue'
import type { notiPush } from './../type_interface/typedata';

const notifications: notiPush[] = reactive([])
const addNotification = ({ message, timeout = null, type = 'info' } : notiPush) => {
    const id = Math.random() + Date.now()
    notifications.push({
        id,
        message,
        type
    })
    if (timeout) {
        setTimeout(() => removeNotification(id), timeout)
    }
}

const removeNotification = (id: number) => {
    const index = notifications.findIndex(item => item.id === id)
    notifications.splice(index, 1)
}
export default function useNotifications() {
    return { notifications, addNotification, removeNotification }
}