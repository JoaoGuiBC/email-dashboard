import 'dayjs/locale/pt-br'

import dayjs from 'dayjs'

dayjs.locale('pt-br')

export function formatEmailDate(createdAt: Date | undefined) {
  return dayjs(createdAt).format('D [de] MMM [de] YYYY')
}
