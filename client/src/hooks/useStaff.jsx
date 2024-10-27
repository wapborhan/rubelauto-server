import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useStaff = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: staff = [],
    refetch,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["staff"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/user/all`);
      return res.data.data;
    },
  });

  return [staff, refetch, isLoading, isPending];
};

export default useStaff;
