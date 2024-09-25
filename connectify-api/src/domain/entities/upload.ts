export type File = {
  type: string,
  fieldname: string,
  filename: string,
  encoding: string,
  mimetype: string,
  toBuffer: () => Promise<Buffer>
}