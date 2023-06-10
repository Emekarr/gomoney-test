import config from "../../config";

export default class Fixture {
  constructor(
    public id: string,
    public createdBy: string,
    public name: string,
    public completed: string,
    public teamOneName: string,
    public teamOneID: string,
    public teamTwoName: string,
    public teamTwoID: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
  getURL(): string {
    return `${config.getClientOrigin}/api/v1/fixture/${this.id}`;
  }
}
