"use client"

import { removeHtmlAndQuote } from "@/common/function"
import { ArticleTypes } from "@/types/Article-type"
import { Link as LinkIcon } from "lucide-react"
import Link from "next/link"
import React, { FC } from "react"

interface NewsItemProps {
  article: ArticleTypes
}

export const NewsItem: FC<NewsItemProps> = ({ article }) => {
  return (
    <div
      className="bg-[#272727] space-y-1 min-h-[80px] flex flex-col justify-between px-[24px] pt-[16px] py-[12px] rounded-md shadow-md"
      key={article?.title}
    >
      <h3 className="text-white font-semibold text-lg">
        {removeHtmlAndQuote(article?.title)}
      </h3>
      <p className="text-[#c4c4c4] text-sm ">
        {removeHtmlAndQuote(article?.description)}
      </p>
      <div className="flex items-center justify-between pt-[12px]">
        <p className="text-[#555555] text-xs">{article?.pubDate}</p>
        <div className="flex space-x-1 items-center ">
          <LinkIcon color="#74A99C" width={12} height={12} />
          <Link
            className="text-[#74A99C] text-xs "
            href={article?.link}
            target="_blank"
          >
            더 보기
          </Link>
        </div>
      </div>
    </div>
  )
}
