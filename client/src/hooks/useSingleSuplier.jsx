import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useSingleSuplier = (id) => {
  const axiosPublic = useAxiosPublic();

  const {
    data: singleSuplier = [],
    refetch,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["singleCustomer", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/suplier/${id}`);
      return res.data.data;
    },
  });

  return [singleSuplier, refetch, isLoading, isPending];
};

export default useSingleSuplier;
