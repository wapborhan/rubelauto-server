import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useSingleInstallment = (cardNo) => {
  const axiosPublic = useAxiosPublic();

  const {
    data: singleInstallment = [],
    refetch,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["singleInstallment", cardNo],
    enabled: !!cardNo,
    queryFn: async () => {
      const res = await axiosPublic.get(`/installment/${cardNo}`);
      return res.data.data;
    },
  });

  return [singleInstallment, refetch, isLoading, isPending];
};

export default useSingleInstallment;
