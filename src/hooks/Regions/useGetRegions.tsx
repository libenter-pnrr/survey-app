import React from "react";
import { RegionType } from "@application/models/Region/RegionType";
import { useKeycloak } from "@react-keycloak/web";
import { getRegions } from "@application/api/Region";

const useGetRegions = () => {
  const { keycloak } = useKeycloak();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [regions, setRegions] = React.useState<RegionType[]>([]);

  React.useEffect(() => {
    fetchRegions();
  }, []);

  const fetchRegions = () => {
    setLoading(true);
    getRegions({ token: keycloak.token })
      .then((data: RegionType[]) => {
        setRegions(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loading, regions };
};

export default useGetRegions;
