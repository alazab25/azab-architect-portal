
import * as React from "react"
import { createContext, useContext } from "react";
import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const initialState: {
  toasts: ToasterToast[]
} = {
  toasts: [],
}

type ToastContextType = {
  toasts: ToasterToast[]
  addToast: (toast: Omit<ToasterToast, "id">) => void
  updateToast: (toast: ToasterToast) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType>({
  toasts: initialState.toasts,
  addToast: () => {},
  updateToast: () => {},
  removeToast: () => {},
})

export const ToastContextProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [state, setState] = React.useState(initialState)

  const addToast = React.useCallback((toast: Omit<ToasterToast, "id">) => {
    setState((prevState) => {
      const id = Math.random().toString(36).substring(2, 9)
      return {
        toasts: [
          ...prevState.toasts,
          { id, ...toast },
        ],
      }
    })
  }, [])

  const updateToast = React.useCallback((toast: ToasterToast) => {
    setState((prevState) => {
      const toasts = prevState.toasts.map((t) =>
        t.id === toast.id ? { ...t, ...toast } : t
      )
      return { toasts }
    })
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setState((prevState) => {
      const toasts = prevState.toasts.filter((t) => t.id !== id)
      return { toasts }
    })
  }, [])

  return (
    <ToastContext.Provider
      value={{
        toasts: state.toasts,
        addToast,
        updateToast,
        removeToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return {
    ...context,
    toast: (props: Omit<ToasterToast, "id">) => context.addToast(props),
  }
}

type Toast = Omit<ToasterToast, "id">

export const toast = (props: Toast) => {
  const { addToast } = useToast()
  return addToast(props)
}

toast.dismiss = (toastId?: string) => {
  const { toasts, removeToast } = useToast()
  if (toastId) {
    removeToast(toastId)
  } else {
    for (const toast of toasts) {
      removeToast(toast.id)
    }
  }
}

export type { Toast }
