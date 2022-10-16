export const delay = (delayTimes: number = 1000) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(null)
    }, delayTimes)
  })
}
