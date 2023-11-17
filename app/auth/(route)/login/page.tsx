"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { fetcher, postRequest } from "@/common/axios";
import { Button } from "@/components/ui/button";
import { API_KEYS } from "@/common/apiKeys";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { usePostMutation } from "@/hooks/usePostMutation";
import EsportsIcon from "@/public/images/esport_icon.svg";
import Image from "next/image";

function LoginPage() {
  const { trigger, isLoading, isError } = usePostMutation(API_KEYS.login);

  const { push } = useRouter();

  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: "최소 1글자 이상 작성해주세요" })
      .email("이메일 주소가 유효하지 않습니다"),
    password: z.string().min(7, { message: "최소 7자 이상 작성해주세요" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const requestBody = {
      email: values.email,
      password: values.password,
    };

    try {
      const response = await trigger(requestBody);
      localStorage.setItem(
        "access-token",
        response?.data?.tokens?.access_token
      );
      localStorage.setItem(
        "refresh-token",
        response?.data?.tokens?.refresh_token
      );
    } catch (error) {
      console.log("request", error);
    } finally {
      push("/store");
    }

    return;
  };

  return (
    <div className="bg-[#1a1a1a] flex justify-end">
      <div className="bg-[#1e1e1e] rounded-l-3xl flex w-[75%] justify-center items-center h-screen space-x-[10%] shadow-sm">
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
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-12 flex flex-col">
                <Button
                  className="w-full h-[48px] rounded-lg bg-[#74A99C] font-bold text-md"
                  type="submit"
                  disabled={isLoading}
                >
                  로그인
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  onClick={(e) => {
                    e.preventDefault();
                    push("/auth/signup");
                  }}
                  className="bg-transparent p-0 text-xs text-[#74A99C] hover:bg-transparent"
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
  );
}

export default LoginPage;
