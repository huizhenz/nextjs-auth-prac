"use client";
import { useState } from "react";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// 010으로 시작, 0~9까지 숫자 8자리 => 총 11자리
const phoneRegex = new RegExp(/^01([0])-?([0-9]{8})$/);

const UserSchema = z.object({
  name: z
    .string()
    .min(2, "이름은 2글자 이상이어야 합니다.")
    .max(100, "이름은 100글자 이하이어야 합니다."),
  email: z.string().email("올바른 이메일을 입력해주세요."),
  phoneNum: z.string().regex(phoneRegex, "연락처는 11자리여야 합니다."),
  role: z.string(),
});

// type UserType = z.infer<typeof User>;

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [role, setRole] = useState("");
  const [err, setErr] = useState({});

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      phoneNum,
      role,
    };

    try {
      // 유효성 검사
      const validatedData = UserSchema.parse(userData);
      console.log("Valid data:", validatedData);
    } catch (error) {
      setErr({
        nameErr: error,
      });

      console.log("Validation error:", error);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>계정을 생성합니다</CardTitle>
        <CardDescription>필수 정보를 입력해볼게요.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                placeholder="홍길동"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {/* {"이름은 2글자 이상이어야 합니다."} */}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                placeholder="hello@sparta-devcamp.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="phoneNum">연락처</Label>
              <Input
                id="phoneNum"
                placeholder="01000000000"
                value={phoneNum}
                onChange={(e) => setPhoneNum(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="role">역할</Label>
              <Select>
                <SelectTrigger id="role">
                  <SelectValue placeholder="역할을 선택해주세요" />
                </SelectTrigger>
                {/* popper이 뭐지 */}
                <SelectContent position="popper">
                  <SelectItem value="admin">관리자</SelectItem>
                  <SelectItem value="user">일반사용자</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="submit">다음 단계로 </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
