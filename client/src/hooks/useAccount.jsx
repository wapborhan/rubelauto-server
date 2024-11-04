import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAccount = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: allAccounts = [],
    refetch,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["allAccounts"],
    queryFn: async () => {
      const res = await axiosPublic.get("/account/all");
      return res.data.data;
    },
  });

  return [allAccounts, refetch, isLoading, isPending];
}

export default useAccount