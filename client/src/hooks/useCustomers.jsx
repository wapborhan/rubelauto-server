import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
import useSingleStaff from "./useSingleStaff";
import { useEffect } from "react";

const useCustomers = (path) => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [singleStaff] = useSingleStaff(user?.email);

  const {
    data: customers = [],
    refetch,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["customers", singleStaff?.showRoom],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/customer/all/${path}?showroom=${singleStaff?.showRoom}`,
      );
      return res.data.data;
    },
  });

  useEffect(() => {
    if (user?.email) {
      refetch();
    }
  }, [user?.email, refetch]);

  return [customers, refetch, isLoading, isPending];
};

export default useCustomers;
