"use client";

import Link from "next/link";
import { useState } from "react";

interface Chapter {
  number: number;
  title: string;
  slug: string;
  description: string;
  icon: string;
}

interface Props {
  chapters: Chapter[];
}

export default function NovelChapterList({ chapters }: Props) {
  const [isAscending, setIsAscending] = useState(true);

  const sorted = isAscending ? chapters : [...chapters].reverse();

  return (
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gradient">
        📖 章节目录
      </h2>

      {/* 排序切换按钮 */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setIsAscending(true)}
          className={`px-6 py-3 rounded-full font-medium transition-all ${
            isAscending
              ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
              : "bg-gray-700/50 text-gray-400 hover:bg-gray-700"
          }`}
        >
          正序查看
        </button>
        <button
          onClick={() => setIsAscending(false)}
          className={`px-6 py-3 rounded-full font-medium transition-all ${
            !isAscending
              ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
              : "bg-gray-700/50 text-gray-400 hover:bg-gray-700"
          }`}
        >
          倒序查看
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {sorted.map((chapter, index) => (
          <Link
            key={chapter.slug}
            href={`/stories/${chapter.slug}`}
            className="glass-card rounded-2xl p-6 md:p-8 card-hover block animate-fadeIn"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* 章节图标和编号 */}
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl float">{chapter.icon}</div>
              <div className="text-sm text-purple-400 font-mono">
                第 {chapter.number} 章
              </div>
            </div>

            {/* 章节标题 */}
            <h3 className="text-xl md:text-2xl font-bold mb-3 text-gradient">
              {chapter.title}
            </h3>

            {/* 章节描述 */}
            <p className="text-gray-300 text-sm md:text-base mb-4">
              {chapter.description}
            </p>

            {/* 阅读按钮 */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">点击阅读</span>
              <span className="text-purple-400">→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
