import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import BackgroundClouds from '../components/backgroundClouds'

export default function Dashboard() {
  const [total_savings, setTotalSavings] = useState(19000);

  return (
    <div className='flex flex-row items-center full-card overflow-hidden relative p-3'>

        {/* Balance Card */}
        <motion.div
          className='flex flex-col p-6 w-[30%] h-full gap-4 rounded-lg bg-black/40 backdrop-blur-lg border-2 border-gray-500/40 shadow-sm shadow-red-600/20 z-10'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{ scale: 1.005 }}
        >
          {/* Header */}
          <h1 className='text-white text-lg montserrat-bold typo-head'>Running Balance</h1>

          {/* Total Balance */}
          <div className='flex flex-col gap-2 p-4 rounded-md bg-black/40 backdrop-blur-sm shadow-inner shadow-black/70'>
            <span className='text-gray-300 typo-sub poppins-light'>Total Balance</span>
            <h2 className='text-red-500 typo-head montserrat-bold'>
              Php {total_savings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h2>
            {/* Earnings & Spendings */}
            <div className='flex flex-col gap-3'>
              <div className='flex justify-between items-center p-3 rounded-md bg-gradient-to-r shadow-inner shadow-orange-900 from-red-500 to-red-400'>
                <span className='text-white poppins-light'>Earnings</span>
                <span className='text-white poppins-bold'>Php 8,000.00</span>
              </div>
              <div className='flex justify-between items-center p-3 rounded-md bg-gradient-to-r from-orange-600 to-amber-500 shadow-inner shadow-orange-900'>
                <span className='text-white poppins-light'>Spendings</span>
                <span className='text-white poppins-bold'>Php 2,000.00</span>
              </div>
            </div>
          </div>


          {/* Weekly Budget */}
          <div className='flex flex-col gap-2 p-4 rounded-2xl bg-black/20 backdrop-blur-sm shadow-inner shadow-orange-500/20 mt-4'>
            <div className='flex justify-between items-center'>
              <h3 className='text-white font-bold'>Php 1,200.00</h3>
              <button className='px-4 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-all duration-300'>Change</button>
            </div>
            <span className='text-gray-300 text-sm'>Php 200.00 saved last week</span>
          </div>
        </motion.div>

        
      <BackgroundClouds/>
    </div>
  )
}
