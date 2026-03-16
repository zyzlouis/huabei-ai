"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import saintsData from "@/data/saints.json";

export default function Team() {
  const saints = saintsData.saints;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % saints.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [saints.length, isAutoPlay]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + saints.length) % saints.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % saints.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  return (
    <div className="min-h-screen py-16 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="text-5xl md:text-8xl mb-4 float">⚔️</div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gradient">
            {saintsData.title}
          </h1>
          <p className="text-lg md:text-xl text-purple-200">{saintsData.subtitle}</p>
        </div>

        {/* Carousel 轮播 */}
        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          {/* 主卡片 */}
          <div className="relative animate-fadeIn">
            <div className="glass-card rounded-2xl p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* 圣斗士形象 */}
                <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-purple-500/30">
                  <Image
                    src={`/saints/${saints[currentIndex].id}.webp`}
                    alt={`${saints[currentIndex].constellation} ${saints[currentIndex].name}`}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                
                {/* 圣斗士信息 */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl">{saints[currentIndex].symbol}</span>
                    <span className="text-2xl text-purple-300">{saints[currentIndex].emoji}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 text-gradient">
                    {saints[currentIndex].constellation}
                  </h3>
                  <p className="text-xl text-yellow-400 mb-4 font-bold">
                    {saints[currentIndex].name}
                  </p>
                  <div className="border-t border-white/10 pt-4 mb-4">
                    <p className="text-sm text-purple-300 font-semibold mb-2">
                      💼 {saints[currentIndex].role}
                    </p>
                    <p className="text-gray-300 mb-4">
                      {saints[currentIndex].description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {saints[currentIndex].skills.map((skill, idx) => (
                        <span 
                          key={idx}
                          className="text-xs px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 左右箭头 */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 rounded-full bg-purple-600/80 hover:bg-purple-500 flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 z-10"
          >
            ←
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 rounded-full bg-purple-600/80 hover:bg-purple-500 flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 z-10"
          >
            →
          </button>

          {/* 底部导航点 */}
          <div className="flex justify-center gap-2 mt-8 flex-wrap">
            {saints.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-yellow-400 w-8' 
                    : 'bg-gray-600 hover:bg-purple-500'
                }`}
              />
            ))}
          </div>

          {/* 进度条 */}
          <div className="mt-4 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 to-purple-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / saints.length) * 100}%` }}
            />
          </div>
        </div>

        {/* 团队合影 */}
        <div className="mt-12 md:mt-16 animate-fadeIn" style={{ animationDelay: '1.2s' }}>
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gradient mb-2">黄金圣斗士团队合影</h2>
              <p className="text-sm text-gray-400">Gold Saints Team Photo</p>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-purple-500/30">
              <Image
                src="/team-photo.webp"
                alt="黄金圣斗士团队合影"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                priority={false}
              />
            </div>
          </div>
        </div>

        {/* 返回首页 */}
        <div className="mt-12 md:mt-16 text-center">
          <Link href="/" className="btn-primary inline-block px-8 py-4 rounded-full font-bold text-lg">
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
