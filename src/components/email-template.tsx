interface EmailTemplateProps {
  message: string
}

export function EmailTemplate({ message }: EmailTemplateProps) {
  return (
    <div>
      <h1>Welcome!</h1>

      <span style={{ fontSize: '0.75rem', color: '#3f3f46' }}>{message}</span>
    </div>
  )
}
