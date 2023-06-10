import config from "../../config";

export default class Fixture {
  public url: string;
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
  ) {
    this.url = this.generateURL();
  }

  private generateURL(): string {
    return `${config.getClientOrigin}/api/v1/fixture/${this.id}`;
  }
}
