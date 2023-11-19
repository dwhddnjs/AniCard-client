"use client";

import { removeHtmlAndQuote } from "@/common/function";
import { useNews } from "@/hooks/useNews";
import { Link as LinkIcon } from "lucide-react";

import Link from "next/link";
import React from "react";
import { NewsItem } from "./components/news-item";
import { Skeleton } from "@/components/ui/skeleton";

export type ArticleTypes = {
  description: string;
  title: string;
  link: string;
  originallink: string;
  pubDate: string;
};

export default function NewsPage() {
  const { data, isLoading } = useNews();

  return (
    <div className="pt-[100px] px-[24px] space-y-4">
      <h2 className="text-2xl font-bold text-white pl-[6px]">소식</h2>
      <div className="space-y-4">
        {data?.map((article: ArticleTypes) =>
          isLoading ? (
            <Skeleton className="h-[80px] bg-[#272727]" key={article?.title} />
          ) : (
            <NewsItem key={article.title} article={article} />
          )
        )}
      </div>
      <div className="h-[200px]" />
    </div>
  );
}
