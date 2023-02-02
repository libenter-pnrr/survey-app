import ISearchProjectDataRequest from "@application/models/Project/ISearchProjectDataRequest";
import ISearchProjectDataResponse, {
  ISearchProjectData,
} from "@application/models/Project/ISearchProjectDataResponse";
import { http } from "../http";

export const getProjectData = async ({
  token,
  customer,
  regions,
  provinces,
  cup,
  offset,
  limit,
}: ISearchProjectDataRequest): Promise<ISearchProjectData> => {
  const response: ISearchProjectDataResponse = await http.post(
    "/cup/search",
    {
      customer,
      regions,
      cup,
      provinces,
      offset,
      limit,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data as ISearchProjectData;
};
