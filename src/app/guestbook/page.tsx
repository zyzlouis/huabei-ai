"use client";

import { useState } from "react";
import Link from "next/link";

interface Message {
  id: number;
  name: string;
  content: string;
  time: string;
}

export default function Guestbook() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      name: "雅典娜",
      content: "欢迎来到圣域！请留下您的留言，我会让黄金圣斗士们为您服务 🏛️",
      time: "2026-03-10",
    },
  ]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    setIsSubmitting(true);

    // 模拟提交延迟
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newMessage: Message = {
      id: messages.length + 1,
      name: name.trim(),
      content: content.trim(),
      time: new Date().toISOString().split("T")[0],
    };

    setMessages([newMessage, ...messages]);
    setName("");
    setContent("");
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen py-16 md:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="text-5xl md:text-8xl mb-4 float">📝</div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gradient">
            圣域留言板
          </h1>
          <p className="text-lg md:text-xl text-purple-200">留下您的想法，雅典娜会亲自阅读</p>
        </div>

        {/* 留言表单 */}
        <section className="glass-card p-6 md:p-8 rounded-2xl mb-10 animate-fadeIn-delay-1">
          <h2 className="text-xl md:text-2xl font-bold mb-6">✍️ 写下您的留言</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm text-gray-400 mb-2">
                您的名字
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="请输入您的名字"
                className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                required
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm text-gray-400 mb-2">
                留言内容
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="请写下您想对雅典娜和圣斗士们说的话..."
                rows={4}
                className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 btn-primary rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "发送中..." : "🚀 发送到圣域"}
            </button>
          </form>
        </section>

        {/* 留言列表 */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold mb-6 animate-fadeIn-delay-2">
            💬 圣域留言 ({messages.length})
          </h2>
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={msg.id}
                className={`glass-card p-4 md:p-6 rounded-xl animate-fadeIn-delay-${(index % 4) + 1}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <span className="text-lg">{msg.name === "雅典娜" ? "👸" : "👤"}</span>
                    </div>
                    <div>
                      <h3 className="font-bold">{msg.name}</h3>
                      <p className="text-xs text-gray-500">{msg.time}</p>
                    </div>
                  </div>
                  {msg.name === "雅典娜" && (
                    <span className="self-start sm:self-auto px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                      雅典娜
                    </span>
                  )}
                </div>
                <p className="text-gray-300 text-sm md:text-base">{msg.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 返回首页 */}
        <div className="mt-12 text-center">
          <Link href="/" className="btn-primary inline-block px-8 py-4 rounded-full font-bold text-lg">
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
