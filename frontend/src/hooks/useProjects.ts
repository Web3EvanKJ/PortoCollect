import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export interface Project {
  id: number;
  title: string;
  description: string;
  slug: string;
  category?: string;
  github_url?: string;
  live_url?: string;
  tech_stack?: string[];
  user_name?: string;
}

const fetchProjects = async (): Promise<Project[]> => {
  const res = await api.get("/projects");
  return res.data.data;
};

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    staleTime: 1000 * 60, // cache for 5 minutes
  });
};
