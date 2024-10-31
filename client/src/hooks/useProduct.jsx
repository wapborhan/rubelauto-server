import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useProduct = () => {
  const axiosPublic = useAxiosPublic();

  const { data: product = [], isLoading, refetch } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await axiosPublic.get("/product");
      return res.data.data;
    },
  });

  return [product, refetch, isLoading];
};

export default useProduct;
