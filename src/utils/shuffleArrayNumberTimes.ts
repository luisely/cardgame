import _ from 'lodash'

export function shuffleArrayNumberTimes<T>(array: T[], times: number) {
  let n = 0
  let result: T[] = [...array]
  while (n < times) {
    n++
    result = _.shuffle(result)
    console.log(result)
  }
  return result
}
