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

function LoginPage() {
  const { trigger, isLoading, isError } = usePostMutation(API_KEYS.login);

  const { push } = useRouter();

  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: "최소 1글자 이상 작성해주세요" })
      .email("이메일 주소가 유효하지 않습니다"),
    password: z.string().min(7),
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
    <div className="flex justify-center items-center border-black border-2 h-screen">
      <div className="border-2 border-black w-[400px] h-[500px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onChange={() => console.log(form.getValues())}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              로그인
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              onClick={() => push("/auth/signup")}
            >
              회원가입
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
