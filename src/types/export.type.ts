export interface DownloadResponseHeaders {
  'content-disposition': string;
  [key: string]: string | undefined;
}

export interface ExportFileType {
  header: DownloadResponseHeaders;
  data: Blob;
}
