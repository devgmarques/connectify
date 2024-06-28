import { Upload, UploadRepository } from "../../entities/upload";
import { supabase } from "@/lib/supabase";

export class UploadSupabaseRepository implements UploadRepository {
  async upload(file: Upload.File, buffer: Buffer) {
    const data = await supabase.storage
      .from("upload")
      .upload(file.filename, buffer, { upsert: true })

    return data.data?.fullPath as string
  }
}