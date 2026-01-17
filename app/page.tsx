"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button'
import { MorphingText } from '@/components/ui/morphing-text'
import { useLazyLoginQuery } from '@/lib/features/api';

const Page = () => {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading }] = useLazyLoginQuery();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ phone, password });
      if (res.data?.length > 0) {
        localStorage.setItem("user", JSON.stringify(res.data[0]));
        router.push("/about");
      } else {
        alert("Неверный телефон или пароль");
      }
    } catch (err) {
      console.error(err);
      alert("Произошла ошибка при входе");
    }
  };

  return (
    <div>
      <div className='flex items-center flex-col gap-30 justify-center p-25'>
        <MorphingText texts={["Привет добро пожаловат в", "КАПИТАЛ-Т"]} />
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <input
            className='w-[420px] h-[56px] rounded-[20px] border-[3px] border-[#E5E7EB] p-5'
            type="text"
            placeholder='Телефон'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            className='w-[420px] h-[56px] rounded-[20px] border-[3px] border-[#E5E7EB] p-5'
            type="password"
            placeholder='Пароль'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type='submit'
            className='w-[420px] h-[56px] rounded-[20px] bg-[#FFA900] hover:bg-[#e79c06]'
            variant="secondary"
            disabled={isLoading}
          >
            {isLoading ? "Загрузка..." : "Войти"}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Page;
