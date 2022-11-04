export const generatePassword = (passwordLength = 6) => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let password = ''

  for (let i = 0; i <= passwordLength; i = +1) {
    const randomNumber = Math.floor(Math.random() * chars.length)
    password += chars.substring(randomNumber, randomNumber + 1)
  }

  return password
}

export const generateRandomCodeNumber = (length: number) => {
  const min = 10 ** (length - 1)
  const max = 10 ** length
  return Math.floor(Math.random() * (max - min) + min)
}
