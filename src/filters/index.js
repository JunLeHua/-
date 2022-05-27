import dayjs from 'dayjs'
export function dateformat (value) {
  return dayjs(value).format('YYYY-MM-DD')
}
