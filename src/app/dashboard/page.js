'use client';
import React, { useState, useEffect } from "react";
import RootLayout from '../layout'
import chip from "../../../public/chip.png"
import masterCard from "../../../public/mastercard.png"


function Dashboard() {

  return (
    <RootLayout>
      <div>
        <div className="flex justify-between items-center">
          <h1>
            My cards
          </h1>
          <h3>
            +Add Card
          </h3>
        </div>
        <div className="mt-4">
          <div className="bg-blue-800 rounded-lg p-6 shadow-md" style={{ maxWidth: '350px', maxHeight: '225px' }}>
            <div className="flex justify-between items-center mb-4">
              <img src={masterCard} alt="Credit Logo" className="w-16 sm:w-16 md:w-20" />
              <img src="https://icons8.com/icon/30435/chip-card" alt="Chip" className="w-10 sm:w-12 md:w-16" />
            </div>
            <div className="font-semibold text-xl sm:text-2xl mb-4">**** **** **** 1234</div>
            <div className="flex flex-col sm:flex-row justify-between">
              <div className="mb-2 sm:mb-0">
                <div className="text-xs sm:text-sm text-gray-500">CARD HOLDER</div>
                <div className="font-semibold">John Doe</div>
              </div>
              <div>
                <div className="text-xs sm:text-sm text-gray-500">EXPIRES</div>
                <div className="font-semibold">12/24</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </RootLayout>

  )
}

export default Dashboard