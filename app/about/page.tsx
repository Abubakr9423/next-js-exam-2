import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { UserCircle2 } from 'lucide-react'
const page = () => {
    return (
        <div>
            <nav className='flex items-center justify-evenly'>
                <div className='flex items-center gap-2'>
                    <Image src='/image 6 (1).png' alt='logo' width={33.21428680419922} height={30} />
                    <h1>КАПИТАЛ-Т</h1>
                </div>
                <div className='flex items-center gap-2'>
                    <Link className='hover:text-[#FFA900]' href='/about'>Новости</Link>
                    <Link className='hover:text-[#FFA900]' href='/vocation'>Вакансии</Link>
                    <Link className='hover:text-[#FFA900]' href='/reports'>Заявки</Link>
                </div>
                <UserCircle2/>
            </nav>
        </div>
    )
}

export default page