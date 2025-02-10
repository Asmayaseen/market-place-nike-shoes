import Image from 'next/image'
import React from 'react'

export default function Essentials() {
  return (
    <>
      <div className='mt-28 mb-0'>
        <span className='text-xl font-semibold px-10 lg:px-16'>The Essentials</span>
      </div>

      <div className='flex justify-evenly items-center mb-16 md:mb-28 flex-wrap'>
        {['Essen1.png', 'Essen2.png', 'Essen3.png'].map((img, index) => (
          <div key={index} className='w-96 h-[400px] relative overflow-hidden'>
            <Image
              className='hover:scale-105 duration-300 object-cover'
              src={`/assets/${img}`}
              alt=''
              fill
            />
          </div>
        ))}
      </div>

      <div className='flex justify-evenly flex-wrap px-24 md:px-36 pb-20 items-center '>
        {[
          { title: 'Icons', items: ['Air Force 1', 'Huarache', 'Air Max 90', 'Air Max 95'] },
          { title: 'Shoes', items: ['All Shoes', 'Custom Shoes', 'Jordan Shoes', 'Running Shoes'] },
          { title: 'Clothing', items: ['All Clothing', 'Modest Clothing', 'Hoodies & Pullovers', 'Shirts & Tops'] },
          { title: `Kids'`, items: ['Infant & Toddler Shoes', `Kids' Shoes`, `Kids' Jordan Shoes`, `Kids' Basketball Shoes`] }
        ].map((section, index) => (
          <div key={index} className='w-full md:w-auto'>
            <span className='font-semibold pl-3'>{section.title}</span> <br /> <br />
            <ul className='ess-ul'>
              {section.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
