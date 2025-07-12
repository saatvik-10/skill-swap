"use client";

import React from "react";
import { signInSchema } from "@/schema/signInSchema";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const SignInForm = () => {
  const route = useRouter();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [authError, setAuthError] = React.useState<string | null>(null);

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    console.log(data);
  };

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-80 rounded-xl border-2 p-6"
    >
      <div>
        <span className="mb-4 flex items-center justify-center text-xl font-bold">
          Sign In to continue
        </span>
        <Label htmlFor="email" className="block text-sm font-medium">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          {...form.register("email")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
        {form.formState.errors.email && (
          <p className="mt-2 text-sm text-red-500">
            {form.formState.errors.email?.message}
          </p>
        )}
      </div>
      <div className="relative mt-4">
        <Label htmlFor="password" className="block text-sm font-medium">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          {...form.register("password")}
          className="mt-1 block w-full rounded-md border-gray-300 pr-10 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
        {form.formState.errors.password && (
          <p className="mt-2 text-sm text-red-500">
            {form.formState.errors.password?.message}
          </p>
        )}
      </div>

      <div className="mt-1 flex items-center justify-between px-1 text-xs">
        <span>Existing User?</span>
        <Link href="sign-up">
          <span className="hover:text-blue-400 hover:underline">Sign Up</span>
        </Link>
      </div>

      {/* General Authentication Error */}
      {authError && <p className="mt-4 text-sm text-red-500">{authError}</p>}

      <Button
        type="submit"
        className="mt-6 w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:cursor-pointer hover:bg-blue-800"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Sign In"}
      </Button>
      <div id="clerk-captcha"></div>
    </form>
  );
};

export default SignInForm;
