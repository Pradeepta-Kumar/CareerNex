"use client";

import React from 'react';
import {howItWorks } from '../../../data/howItWorks';

const HowItWorks = () => {
  return (
    <section className="w-full py-6 md:py-12 lg:py-26 bg-background">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12 tracking-tighter">
          How does CareerNex work?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl justify-around mx-auto">
          {howItWorks.map((hit, idx) => {
            return (
              <div  key={idx}>
                <div className="pt-6 text-center flex flex-col items-center justify-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className='bg-gray-900 p-4 rounded-full'>{hit.icon}</span> <h3 className="font-bold text-xl mb-2">{hit.title}</h3> 
                    <p className="text-md font-light">{hit.description}</p>
                  </div>
                </div> 
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks