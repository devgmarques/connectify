import { File } from "@/@types/file";
import { UploadRepository } from "../../entities/upload";
import { supabase } from "@/lib/supabase";

export class UploadSupabaseRepository implements UploadRepository {
  async upload(file: File, buffer: Buffer): Promise<any> {
    const data = await supabase.storage
      .from("upload")
      .upload(file.filename, buffer, { upsert: true })

    return data.data?.fullPath
  }
}