import { useState} from "react"

type Notification = {
    type?: 'success' | 'error',
    message: string
}

const useNotification = () => {
    const [notification, setNotification] = useState<Notification | null>(null)

    const setSuccessNotification = (message: string) => {
        setNotification({
            type: 'success',
            message
        })
    }

    const setErrorNotification = (message: string) => {
        setNotification({
            type: 'error',
            message
        })
    }

    const clearNotification = () => {
        setNotification(null)
    }

    return {
        notification,
        setSuccessNotification,
        setErrorNotification,
        clearNotification,
    }

}

export default useNotification