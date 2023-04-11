interface ErrorResponse{
  message: string;
  code?: number;

}
export type ResType<T> = T | ErrorResponse

