import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useLeads = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: leads = [],
    refetch,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      const res = await axiosPublic.get("/lead");
      return res.data.data;
    },
  });

  return [leads, refetch, isLoading, isPending];
};

export default useLeads;
