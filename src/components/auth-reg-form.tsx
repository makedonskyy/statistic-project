"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

type AuthAndRegistrationProps = {
    onLoginSuccess: () => void;
  };

const authSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(8, "Пароль должен быть не менее 8 символов"),
});


const registrationSchema = z
  .object({
    email: z.string().email("Некорректный email"),
    password: z.string().min(8, "Пароль должен быть не менее 8 символов"),
    confirmPassword: z.string().min(8, "Подтвердите пароль"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Пароли должны совпадать",
        path: ["confirmPassword"],
      });
    }
  });

export default function AuthAndRegistration({
    onLoginSuccess,
  }: AuthAndRegistrationProps) {
  const [isLogin, setIsLogin] = useState(true);

  const form = useForm({
    resolver: zodResolver(isLogin ? authSchema : registrationSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: any) => {
    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast.success(
          isLogin
            ? "Авторизация успешна. Добро пожаловать!"
            : "Регистрация успешна. Теперь войдите в систему."
        );

        if (!isLogin) {
          setIsLogin(true);
        }
      } else {
        const data = await response.json();
        toast.error("Ошибка", {
          description: data.message || "Попробуйте ещё раз.",
        });
      }
    } catch (error) {
      toast.error("Ошибка сервера", {
        description: "Попробуйте позже.",
      });
      console.error(error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "rgba(223, 245, 255, 1)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Card className="mx-auto w-full max-w-md bg-white py-10 px-8 shadow-lg rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold mb-2">
            {isLogin ? "Авторизуйтесь" : "Регистрация"}
          </CardTitle>
          <CardDescription className="text-gray-500 text-sm">
            {isLogin
              ? "Или зарегистрируйте аккаунт"
              : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel></FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Введите ваш email"
                        {...field}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg"
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
                    <FormLabel></FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Введите пароль"
                        {...field}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!isLogin && (
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Подтвердите пароль</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Подтвердите пароль"
                          {...field}
                          className="block w-full px-4 py-3 border border-gray-300 rounded-lg"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <p
                className="text-center text-sm text-blue-500 cursor-pointer"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin
                  ? "Создать аккаунт или войти как гость"
                  : "Вернуться к авторизации"}
              </p>

              <Button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                ) : isLogin ? (
                  "Войти"
                ) : (
                  "Зарегистрироваться"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
