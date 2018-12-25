export default interface IHttpError {
  message: string,
  name: string,
  type: string,
  statusCode: number,
  fields?: Object[],
}
