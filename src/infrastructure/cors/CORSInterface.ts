export default interface CORSInterface {
  init(
    origin: string[],
    methods: string,
    preflitContinue: boolean,
    opts: any
  ): any;
}
