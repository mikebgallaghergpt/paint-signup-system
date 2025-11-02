import { useToast } from "@/components/ui/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '1rem', 
      right: '1rem', 
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    }}>
      {toasts.map(({ id, title, description }) => (
        <div
          key={id}
          style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '1rem',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
            minWidth: '300px',
            animation: 'slideIn 0.3s ease-out'
          }}
        >
          {title && <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{title}</div>}
          {description && <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{description}</div>}
        </div>
      ))}
    </div>
  )
}
