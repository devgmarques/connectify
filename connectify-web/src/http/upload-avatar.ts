import { api } from '@/lib'

type UploadAvatarRequest = {
  file: any
}

type UploadAvatarResponse = void

export async function uploadAvatar({
  file,
}: UploadAvatarRequest): Promise<UploadAvatarResponse> {
  await api.postForm('/user/upload/avatar', {
    file,
  })
}
