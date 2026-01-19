"use client";

import Navbar from '@/components/navbar';
import { useCheckboxvocationsMutation, useDeleteVocationsMutation, useGetVocationsQuery } from '@/lib/features/api';
import { Eye, EyeOff, Locate, Pencil, Trash } from 'lucide-react';
import Link from 'next/link';

const Page = () => {
    const { data, isLoading } = useGetVocationsQuery();
    const [deleteVocations] = useDeleteVocationsMutation();
    const [checkboxvocations] = useCheckboxvocationsMutation()

    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
            <Navbar />
            <div className="p-10">
                <div className="flex justify-between p-5">
                    <h1 className="font-[700] text-[36px]">Вакансии</h1>
                    <Link href="/dialogvocations">
                        <button className="w-[138px] h-[52px] rounded-[100px] bg-[#FFA900]">
                            + Добавить
                        </button>
                    </Link>
                </div>

                <div className="flex flex-wrap gap-20">
                    {data?.map((e) => (
                        <article
                            key={e.id}
                            className="w-[397.333px] h-[256px] border-[3px] border-[#E5E7EB] rounded-[28px] p-5 flex flex-col gap-2"
                        >
                            <div className="flex justify-between items-center">
                                <div className="w-[122px] h-[28px] text-center rounded-[8px] bg-[#1F2937] text-white px-2">
                                    <h1>{e.experience}</h1>
                                </div>
                                <p className="flex items-center gap-2">
                                    <Locate /> {e.location}
                                </p>
                            </div>

                            <h2 className="text-[24px] font-[700]">{e.title}</h2>
                            <p>{e.description}</p>

                            <div className="flex items-center justify-between gap-[46px]">
                                <p className="text-[#FFA900]">{e.details ?? "Подробнее"}</p>

                                <div className="flex items-center gap-2">
                                    <button type="button" onClick={() => deleteVocations(e.id)}>
                                        <Trash className="text-red-600" />
                                    </button>

                                    <Link href={`/dialogvocations?id=${e.id}`}>
                                        <Pencil className="text-[#FFA900] cursor-pointer" />
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={() => checkboxvocations(e)}
                                    >
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
        </div>
    );
};

export default Page;