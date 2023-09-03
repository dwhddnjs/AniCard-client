import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

function SignupPage() {
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "최소 2글자 이상 작성해주세요",
    }),
    email: z
      .string()
      .min(1, { message: "최소 1글자 이상 작성해주세요" })
      .email("이메일 주소가 유효하지 않습니다"),
    password: z.string().min(8),
    checkPassword: z.string().min(8),
  });
  return <div>SignupPage</div>;
}

export default SignupPage;
