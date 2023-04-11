class HttpError extends Error {
  constructor(public statusCode:number,msg:string) {
    super(msg)
  }
}



export default HttpError