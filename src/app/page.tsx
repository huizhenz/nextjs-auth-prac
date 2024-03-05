"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

// zod로 User Schema 생성
const UserSchema = z.object({
  name: z
    .string()
    .min(2, { message: "이름은 2글자 이상이어야 합니다." })
    .max(100, { message: "이름은 100글자 이하이어야 합니다." }),
  email: z.string().email({ message: "올바른 이메일을 입력해주세요." }),
  phone: z
    .string()
    .regex(phoneRegex, { message: "연락처는 11자리여야 합니다." }),
  role: z.string().nonempty({ message: "역할을 선택해주세요." }),
});

// 스키마의 추론타입 추출
type UserType = z.infer<typeof UserSchema>;

const Page = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserType>({
    resolver: zodResolver(UserSchema),
  });

  // resolver는 유효성 검사 라이브러리를 도와주는 props

  // useForm<UserType>({
  //   resolver: zodResolver(UserSchema),
  //   defaultValues: {
  //     name: "",
  //     email: "",
  //     phone: "",
  //   },
  // });

  //  { required: "이름은 2글자 이상이어야 합니다.",}

  const onSubmit = (data: UserType) => console.log(data);

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>계정을 생성합니다</CardTitle>
        <CardDescription>필수 정보를 입력해볼게요.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                type="text"
                placeholder="홍길동"
                {...register("name")}
              />
              <span className="error">{errors.name?.message}</span>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                placeholder="hello@sparta-devcamp.com"
                {...register("email")}
              />
            </div>
            <span className="error">{errors.email?.message}</span>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="phone">연락처</Label>
              <Input
                id="phone"
                placeholder="01000000000"
                {...register("phone")}
              />
              <span className="error">{errors.phone?.message}</span>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="role">역할</Label>
              <Select>
                <SelectTrigger id="role" {...register("role")}>
                  <SelectValue placeholder="역할을 선택해주세요" />
                </SelectTrigger>
                {/* popper : 팝업 컨테이너를 제어하기 위한 위치 지정 방법 */}
                <SelectContent position="popper">
                  <SelectItem value="admin">관리자</SelectItem>
                  <SelectItem value="user">일반사용자</SelectItem>
                </SelectContent>
                <span className="error">{errors.role?.message}</span>
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
};

export default Page;
