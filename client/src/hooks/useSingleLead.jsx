import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useSingleLead = (id) => {
  const axiosPublic = useAxiosPublic();

  const {
    data: singleLead = [],
    refetch,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["singleLead", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosPublic.get(`/lead/${id}`);
      return res.data.data;
    },
  });

  return [singleLead[0], refetch, isLoading, isPending];
};

export default useSingleLead;
