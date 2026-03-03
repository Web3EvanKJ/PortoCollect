import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export interface AdminProject {
  id: number;
  title: string;
  slug: string;
  category?: string;
  is_published: boolean;
}

const fetchMyProjects = async (): Promise<AdminProject[]> => {
  const res = await api.get("/my-projects");
  return res.data.data;
};

export const useMyProjects = () => {
  return useQuery({
    queryKey: ["admin-projects"],
    queryFn: fetchMyProjects,
    staleTime: 1000 * 60 * 5,
  });
};
