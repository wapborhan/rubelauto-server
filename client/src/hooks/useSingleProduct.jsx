import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useSingleProduct = (id) => {
  const axiosPublic = useAxiosPublic();

  const {
    data: singleProduct = [],
    refetch,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["singleProduct", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosPublic.get(`/product/${id}`);
      return res.data.data;
    },
  });

  return [singleProduct, refetch, isLoading, isPending];
};

export default useSingleProduct;
