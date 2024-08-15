interface EmailTemplateProps {
  firstName: string
}

export function EmailTemplate({ firstName }: EmailTemplateProps) {
  return (
    <div>
      <h1>Welcome, {firstName}!</h1>

      <span style={{ fontSize: '0.75rem', color: '#3f3f46' }}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit.{' '}
        <span style={{ fontSize: '1.25rem', color: '#6366f1' }}>
          Totam ipsam tenetur rem dicta voluptatem in adipisci!
        </span>{' '}
        Rem officiis dolores dicta aut est aspernatur ipsa, quod molestias vel
        sunt. Delectus, architecto.
      </span>
    </div>
  )
}
