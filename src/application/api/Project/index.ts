import IProjectTypeResponse from "@application/models/Project/IProjectTypeResponse";
import ISearchProjectDataRequest from "@application/models/Project/ISearchProjectDataRequest";
import ISearchProjectDataResponse, {
  ISearchProjectData,
} from "@application/models/Project/ISearchProjectDataResponse";
import { ProjectType } from "@application/models/Project/ProjectType";
import { http } from "../http";
import IRequest from "../Request/IRequest";

export const getProjectData = async ({
  token,
  customer,
  regions,
  provinces,
  projectTypes,
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
      projectTypes,
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

export const getProjectTypes = async ({
  token,
}: IRequest): Promise<ProjectType[]> => {
  const { data }: IProjectTypeResponse = await http.get("/cup-type", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return data as ProjectType[];
};
