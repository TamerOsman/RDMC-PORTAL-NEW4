/* eslint-disable space-before-function-paren */
export function setCookie(name: string, value: string, days: number | 365) {
  const date = new Date()
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)) // days in milliseconds
  const expires = 'expires=' + date.toUTCString()
  document.cookie = name + '=' + value + ';' + expires + ';path=/'
}

export function getCookie(name: string) {
  const nameEQ = name + '='
  const cookiesArray = document.cookie.split(';')
  for (let i = 0; i < cookiesArray.length; i++) {
    const cookie = cookiesArray[i].trim()
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length)
    }
  }
  return null
}

export function removeCookie(name: string) {
  setCookie(name, '', -1) // Set cookie to expire in the past
}

export function setSession(name: string, value: string) {
  sessionStorage.setItem(name, value)
}

export function getSession(name: string): string | null {
  return sessionStorage.getItem(name)
}

export function removeSession(name: string) {
  sessionStorage.removeItem(name)
}
