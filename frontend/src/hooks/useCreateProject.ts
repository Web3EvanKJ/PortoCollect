import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

interface CreateProjectPayload {
  title: string;
  description: string;
  category_id: number | string;
  github_url?: string;
  live_url?: string;
  tech_stack?: string;
  is_published: boolean;
}

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: CreateProjectPayload) => {
      const res = await api.post("/admin/projects", {
        ...values,
        tech_stack: values.tech_stack
          ? values.tech_stack.split(",").map((t) => t.trim())
          : [],
      });

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
