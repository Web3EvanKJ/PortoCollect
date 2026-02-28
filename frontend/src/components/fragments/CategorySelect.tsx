import { useEffect, useState } from "react";
import { Field } from "./Field";
import api from "../../api/axios";

export function CategorySelect({ formik }: { formik: any }) {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await api.get("/categories");
      setCategories(res.data);
    };
    fetchCategories();
  }, []);

  return (
    <Field
      label="Category"
      error={formik.errors.category_id as string}
      touched={formik.touched.category_id}
    >
      <div className="relative">
        <select
          name="category_id"
          value={formik.values.category_id}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full appearance-none bg-[#f5f5f8] border border-black/[0.07] rounded-xl px-4 py-3 text-sm text-[#0a0a0f]"
        >
          <option value="" disabled>
            Select a category
          </option>

          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Custom arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#80809a] text-sm">
          ▼
        </div>
      </div>
    </Field>
  );
}

export default CategorySelect;
