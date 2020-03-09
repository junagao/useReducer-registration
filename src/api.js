function getRandomNumber(min, max) {
  return Math.floor(Math.random() * max) + min
}

export function newUser({ username, password, email }) {
  return new Promise((res, rej) => {
    return getRandomNumber(1, 5) === 3
      ? rej('There was an error. Try again.')
      : setTimeout(res, 2000)
  })
}
