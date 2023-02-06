import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import { ProjectType } from "@application/models/Project/ProjectType";
import { getProjectTypes } from "@application/api/Project";

const useGetProjectType = () => {
  const { keycloak } = useKeycloak();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [projectTypes, setProjectTypes] = React.useState<ProjectType[]>([]);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    getProjectTypes({ token: keycloak.token })
      .then((data: ProjectType[]) => {
        setProjectTypes(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loading, projectTypes };
};

export default useGetProjectType;
