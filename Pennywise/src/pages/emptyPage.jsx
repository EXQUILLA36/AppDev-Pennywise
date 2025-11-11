import React from 'react'
import BackgroundParticles from "@/components/backgroundParticles";


export default function EmptyPage() {
  return (
    <div className='w-full h-[85vh] flex items-center justify-center'>
        <h1 className='typo-subheader montserrat-bold'>You must sign-in first</h1>
      <BackgroundParticles />
    </div>
  )
}
