import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

interface UpdateProjectPayload {
  id: string;
  values: any;
}

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, values }: UpdateProjectPayload) => {
      const res = await api.put(`/admin/projects/${id}`, {
        ...values,
        tech_stack: values.tech_stack
          ? values.tech_stack.split(",").map((t: string) => t.trim())
          : [],
      });

      return res.data;
    },

    onSuccess: () => {
      // Refresh admin list
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
