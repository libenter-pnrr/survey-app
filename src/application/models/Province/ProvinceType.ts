export type ProvinceType = {
  code: string;
  name: string;
  acronym: string;
};

export type RegionProvinceType = {
  [key: string]: ProvinceType[];
};
