import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import { getProjectInfo } from "@application/api/Project";
import { ProjectDataDetails } from "@application/models/Project/IGetProjectInfoResponse";

const useGetProjectInfo = (projectId: string | null) => {
  const { keycloak } = useKeycloak();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [projectInfo, setProjectInfo] =
    React.useState<ProjectDataDetails | null>(null);

  React.useEffect(() => {
    if (projectId) {
      fetchData();
    } else {
      setProjectInfo(null);
    }
  }, [projectId]);

  const fetchData = () => {
    setLoading(true);
    getProjectInfo({ token: keycloak.token, id: projectId })
      .then((data: ProjectDataDetails) => {
        setProjectInfo(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loading, projectInfo };
};

export default useGetProjectInfo;
