import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../../api/axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Loader2 } from "lucide-react";
import { Field } from "../../components/fragments/Field";
import CategorySelect from "../../components/fragments/CategorySelect";

const inputWithIcon =
  "w-full bg-[#f5f5f8] border border-black/[0.07] rounded-xl pl-4 pr-4 py-3 text-sm text-[#0a0a0f] placeholder-[#a0a0b8] focus:outline-none focus:border-[#F9140D]/40 focus:bg-white focus:ring-2 focus:ring-[#F9140D]/10 transition-all duration-150";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loadingData, setLoadingData] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      description: "",
      category_id: "",
      github_url: "",
      live_url: "",
      tech_stack: "",
      is_published: false,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required").max(255),
      description: Yup.string()
        .required("Description is required")
        .min(10, "Minimum 10 characters"),
      category_id: Yup.number().required("Category is required"),
      github_url: Yup.string().url("Invalid URL").nullable(),
      live_url: Yup.string().url("Invalid URL").nullable(),
    }),
    onSubmit: async (values) => {
      setLoadingSubmit(true);

      await api.put(`/admin/projects/${id}`, {
        ...values,
        tech_stack: values.tech_stack
          ? values.tech_stack.split(",").map((t) => t.trim())
          : [],
      });

      setLoadingSubmit(false);
      navigate("/admin/projects");
    },
  });

  // Fetch project
  useEffect(() => {
    const fetchProject = async () => {
      const res = await api.get(`/projects/${id}`);
      const project = res.data.data;

      formik.setValues({
        title: project.title || "",
        description: project.description || "",
        category_id: project.category_id || "",
        github_url: project.github_url || "",
        live_url: project.live_url || "",
        tech_stack: project.tech_stack ? project.tech_stack.join(", ") : "",
        is_published: project.is_published || false,
      });

      setLoadingData(false);
    };

    fetchProject();
  }, [id]);

  if (loadingData) {
    return (
      <div className="flex items-center justify-center py-20 gap-3">
        <div className="w-5 h-5 rounded-full border-2 border-[#F9140D]/20 border-t-[#F9140D] animate-spin" />
        <span className="text-sm text-[#80809a]">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="max-w-[680px] mx-auto px-12 py-14">
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-extrabold text-[2rem] text-[#0a0a0f] tracking-tight mb-1.5">
            Edit Project
          </h1>
          <p className="text-[#80809a] text-sm">
            Update the details of this portfolio project.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div
            className="bg-white border border-black/[0.07] rounded-[22px] p-8 mb-4"
            style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
          >
            <div className="flex flex-col gap-5">
              {/* Title (READ ONLY) */}
              <Field
                label="Title"
                error={formik.errors.title as string}
                touched={formik.touched.title}
              >
                <input
                  name="title"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                  className={inputWithIcon}
                />
              </Field>

              {/* Description */}
              <Field
                label="Description"
                error={formik.errors.description as string}
                touched={formik.touched.description}
              >
                <textarea
                  name="description"
                  rows={4}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                  className={`${inputWithIcon} resize-none`}
                />
              </Field>

              <CategorySelect formik={formik} />

              {/* Tech Stack */}
              <Field label="Tech Stack">
                <input
                  name="tech_stack"
                  onChange={formik.handleChange}
                  value={formik.values.tech_stack}
                  className={inputWithIcon}
                />
              </Field>

              {/* GitHub URL */}
              <Field
                label="GitHub URL"
                error={formik.errors.github_url as string}
                touched={formik.touched.github_url}
              >
                <input
                  name="github_url"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.github_url}
                  className={inputWithIcon}
                />
              </Field>

              {/* Live URL */}
              <Field
                label="Live URL"
                error={formik.errors.live_url as string}
                touched={formik.touched.live_url}
              >
                <input
                  name="live_url"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.live_url}
                  className={inputWithIcon}
                />
              </Field>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loadingSubmit}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#F9140D] text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-[#d90f0b] transition-all duration-150 disabled:opacity-60"
            style={{ boxShadow: "0 4px 14px rgba(249,20,13,0.25)" }}
          >
            {loadingSubmit ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Updating...
              </>
            ) : (
              "Update Project"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
