import nookies from 'nookies'

type GetTokenDataResponse = {
  nickname: string
  sub: string
}

export async function getTokenData(): Promise<GetTokenDataResponse> {
  let token: string | undefined

  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers')
    const cookieStore = cookies()

    token = cookieStore.get('connectify.token')?.value
  } else {
    const cookies = nookies.get(null)
    token = cookies['connectify.token']
  }

  if (!token) {
    throw new Error('Token not found')
  }

  const payload = JSON.parse(
    Buffer.from(token.split('.')[1], 'base64').toString('utf-8'),
  )

  return payload as GetTokenDataResponse
}
