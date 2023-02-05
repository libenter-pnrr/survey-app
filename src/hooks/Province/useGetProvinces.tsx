import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import {
  ProvinceType,
  RegionProvinceType,
} from "@application/models/Province/ProvinceType";
import { getProvinces } from "@application/api/Provinces";

const useGetProvinces = () => {
  const { keycloak } = useKeycloak();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [provinces, setProvinces] = React.useState<RegionProvinceType>({});

  React.useEffect(() => {
    fetchRegions();
  }, []);

  const fetchRegions = () => {
    setLoading(true);
    getProvinces({ token: keycloak.token })
      .then((data: RegionProvinceType) => {
        setProvinces(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loading, provinces };
};

export default useGetProvinces;
