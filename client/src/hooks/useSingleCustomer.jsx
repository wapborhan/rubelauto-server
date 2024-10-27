import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useSingleCustomer = (cardNo) => {
  const axiosPublic = useAxiosPublic();

  const {
    data: singleCustomer = [],
    refetch,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["singleCustomer", cardNo],
    queryFn: async () => {
      const res = await axiosPublic.get(`/customer/${cardNo}`);
      return res.data.data;
    },
  });

  return [singleCustomer[0], refetch, isLoading, isPending];
};

export default useSingleCustomer;
