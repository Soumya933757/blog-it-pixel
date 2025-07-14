import { useQuery } from "react-query";

import organizationsApi from "../../apis/organizations";
import { QUERY_KEYS } from "../../constants/query";

export const useFetchOrganizations = () =>
  useQuery({
    queryKey: [QUERY_KEYS.ORGANIZATIONS],
    queryFn: () => organizationsApi.fetch(),
  });
