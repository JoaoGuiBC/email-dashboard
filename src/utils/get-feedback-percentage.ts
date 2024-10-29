type answer = {
  id: string
  text: string
  recipient: string
  isAPositiveFeedback: boolean
}

type getFeedBackPercentageReturn = {
  percentage: number
  color: 'text-red-600' | 'text-green-600'
}

export function getFeedBackPercentage(
  answers: answer[],
): getFeedBackPercentageReturn {
  const numberOfPositiveFeedbacks = answers.filter(
    (answer) => answer.isAPositiveFeedback,
  ).length

  const percentage = Number(
    (100 / (answers.length / numberOfPositiveFeedbacks)).toFixed(2),
  )

  if (percentage >= 60) return { percentage, color: 'text-green-600' }

  return { percentage, color: 'text-red-600' }
}
