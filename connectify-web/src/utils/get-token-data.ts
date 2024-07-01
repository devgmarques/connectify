import nookies from 'nookies'

type GetTokenDataResponse = {
  nickname: string
  sub: string
}

export function getTokenData(): GetTokenDataResponse {
  const cookies = nookies.get()
  const token = cookies['connectify.token']

  const payload = JSON.parse(window.atob(token!.split('.')[1]))

  return payload
}
