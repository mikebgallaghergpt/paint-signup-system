import * as React from "react"

type ToasterToast = {
  id: string
  title?: string
  description?: string
  action?: any
}

interface State {
  toasts: ToasterToast[]
}

const listeners: Array<(state: State) => void> = []
let memoryState: State = { toasts: [] }
let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

function toast({ title, description }: { title?: string; description?: string }) {
  const id = genId()
  
  memoryState = {
    ...memoryState,
    toasts: [{ id, title, description }, ...memoryState.toasts].slice(0, 1)
  }
  
  listeners.forEach((listener) => listener(memoryState))
  
  return { id }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [])

  return {
    ...state,
    toast,
  }
}

export { useToast, toast }
