import config from "../../config";

export const generateFixtureURL = (id: string) => {
  return `${config.getClientOrigin()}/api/v1/fixture/${id}`;
};
