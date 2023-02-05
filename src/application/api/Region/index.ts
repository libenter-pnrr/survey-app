import { RegionType } from "@application/models/Region/RegionType";
import { http } from "../http";
import IRequest from "../Request/IRequest";

export const getRegions = async ({
  token,
}: IRequest): Promise<RegionType[]> => {
  const { data } = await http.get("/region", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return data;
};
