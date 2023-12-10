"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { API_KEYS } from "@/common/apiKeys";
import { usePostMutation } from "@/hooks/usePostMutation";
import { useRouter } from "next/navigation";
import EsportsIcon from "@/public/images/esport_icon.svg";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";

function SignupPage() {
  const { trigger, isLoading } = usePostMutation(API_KEYS.signup);
  const { toast } = useToast();
  const { push } = useRouter();

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "최소 2글자 이상 작성해주세요",
    }),
    email: z
      .string()
      .min(1, { message: "최소 1글자 이상 작성해주세요" })
      .email("이메일 주소가 유효하지 않습니다"),
    password: z.string().min(7, { message: "최소 7글자 이상 작성해주세요" }),
    checkPassword: z
      .string()
      .min(7, { message: "최소 7글자 이상 작성해주세요" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      checkPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const requestBody = {
      name: values.name,
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
      toast({
        title: "회원가입이 되었습니다",
      });
      push("/auth/login");
    } catch (error) {
      console.log("request", error);
      return;
    }
  };

  return (
    <div className="bg-[#1a1a1a] flex justify-end">
      <div className="bg-[#1e1e1e] rounded-l-3xl flex w-[80%] justify-center items-center h-screen space-x-[10%] shadow-sm">
        <div className="w-[30%] space-y-8">
          <div className="space-y-2">
            <h2 className="text-white font-bold text-[32px]">Sign Up</h2>
            <p className="text-[#c4c4c4] text-xs">
              회원가입 양식에 맞게 입력해주세요.
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#c4c4c4] font-semibold pl-1">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#272727] border-[#1a1a1a] text-white h-[48px] placeholder:text-[#555555]"
                          placeholder="홍길동"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#c4c4c4] font-semibold pl-1">
                        Email
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
                        Password
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
                <FormField
                  control={form.control}
                  name="checkPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#c4c4c4] font-semibold pl-1">
                        Re Password
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
              <div className="mt-12 flex flex-col">
                <Button
                  className="w-full h-[48px] rounded-lg bg-[#74A99C] font-bold text-md"
                  type="submit"
                  disabled={isLoading}
                >
                  회원가입
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  onClick={(e) => {
                    e.preventDefault();
                    push("/auth/login");
                  }}
                  className="bg-transparent p-0 text-xs text-[#74A99C] hover:bg-transparent"
                >
                  로그인으로 돌아가기
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

export default SignupPage;
