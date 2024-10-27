import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useSuplier = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: allSuplier = [],
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["allSuplier"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/suplier`);
      return res.data.data;
    },
  });

  return [allSuplier, isLoading, isPending];
};

export default useSuplier;
