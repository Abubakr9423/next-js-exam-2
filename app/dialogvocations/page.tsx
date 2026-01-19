"use client";

import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
    useAddVocationsMutation,
    useEditVocationsMutation,
    useGetVocationsQuery,
} from "@/lib/features/api";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

type FormValues = {
    experience: string;
    location: string;
    title: string;
    description: string;
};

const Page = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get("id");

    const { data: vocations = [], isLoading } = useGetVocationsQuery();
    const [addVocations] = useAddVocationsMutation();
    const [editVocations] = useEditVocationsMutation();

    const initialData = useMemo(
        () => vocations.find((v: any) => String(v.id) === String(id)),
        [vocations, id]
    );
    const isEdit = Boolean(initialData);

    const { register, handleSubmit, reset } = useForm<FormValues>({
        defaultValues: {
            experience: "",
            location: "",
            title: "",
            description: "",
        },
    });

    useEffect(() => {
        if (initialData) {
            reset({
                experience: initialData.experience || "",
                location: initialData.location || "",
                title: initialData.title || "",
                description: initialData.description || "",
            });
        }
    }, [initialData, reset]);

    const onSubmit = async (values: FormValues) => {
        try {
            if (isEdit) {
                await editVocations({ ...values, id });
                toast.success("Вакансия обновлена!");
            } else {
                await addVocations(values);
                toast.success("Вакансия добавлена!");
            }
            router.push("/vocation");
        } catch {
            toast.error("Ошибка при сохранении");
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (id && !initialData && isEdit)
        return <p>Загрузка данных для редактирования...</p>;

    return (
        <div className="flex flex-col items-center gap-5 justify-center p-10">
            <h1 className="w-[334px] text-[36px] font-[700]">
                {isEdit ? "Редактировать вакансию" : "Добавить вакансию"}
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
                <input
                    {...register("experience")}
                    type="text"
                    placeholder="Опыт"
                    className="w-[600px] p-2 h-[56px] rounded-[20px] border-[3px] border-[#E5E7EB]"
                />

                <input
                    {...register("location")}
                    type="text"
                    placeholder="Локация"
                    className="w-[600px] p-2 h-[56px] rounded-[20px] border-[3px] border-[#E5E7EB]"
                />

                <input
                    {...register("title")}
                    type="text"
                    placeholder="Название должности"
                    className="w-[600px] p-2 h-[56px] rounded-[20px] border-[3px] border-[#E5E7EB]"
                />

                <textarea
                    {...register("description")}
                    placeholder="Описание"
                    className="w-[600px] h-[200px] p-2 rounded-[20px] border-[3px] border-[#E5E7EB]"
                />

                <button
                    type="submit"
                    className="bg-yellow-400 text-white p-3 rounded-lg"
                >
                    Сохранить
                </button>
            </form>
        </div>
    );
};

export default Page;