"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className={`h-[70vh] bg-cover bg-center bg-no-repeat relative transition-all duration-500 ${
        isHovered ? 'scale-105' : ''
      }`}
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/3805342/pexels-photo-3805342.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load')`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-black/70 opacity-80"></div>
      <div className="flex items-center justify-center h-full max-w-7xl mx-auto px-4 text-center text-white relative z-10">
        <div>
          <h1 className="text-2xl md:text-4xl uppercase tracking-[0.05rem] font-bold mb-6">
          satta matka 143satta guessing          </h1>
          <p className=" text-xs md:text-sm px-3 tracking-[0.05rem] text-center mb-8 text-indigo-100">
          143sattamatka is a leading Satta Matka result & best guessing website, and it is most visited  Satta website where you  get latest Info about Matka Satta.


          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="secondary" size="lg">
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-violet-600 border-white hover:bg-white/10"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;