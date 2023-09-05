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
import { postRequest } from "@/common/axios";
import { API_KEYS } from "@/common/apiKeys";

function SignupPage() {
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "최소 2글자 이상 작성해주세요",
    }),
    email: z
      .string()
      .min(1, { message: "최소 1글자 이상 작성해주세요" })
      .email("이메일 주소가 유효하지 않습니다"),
    password: z.string().min(7),
    checkPassword: z.string().min(7),
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
      const response = await postRequest(API_KEYS.signup, requestBody);
      localStorage.setItem("access-token", response?.tokens?.access_token);
      localStorage.setItem("refresh-token", response?.tokens?.refresh_token);
    } catch (error) {
      console.log("request", error);
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>Email</FormLabel>
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>Check Password</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">회원가입</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default SignupPage;
