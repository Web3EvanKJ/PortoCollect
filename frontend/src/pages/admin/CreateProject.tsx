import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../../api/axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Loader2 } from "lucide-react";
import { Field } from "../../components/fragments/Field";
import CategorySelect from "../../components/fragments/CategorySelect";

const inputWithIcon =
  "w-full bg-[#f5f5f8] border border-black/[0.07] rounded-xl pl-4 pr-4 py-3 text-sm text-[#0a0a0f] placeholder-[#a0a0b8] focus:outline-none focus:border-[#F9140D]/40 focus:bg-white focus:ring-2 focus:ring-[#F9140D]/10 transition-all duration-150";

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CreateProject() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category_id: "",
      github_url: "",
      live_url: "",
      tech_stack: "",
      is_published: true,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required").max(255),
      description: Yup.string()
        .required("Description is required")
        .min(10, "Minimum 10 characters"),
      category_id: Yup.number().required("Category is required"),
      github_url: Yup.string().url("Invalid URL").nullable(),
      live_url: Yup.string().url("Invalid URL").nullable(),
      tech_stack: Yup.string(),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      await api.post("/admin/projects", {
        ...values,
        tech_stack: values.tech_stack
          ? values.tech_stack.split(",").map((t) => t.trim())
          : [],
      });
      setLoading(false);
      navigate("/admin/projects");
    },
  });

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="max-w-[680px] mx-auto px-12 py-14">
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-extrabold text-[2rem] text-[#0a0a0f] tracking-tight mb-1.5">
            Create Project
          </h1>
          <p className="text-[#80809a] text-sm">
            Fill in the details below to publish a new portfolio project.
          </p>
        </div>

        {/* Form card */}
        <form onSubmit={formik.handleSubmit}>
          <div
            className="bg-white border border-black/[0.07] rounded-[22px] p-8 mb-4"
            style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
          >
            <div className="flex flex-col gap-5">
              {/* Title */}
              <Field
                label="Title"
                error={formik.errors.title as string}
                touched={formik.touched.title}
              >
                <div className="relative">
                  <input
                    name="title"
                    placeholder="e.g. Blog System"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    className={inputWithIcon}
                  />
                </div>
              </Field>

              {/* Description */}
              <Field
                label="Description"
                error={formik.errors.description as string}
                touched={formik.touched.description}
              >
                <div className="relative">
                  <textarea
                    name="description"
                    placeholder="Describe what this project does..."
                    rows={4}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    className={`${inputWithIcon} resize-none`}
                  />
                </div>
              </Field>

              <CategorySelect formik={formik} />

              {/* Tech Stack */}
              <Field label="Tech Stack">
                <div className="relative">
                  <input
                    name="tech_stack"
                    placeholder="Laravel, React, Tailwind (comma separated)"
                    onChange={formik.handleChange}
                    value={formik.values.tech_stack}
                    className={inputWithIcon}
                  />
                </div>
              </Field>

              {/* GitHub URL */}
              <Field
                label="GitHub URL"
                error={formik.errors.github_url as string}
                touched={formik.touched.github_url}
              >
                <div className="relative">
                  <input
                    name="github_url"
                    placeholder="https://github.com/username/repo"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.github_url}
                    className={inputWithIcon}
                  />
                </div>
              </Field>

              {/* Live URL */}
              <Field
                label="Live URL"
                error={formik.errors.live_url as string}
                touched={formik.touched.live_url}
              >
                <div className="relative">
                  <input
                    name="live_url"
                    placeholder="https://myproject.com"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.live_url}
                    className={inputWithIcon}
                  />
                </div>
              </Field>
            </div>
          </div>

          {/* Publish toggle card */}
          {/* <div
            className="bg-white border border-black/[0.07] rounded-[22px] p-6 mb-6 flex items-center justify-between"
            style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
          >
            <div>
              <p className="font-semibold text-sm text-[#0a0a0f]">
                Publish project
              </p>
              <p className="text-[#80809a] text-xs mt-0.5">
                Make this project visible to the public
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                formik.setFieldValue(
                  "is_published",
                  !formik.values.is_published,
                )
              }
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
                formik.values.is_published ? "bg-[#F9140D]" : "bg-[#e0e0ea]"
              }`}
            >
              <span
                className={`absolute top-[3px] left-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-transform duration-200 ${
                  formik.values.is_published ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div> */}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#F9140D] text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-[#d90f0b] hover:-translate-y-px active:translate-y-0 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            style={{ boxShadow: "0 4px 14px rgba(249,20,13,0.25)" }}
          >
            {loading ? (
              <>
                <Loader2 size={15} strokeWidth={2} className="animate-spin" />
                Saving...
              </>
            ) : (
              "Save Project"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
