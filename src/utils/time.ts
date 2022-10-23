export const delay = (delayTimes = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null)
    }, delayTimes)
  })
}
