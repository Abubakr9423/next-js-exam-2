"use client";

import { Eye, EyeOff, Pencil, Trash } from "lucide-react";
import Navbar from "@/components/navbar";
import {
    useCheckboxtodoMutation,
    useDeleteTodoMutation,
    useGetTodosQuery,
} from "@/lib/features/api";
import Link from "next/link";
import toast from "react-hot-toast";

const Page = () => {
    const { data: todos = [], isLoading } = useGetTodosQuery();
    const [deleteTodo] = useDeleteTodoMutation();
    const [checkboxtodo] = useCheckboxtodoMutation();

    if (isLoading) return <p>Loading...</p>;

    const handleDelete = async (id: any) => {
        try {
            await deleteTodo(id);
            toast.success("Новость удалена!");
        } catch {
            toast.error("Ошибка при удалении");
        }
    };

    const handleToggle = async (todo: any) => {
        try {
            await checkboxtodo(todo);
            toast.success(
                todo.status === "true" ? "Новость скрыта" : "Новость показана"
            );
        } catch {
            toast.error("Ошибка при изменении статуса");
        }
    };

    return (
        <>
            <Navbar />
            <div className="p-10">
                <div className="flex justify-between p-5">
                    <h1 className="font-[700] text-[36px]">Новости</h1>
                    <Link href="/dialog">
                        <button className="w-[138px] h-[52px] rounded-[100px] bg-[#FFA900]">
                            + Добавить
                        </button>
                    </Link>
                </div>

                <div className="flex gap-[25px] flex-wrap">
                    {todos.map((e: any) => (
                        <article
                            key={e.id}
                            className="w-[394.666px] gap-2 h-[422px] rounded-[28px] border-[1px] border-[#E5E7EB] flex flex-col items-start justify-center p-2"
                        >
                            <img
                                src={
                                    Array.isArray(e.images) && e.images.length > 0
                                        ? e.images[0]
                                        : "/placeholder.png"
                                }
                                className="w-[378.666px] h-[250px] rounded-[20px] object-cover"
                                alt={e.title}
                            />

                            <h1 className="font-[700] text-[20px]">{e.title}</h1>

                            <p className="font-[400] text-[15px] w-[354.666px]">
                                {e.shortDesc}
                            </p>

                            <div className="flex items-center justify-between gap-[46px]">
                                <p className="text-[#FFA900]">Подробнее</p>

                                <div className="flex items-center gap-2">
                                    <button type="button" onClick={() => handleDelete(e.id)}>
                                        <Trash className="text-red-600" />
                                    </button>

                                    <Link href={`/dialog?id=${e.id}`}>
                                        <Pencil className="text-[#FFA900] cursor-pointer" />
                                    </Link>

                                    <button type="button" onClick={() => handleToggle(e)}>
                                        {e.status === "true" ? (
                                            <Eye className="text-[#FFA900]" />
                                        ) : (
                                            <EyeOff />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Page;