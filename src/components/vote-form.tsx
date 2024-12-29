"use client";

import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { MOSCOW_DISTRICTS } from "@/configs/moscow-districts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import i18next from "i18next";
import { zodI18nMap } from "zod-i18n-map";
import translation from "zod-i18n-map/locales/ru/zod.json";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { DogBreedSelect } from "./dog-breed-select";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { formSchema, RESULT } from "@/lib/constants";
import { useMutation } from "@apollo/client";

i18next.init({
  lng: "ru",
  resources: {
    ru: { zod: translation },
  },
});
z.setErrorMap(zodI18nMap);

export const BreedVoteForm = ({
  onSubmitSuccess,
}: {
  onSubmitSuccess?: () => void;
}) => {
  const [createResult, { loading, error }] = useMutation(RESULT);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      breed_id: 0,
      is_male: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!values) {
        return;
      }
      await createResult({ variables: { input: values } });
      if (!loading) {
        toast.success("Спасибо за участие!", {
          description: "Статистика доступна в разделе консоль",
          action: {
            label: "Перейти",
            onClick: () => {
              router.push("/dashboard");
            },
          },
        });
        form.reset();
       // onSubmitSuccess();
      }
    } catch (err) {
      if (!loading) {
        toast.error("Ошибка", {
          description: error?.message,
        });
        console.log("ERROR DURING ApolloClient REQUEST", err);
      }
    } finally {
      console.log(values);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-lg">
      <CardHeader>
        <CardTitle>Опрос населения</CardTitle>
        <CardDescription>Какую породу собак вы предпочитаете?</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="breed_id"
              render={({ field }) => (
                <DogBreedSelect
                  value={field.value}
                  onSelect={(v) => field.onChange(v)}
                />
              )}
            />
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Административный округ</FormLabel>
                  <Select
                    value={field.value?.toString() ?? ""}
                    onValueChange={(value) => field.onChange(parseInt(value))}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {MOSCOW_DISTRICTS.map((district) => (
                        <SelectItem
                          key={district.id}
                          value={district.id.toString()}
                        >
                          {district.shortName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Выберите ваш административный округ
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ФИО</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ваше полное имя"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription>Введите ваше имя</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_male"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <Switch
                      checked={field.value ?? false}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Я мужчина</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Возраст</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Укажите ваш текущий возраст.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              <Loader2
                className={cn("h-4 w-4 animate-spin", {
                  hidden: !form.formState.isSubmitting,
                })}
              />
              Отправить
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
