export default interface ResponderInterface {
  respond(
    message: string,
    data: any,
    statusCode: number,
    success: boolean,
    errors: any[] | null,
    ctx: any
  ): void;
}
