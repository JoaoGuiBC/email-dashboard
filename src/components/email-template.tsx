interface EmailTemplateProps {
  title: string
  message: string
}

export function EmailTemplate({ title, message }: EmailTemplateProps) {
  return (
    <div>
      <h1>{title}</h1>

      <span style={{ fontSize: '1rem', color: '#3f3f46' }}>{message}</span>
    </div>
  )
}
