import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useShowroom = () => {
  const axiosPublic = useAxiosPublic();

  const { data: allShowroom = [], isLoading, refetch } = useQuery({
    queryKey: ["allShowroom"],
    queryFn: async () => {
      const res = await axiosPublic.get("/showroom");
      return res.data.data;
    },
  });

  return [allShowroom, refetch, isLoading];
};

export default useShowroom;
