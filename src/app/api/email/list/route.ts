import { prisma } from '@/lib/prisma'

export async function GET() {
  const emails = await prisma.email.findMany({
    select: {
      id: true,
      subject: true,
      createdAt: true,
      numberOfRecipients: true,
      numberOfViews: true,
      answers: {
        select: { isAPositiveFeedback: true },
      },
    },
    orderBy: { createdAt: 'asc' },
  })

  return Response.json({ emails })
}
