"use client";

import Navbar from "@/components/navbar";
import { useGetreportsQuery } from "@/lib/features/api";
import { Download } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const Page = () => {
  const { data = [], isLoading } = useGetreportsQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<null | string>(null); 
  const rowsPerPage = 5;

  if (isLoading) return <p className="p-5">Загрузка...</p>;

  const filteredData =
    filterStatus === null ? data : data.filter((row: any) => row.status === filterStatus);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div>
      <Navbar />
      <div className="flex gap-10 flex-col p-10">
        <div className="flex justify-between p-5">
          <h1 className="font-[700] text-[36px]">Заявки</h1>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setFilterStatus("true");
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full border ${
                filterStatus === "true" ? "bg-[#FFA900] text-white" : ""
              }`}
            >
              На партнёрство
            </button>
            <button
              onClick={() => {
                setFilterStatus("false");
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full border ${
                filterStatus === "false" ? "bg-[#FFA900] text-white" : ""
              }`}
            >
              На вакансии
            </button>
            <button
              onClick={() => {
                setFilterStatus(null);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full border ${
                filterStatus === null ? "bg-[#FFA900] text-white" : ""
              }`}
            >
              Все
            </button>
          </div>
        </div>

        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">ФИО</th>
              <th className="border border-gray-300 px-4 py-2">Телефон</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Название компании</th>
              <th className="border border-gray-300 px-4 py-2">Дата</th>
              <th className="border border-gray-300 px-4 py-2">Предложение</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row: any) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{row.fio}</td>
                <td className="border border-gray-300 px-4 py-2">{row.phone}</td>
                <td className="border border-gray-300 px-4 py-2">{row.email}</td>
                <td className="border border-gray-300 px-4 py-2">{row.company}</td>
                <td className="border border-gray-300 px-4 py-2">{row.date}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <Download className="text-[#FFA900] cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ← Назад
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? "bg-[#FFA900] text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Вперёд →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;