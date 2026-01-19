"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Button } from "@/components/ui/button";
import { MorphingText } from "@/components/ui/morphing-text";
import { useLazyLoginQuery } from "@/lib/features/api";

interface LoginValues {
  phone: string;
  password: string;
}

const Page = () => {
  const router = useRouter();
  const [login, { isLoading }] = useLazyLoginQuery();

  const formik = useFormik<LoginValues>({
    initialValues: {
      phone: "",
      password: "",
    },

    validationSchema: Yup.object({
      phone: Yup.string().required("Введите телефон"),
      password: Yup.string().required("Введите пароль"),
    }),

    onSubmit: async (values) => {
      try {
        const res = await login(values).unwrap();

        if (Array.isArray(res) && res.length > 0) {
          localStorage.setItem("user", JSON.stringify(res[0]));
          router.push("/about");
        } else if (res) {
          localStorage.setItem("user", JSON.stringify(res));
          router.push("/about");
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <div>
      <div className="flex items-center flex-col gap-30 justify-center p-15">
        <MorphingText texts={["Привет, добро пожаловать в", "КАПИТАЛ-Т"]} />

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
          <input
            className="w-[420px] h-[56px] rounded-[20px] border-[3px] border-[#E5E7EB] p-5"
            type="text"
            name="phone"
            placeholder="Телефон"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone && (
            <span className="text-red-500 text-sm">{formik.errors.phone}</span>
          )}

          <input
            className="w-[420px] h-[56px] rounded-[20px] border-[3px] border-[#E5E7EB] p-5"
            type="password"
            name="password"
            placeholder="Пароль"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <span className="text-red-500 text-sm">{formik.errors.password}</span>
          )}

          <Button
            type="submit"
            className="w-[420px] h-[56px] rounded-[20px] bg-[#FFA900] hover:bg-[#e79c06]"
            variant="secondary"
            disabled={isLoading}
          >
            {isLoading ? "Загрузка..." : "Войти"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Page;