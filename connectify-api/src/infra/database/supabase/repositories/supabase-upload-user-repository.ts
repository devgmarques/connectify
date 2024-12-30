import { UploadRepository } from "@/application/protocols/database"
import { supabase } from ".."

export class SupabaseUploadUserRepository implements UploadRepository {
  async upload(input: UploadRepository.Upload.Input): UploadRepository.Upload.Output {
    const data = await supabase.storage
      .from("upload")
      .upload(input.file.filename, input.buffer, { upsert: true })

    return data.data?.fullPath as string
  }
}