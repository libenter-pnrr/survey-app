import { IProvinceResponse } from "@application/models/Province/IProvinceResponse";
import { RegionProvinceType } from "@application/models/Province/ProvinceType";
import { AxiosError } from "axios";
import { http } from "../http";
import IRequest from "../Request/IRequest";

export const getProvinces = async ({
  token,
}: IRequest): Promise<RegionProvinceType | AxiosError> => {
  const { data }: IProvinceResponse = await http.get("/province", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return data as RegionProvinceType;
};
