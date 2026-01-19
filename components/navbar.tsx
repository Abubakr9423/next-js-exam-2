"use client";

import Image from 'next/image'
import { TextAnimate } from './ui/text-animate'
import Link from 'next/link'
import { UserCircle2 } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"; 

const Navbar = () => {

    const logout = () => {
        window.location.pathname = '/'
        localStorage.clear();
    };

    return (
        <div>
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    <div className="flex items-center gap-3">
                        <Image
                            src="/image 6 (1).png"
                            alt="logo"
                            width={34}
                            height={30}
                            priority
                        />
                        <h1 className="text-lg font-semibold tracking-wide">
                            <TextAnimate animation="blurInUp" by="character" once>
                                КАПИТАЛ-Т
                            </TextAnimate>
                        </h1>
                    </div>

                    <div className="flex items-center gap-8 text-sm font-medium">
                        <Link
                            href="/about"
                            className="relative hover:text-[#FFA900] transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#FFA900] after:transition-all hover:after:w-full"
                        >
                            <TextAnimate animation="blurInUp" by="character" once>
                                Новости
                            </TextAnimate>
                        </Link>

                        <Link
                            href="/vocation"
                            className="relative hover:text-[#FFA900] transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#FFA900] after:transition-all hover:after:w-full"
                        >
                            <TextAnimate animation="blurInUp" by="character" once>
                                Вакансии
                            </TextAnimate>
                        </Link>

                        <Link
                            href="/reports"
                            className="relative hover:text-[#FFA900] transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#FFA900] after:transition-all hover:after:w-full"
                        >
                            <TextAnimate animation="blurInUp" by="character" once>
                                Заявки
                            </TextAnimate>
                        </Link>
                    </div>

                    <Select
                        onValueChange={(value) => {
                            if (value === "logout") logout();
                        }}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue
                                placeholder={
                                    <UserCircle2
                                        size={34}
                                        className="text-gray-600 group-hover:text-[#FFA900] transition-colors"
                                    />
                                }
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="logout">Вийти</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </nav>
        </div>
    )
}

export default Navbar