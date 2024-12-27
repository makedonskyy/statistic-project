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
import { gql, useMutation } from "@apollo/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const LOGIN_MUTATION = gql`
  mutation LoginUser($login_input: LoginInput!) {
    loginUser(input: $login_input) {
      access_token
      status
    }
  }
`;

const SIGNUP_MUTATION = gql`
  mutation SignupUser($signup_input: SignUpInput!) {
    signupUser(input: $signup_input) {
      status
      user {
        _id
        email
        name
      }
    }
  }
`;

const authSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(8, "Пароль должен быть не менее 8 символов"),
});


const registrationSchema = z
  .object({
    email: z.string().email("Некорректный email"),
    name: z.string().nonempty(),
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

// Define component props
type AuthAndRegistrationProps = {
  onLoginSuccess: () => void;
};

export const AuthAndRegistration: React.FC<AuthAndRegistrationProps> = ({
  onLoginSuccess,
}) => {
  const [isLogin, setIsLogin] = useState(true);

  const form = useForm({
    resolver: zodResolver(isLogin ? authSchema : registrationSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
  });

  const [loginUser, { loading: loginLoading }] = useMutation(LOGIN_MUTATION);
  const [signupUser, { loading: signupLoading }] = useMutation(SIGNUP_MUTATION);

  const onSubmit = async (values: any) => {

    try {
      if (isLogin) {
        const { data } = await loginUser({
          variables: {
            login_input: {
              email: values.email,
              password: values.password,
            },
          },
        });
        localStorage.setItem("access_token", data.loginUser.access_token);
        toast.success("Авторизация успешна. Добро пожаловать!");
        onLoginSuccess();
      } else {
        const { data } = await signupUser({
          variables: {
            signup_input: {
              email: values.email,
              name: values.name,
              password: values.password,
              passwordConfirm: values.confirmPassword,
            },
          },
        });
        toast.success("Регистрация успешна. Теперь войдите в систему!");
        setIsLogin(true);
      }
    } catch (error: any) {
      toast.error("Ошибка: " + error.message);
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
            
            {!isLogin && (
              <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel></FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Введите ваше имя"
                          {...field}
                          className="block w-full px-4 py-3 border border-gray-300 rounded-lg"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            )}

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
                      <FormLabel></FormLabel>
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