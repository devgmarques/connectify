export type UploadRepository = {
  upload(file: Upload.File, buffer: Buffer): Promise<string>
}

export namespace Upload {
  export type File = {
    type: string,
    fieldname: string,
    filename: string,
    encoding: string,
    mimetype: string,
    toBuffer: () => Promise<Buffer>
  }
}