"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { UploadCloud, X } from "lucide-react";
import {
    useAddTodoMutation,
    useEditTodoMutation,
    useGetTodosQuery,
} from "@/lib/features/api";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

type FormValues = {
    title: string;
    shortDesc: string;
    publishDate: string;
    status: string;
    description: string;
    images: string[];
};

const Page = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get("id");

    const { data: todos = [], isLoading } = useGetTodosQuery();
    const [addTodo] = useAddTodoMutation();
    const [editTodo] = useEditTodoMutation();

    const [previews, setPreviews] = useState<string[]>([]);
    const [error, setError] = useState("");

    const initialData = todos.find((todo: any) => String(todo.id) === String(id));
    const isEdit = Boolean(initialData);

    const { register, handleSubmit, setValue, reset, watch } = useForm<FormValues>({
        defaultValues: {
            title: initialData?.title || "",
            shortDesc: initialData?.shortDesc || "",
            publishDate: initialData?.publishDate || "",
            status: initialData?.status ?? "true",
            description: initialData?.description || "",
            images: initialData?.images || [],
        },
    });

    useEffect(() => {
        if (initialData) {
            reset({
                title: initialData.title,
                shortDesc: initialData.shortDesc,
                publishDate: initialData.publishDate,
                status: initialData.status,
                description: initialData.description,
                images: initialData.images || [],
            });
            if (initialData.images) {
                setPreviews(initialData.images);
            }
        }
    }, [initialData, reset]);

    const onSubmit = async (values: FormValues) => {
        const payload = {
            ...values,
            id: isEdit ? id : undefined,
        };

        try {
            if (isEdit) {
                await editTodo(payload);
                toast.success("Новость обновлена!");
            } else {
                await addTodo(payload);
                toast.success("Новость добавлена!");
            }
            router.push("/about");
        } catch {
            toast.error("Ошибка при сохранении");
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setError("");

        const readers = files.map(
            (file) =>
                new Promise<string>((resolve, reject) => {
                    if (file.size > 5 * 1024 * 1024) {
                        setError("Каждый файл должен быть не более 5 МБ");
                        reject("File too large");
                    }
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                })
        );

        Promise.all(readers)
            .then((base64Files) => {
                setPreviews((prev) => [...prev, ...base64Files]);
                setValue("images", [...watch("images"), ...base64Files]);
            })
            .catch(() => { });
    };

    const removeImage = (index: number) => {
        setPreviews((prev) => prev.filter((_, i) => i !== index));
        setValue(
            "images",
            watch("images").filter((_, i) => i !== index)
        );
    };

    if (isLoading) return <p>Loading...</p>;
    if (id && !initialData && isEdit)
        return <p>Загрузка данных для редактирования...</p>;

    return (
        <div className="flex flex-col items-center gap-5 justify-center p-10">
            <h1 className="w-[334px] text-[36px] font-[700]">
                {isEdit ? "Редактировать новость" : "Добавить новость"}
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
                <input
                    {...register("title")}
                    type="text"
                    placeholder="Название"
                    className="w-[600px] p-2 h-[56px] rounded-[20px] border-[3px] border-[#E5E7EB]"
                />

                <input
                    {...register("shortDesc")}
                    type="text"
                    placeholder="Краткое описание"
                    className="w-[600px] p-2 h-[104px] rounded-[20px] border-[3px] border-[#E5E7EB]"
                />

                <input
                    {...register("publishDate")}
                    type="text"
                    placeholder="Дата публикации"
                    className="w-[600px] p-2 h-[56px] rounded-[20px] border-[3px] border-[#E5E7EB]"
                />

                <div className="flex justify-between items-center">
                    <h2 className="font-[600] text-[20px]">Статус</h2>
                    <Select
                        value={watch("status")}
                        onValueChange={(value) => setValue("status", value)}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Выбрать" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Статус</SelectLabel>
                                <SelectItem value="true">Показать</SelectItem>
                                <SelectItem value="false">Скрыть</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <input
                    {...register("description")}
                    type="text"
                    placeholder="Описание"
                    className="w-[600px] h-[278px] p-2 rounded-[20px] border-[3px] border-[#E5E7EB]"
                />

                <div className="w-[600px]">
                    <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-yellow-400 rounded-xl cursor-pointer bg-yellow-50 hover:bg-yellow-100 transition">
                        <UploadCloud className="w-12 h-12 text-yellow-500 mb-3" />
                        <p className="text-gray-700 font-medium">Загрузить фото</p>
                        <p className="text-gray-400 text-sm">
                            Можно выбрать несколько • до 5 МБ
                        </p>

                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>

                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                    {previews.length > 0 && (
                        <div className="grid grid-cols-4 gap-4 mt-6">
                            {previews.map((src, index) => (
                                <div
                                    key={index}
                                    className="relative rounded-lg overflow-hidden shadow-md group"
                                >
                                    <img
                                        src={src}
                                        alt="preview"
                                        className="h-32 w-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <button type="submit">submit</button>
            </form>
        </div>
    );
};

export default Page;