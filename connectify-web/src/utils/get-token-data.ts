import nookies from 'nookies'

export function getTokenData() {
  const cookies = nookies.get()
  const token = cookies['connectify.token']

  const payload = JSON.parse(window.atob(token!.split('.')[1]))

  return {
    payload,
  }
}
