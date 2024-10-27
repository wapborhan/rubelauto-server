import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useStock = () => {
  const axiosPublic = useAxiosPublic();

  const { data: stock = [], isLoading } = useQuery({
    queryKey: ["stock"],
    queryFn: async () => {
      const res = await axiosPublic.get("/stock");
      return res.data.data;
    },
  });

  return [stock, isLoading];
};

export default useStock;
