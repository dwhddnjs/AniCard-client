"use client"

import { ResponseData, useNews } from "@/hooks/useNews"
import React, { useRef } from "react"
import { NewsItem } from "./components/news-item"
import { Skeleton } from "@/components/ui/skeleton"
import { useObserver } from "@/hooks/useObserver"
import { ArticleTypes } from "@/types/Article-type"

export default function NewsPage() {
  const { data, fetchNextPage, isFetching, isFetchingNextPage } = useNews()
  const articleList =
    data?.flatMap((el: ResponseData) => el?.data?.data ?? []) ?? []
  const ref = useRef(null)
  const onIntersect = ([entry]: IntersectionObserverEntry[]) =>
    entry.isIntersecting && fetchNextPage()

  useObserver({
    target: ref,
    onIntersect,
  })

  return (
    <div className="pt-[100px] px-[24px] space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-white pl-[6px]">
          E-Sports 뉴스
        </h1>
        <span className="text-xs font-bold text-[#c4c4c4] pl-[6px]">
          E-Sport 선수와 구단 소식을 빠르게 참고 해보세요.
        </span>
      </div>
      <div className="space-y-4">
        {articleList?.map((article: ArticleTypes) =>
          isFetching || isFetchingNextPage ? (
            <Skeleton className="h-[80px] bg-[#272727]" key={article?.title} />
          ) : (
            <NewsItem key={article.title} article={article} />
          )
        )}
      </div>
      <div ref={ref} />
    </div>
  )
}
