"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useFormik } from "formik";
import { UploadCloud, X } from "lucide-react";
import {
    useAddVocationsMutation,
    useEditVocationsMutation,
    useGetTodosQuery,
} from "@/lib/features/api";
import { useSearchParams, useRouter } from "next/navigation";

const Page = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get("id");

    const { data: todos = [], isLoading } = useGetTodosQuery();
    const [addVocations] = useAddVocationsMutation();
    const [editVocations] = useEditVocationsMutation();

    const [previews, setPreviews] = useState<string[]>([]);
    const [error, setError] = useState("");

    const initialData = useMemo(
        () => todos.find((todo: any) => String(todo.id) === String(id)),
        [todos, id]
    );
    const isEdit = Boolean(initialData);

    useEffect(() => {
        if (initialData?.images) {
            setPreviews(initialData.images);
        }
    }, [initialData]);

    const formik = useFormik({
        initialValues: {
            experience: initialData?.experience || "",
            location: initialData?.location || "",
            title: initialData?.title || "",
            description: initialData?.description || "",
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            if (isEdit) {
                await editVocations({ ...values, id });
            } else {
                await addVocations(values);
            }
            router.push("/about");
        },
    });

    if (isLoading) return <p>Loading...</p>;
    if (id && !initialData && isEdit) return <p>Загрузка данных для редактирования...</p>;

    return (
        <div className="flex flex-col items-center gap-5 justify-center p-10">
            <h1 className="w-[334px] text-[36px] font-[700]">
                {isEdit ? "Редактировать вакансию" : "Добавить вакансию"}
            </h1>

            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-10">
                <input
                    name="experience"
                    value={formik.values.experience}
                    onChange={formik.handleChange}
                    type="text"
                    placeholder="Опыт"
                    className="w-[600px] p-2 h-[56px] rounded-[20px] border-[3px] border-[#E5E7EB]"
                />

                <input
                    name="location"
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    type="text"
                    placeholder="Локация"
                    className="w-[600px] p-2 h-[56px] rounded-[20px] border-[3px] border-[#E5E7EB]"
                />

                <input
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    type="text"
                    placeholder="Название должности"
                    className="w-[600px] p-2 h-[56px] rounded-[20px] border-[3px] border-[#E5E7EB]"
                />

                <textarea
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    placeholder="Описание"
                    className="w-[600px] h-[200px] p-2 rounded-[20px] border-[3px] border-[#E5E7EB]"
                />

                <button type="submit" className="bg-yellow-400 text-white p-3 rounded-lg">
                    Сохранить
                </button>
            </form>
        </div>
    );
};

export default Page;