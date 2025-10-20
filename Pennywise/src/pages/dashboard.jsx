import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import BackgroundClouds from '../components/backgroundClouds'

export default function Dashboard() {
  const [total_savings, setTotalSavings] = useState(19000);

  return (
    <div className='flex flex-row items-center full-card overflow-hidden relative p-3'>

        {/* Balance Card */}
        <motion.div className='flex flex-col p-5 w-[30%] gap-2 h-full rounded-lg bg-[#970C23] shadow-black shadow-md z-1'
            initial={{ opacity: 0.7, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
        >
        <h1 className='font-bold montserrat-medium typo-header'>Running Balance</h1>
        <div className='flex flex-col gap-3 w-full h-fit bg-gray-200 rounded-2xl p-5 shadow-black/60 shadow-md mb-5'>
          <h2 className='text-gray-700 typo-par poppins-light -mb-5'>Total Balance</h2>
          <h1 className='text-gray-900 typo-head montserrat-bold'>Php {total_savings.toLocaleString(undefined, { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
          })}</h1>

          {/* Balance Statistics */}
          <motion.div className='w-full h-fit flex flex-row justify-between items-center'
            initial={{ x: -2 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}>
            <div className='w-[60%] h-fit p-2 bg-gradient-to-r from-[#FF4D00] to-[#ff820c] rounded-lg shadow-black/30 shadow-inner'>Earnings</div>
            <h2 className='text-gray-900 typo-par montserrat-medium'>Php 8,000.00</h2>
          </motion.div>
          
          <motion.div className='w-full h-fit flex flex-row justify-between items-center'
            initial={{ x: -2 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}>
            <div className='w-[60%] h-fit p-2 bg-gradient-to-r from-[#970C23] to-[#e2072b] rounded-lg shadow-black/30 shadow-inner'>Spendings</div>
            <h2 className='text-gray-900 typo-par montserrat-medium'>Php 2,000.00</h2>
          </motion.div>

          {/* Weekly Budget Section */}

        </div>
        <h2 className='typo-par'>Weekly Budget</h2>
          <div className='full-card !h-fit py-4 px-6 flex flex-col bg-gray-200'>
            <div className='w-full h-fit flex flex-row justify-between text-gray-900'>
              <h1 className='typo-sub montserrat-bold'>Php 1,200.00</h1>
              <button className='typo-sub montserrat-medium px-[2vw] rounded-lg bg-[#F25912]'>Change</button>
            </div>
            <h2 className='text-gray-900'><strong>Php 200.00</strong> saved last week</h2>
          
          </div>
        </motion.div>
        
      <BackgroundClouds/>
    </div>
  )
}
