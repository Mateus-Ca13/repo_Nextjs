import Image from 'next/image'
import React from 'react'
import Link from '../Link'

export default function Aside() {
  return (
    <aside className='absolute left-0 top-0 bg-gray-800/50 min-h-screen text-white'>
        <div className='flex flex-col items-center justify-between gap-4 py-12 px-8'>
            <Image
            src="/logo.png"
            width={120}
            height={30}
            className='mb-10'
            alt="Banner da Code Connect"
            />
            <Link className='hover:text-green-300 duration-200' href='/'>Dashboard</Link>
            <Link className='hover:text-green-300 duration-200' href='/account'>Perfil</Link>
            <Link className='hover:text-green-300 duration-200' href='/settings'>Configurações</Link>
        </div>
    </aside>
  )
}
