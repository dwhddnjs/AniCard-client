"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { API_KEYS } from "@/common/apiKeys"
import { useRouter, redirect } from "next/navigation"
import { useRouter as dd } from "next/router"
import { usePostMutation } from "@/hooks/usePostMutation"
import EsportsIcon from "@/public/images/esport_icon.svg"
import Image from "next/image"
import { useIsLogin } from "@/hooks/useIsLoginStore"
import { useToast } from "@/components/ui/use-toast"
import { signIn, useSession } from "next-auth/react"
import Google from "@/public/images/google.svg"

function LoginPage() {
  const { trigger, isLoading, isError } = usePostMutation(API_KEYS.login)
  const { toast } = useToast()
  const { push, replace } = useRouter()
  const { setIsLogin } = useIsLogin()

  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: "최소 1글자 이상 작성해주세요" })
      .email("이메일 주소가 유효하지 않습니다"),
    password: z.string().min(7, { message: "최소 7자 이상 작성해주세요" }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const requestBody = {
      email: values.email,
      password: values.password,
    }

    try {
      const response = await trigger(requestBody)
      if (response) {
        localStorage.setItem(
          "access-token",
          response?.data?.tokens?.access_token
        )
        localStorage.setItem(
          "refresh-token",
          response?.data?.tokens?.refresh_token
        )
        push("/roster")
        setIsLogin(true)
      } else {
        toast({
          variant: "destructive",
          title: "아이디가 존재하지 않습니다.",
        })
      }
    } catch (error) {
      console.log("request", error)
    }
  }

  return (
    <div className="bg-[#1a1a1a] flex justify-end">
      <div className="bg-[#1e1e1e] rounded-l-3xl flex w-[80%] justify-center items-center h-screen space-x-[10%] shadow-sm">
        <div className="w-[30%] space-y-8">
          <div className="space-y-2">
            <h2 className="text-white font-bold text-[32px]">Login In</h2>
            <p className="text-[#c4c4c4] text-xs">
              이메일와 비밀번호를 입력해주세요.
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              onChange={() => console.log(form.getValues())}
            >
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#c4c4c4] font-semibold pl-1">
                        Email*
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#272727] border-[#1a1a1a] text-white h-[48px] placeholder:text-[#555555]"
                          placeholder="example@example.com"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#c4c4c4] font-semibold pl-1">
                        Password*
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#272727] border-[#1a1a1a] text-white h-[48px] placeholder:text-[#555555]"
                          placeholder="*******"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-10 flex flex-col">
                <Button
                  className="w-full h-[48px] rounded-lg bg-[#74A99C] font-bold text-md"
                  type="submit"
                  disabled={isLoading}
                >
                  로그인
                </Button>
                <div className=" flex justify-center items-center space-x-4 py-3">
                  <div className="w-full bg-[#c4c4c4] h-[1px] " />
                  <p className="text-[#c4c4c4] text-[12px]">OR</p>
                  <div className="w-full bg-[#c4c4c4] h-[1px] " />
                </div>
                <Button
                  className="w-full h-[46px] bg-[#eeeeee] text-sm font-bold flex flex-start space-x-3 rounded-none"
                  onClick={(e) => {
                    e.preventDefault()
                    signIn("google")
                  }}
                  type="submit"
                  disabled={isLoading}
                >
                  <Image src={Google} width={24} height={24} alt="" />
                  <p className="text-[#c4c4c4]">구글 로그인</p>
                </Button>

                <Button
                  type="submit"
                  disabled={isLoading}
                  onClick={(e) => {
                    e.preventDefault()
                    push("/auth/signup")
                  }}
                  className="bg-transparent p-0 text-xs text-[#74A99C] hover:bg-transparent mt-3"
                >
                  회원가입을 원하시나요 ?
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div>
          <Image src={EsportsIcon} width={320} height={320} alt="" />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
