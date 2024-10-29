import type { NextRequest } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const emailId = searchParams.get('emailId')

  if (!emailId) {
    return Response.json({ message: 'Email não encontrado' }, { status: 404 })
  }

  const email = await prisma.email.findUnique({
    where: { id: emailId },
    select: {
      id: true,
      subject: true,
      createdAt: true,
      numberOfRecipients: true,
      numberOfViews: true,
      answers: {
        select: {
          id: true,
          recipient: true,
          text: true,
          isAPositiveFeedback: true,
        },
        orderBy: { recipient: 'asc' },
      },
    },
  })

  if (!email) {
    return Response.json({ message: 'Email não encontrado' }, { status: 404 })
  }

  return Response.json({ email })
}
