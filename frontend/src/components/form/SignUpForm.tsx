"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { signUpSchema } from "@/schema/signUpSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const SignUpForm = () => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    setAuthError(null);

    try {
      // Replace with your actual API call
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
      }

      router.push("/dashboard"); // Change to your success route
    } catch (error: any) {
      setAuthError(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-80 rounded-xl border border-gray-200 p-6 shadow-md bg-white"
    >
      <h2 className="mb-4 text-center text-xl font-bold text-blue-600">
        Create an Account
      </h2>

      {/*name*/}
      <div>
        <Label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </Label>
        <Input
          id="name"
          type="name"
          placeholder="Name"
          {...form.register("name")}
          className="mt-1 block w-full"
        />
        {form.formState.errors.name && (
          <p className="mt-1 text-sm text-red-500">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="mt-4">
        <Label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          {...form.register("email")}
          className="my-1 block w-full"
        />
        {form.formState.errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="mt-4">
        <Label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          {...form.register("password")}
          className="mt-1 block w-full"
        />
        {form.formState.errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="mt-4">
        <Label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm Password
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          {...form.register("confirmPassword")}
          className="mt-1 block w-full"
        />
        {form.formState.errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">
            {form.formState.errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Sign in link */}
      <div className="mt-2 flex items-center justify-between text-xs text-gray-600">
        <span>New User?</span>
        <Link href="/sign-in" className="hover:text-blue-500 hover:underline">
          Sign In
        </Link>
      </div>

      {/* Error */}
      {authError && <p className="mt-4 text-sm text-red-500">{authError}</p>}

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full bg-blue-600 text-white hover:bg-blue-700"
      >
        {isSubmitting ? "Submitting..." : "Sign Up"}
      </Button>
    </form>
  );
};

export default SignUpForm;
