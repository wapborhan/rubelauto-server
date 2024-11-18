import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useSingleStaff = (email) => {
  const axiosPublic = useAxiosPublic();

  const {
    data: singlestaff = [],
    refetch,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["singlestaff", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/user?email=${email}`);
      return res.data.data;
    },
  });

  return [singlestaff, refetch, isLoading, isPending];
};

export default useSingleStaff;
