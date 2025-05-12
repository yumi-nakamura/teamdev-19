import React from "react";
import { useForm } from "react-hook-form";

type LoginFormValues = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = (data: LoginFormValues) => {
    console.log("ログイン情報:", data);
    // ログイン処理など
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm space-y-6">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Sign In
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("email", {
                required: "メールアドレスを入力してください",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "正しいメールアドレスを入力してください",
                },
              })}
              type="email"
              placeholder="Enter your email"
              className="mt-1 w-full rounded-md border border-gray-400 bg-gray-200 px-3 py-2 placeholder-gray-600"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              {...register("password", {
                required: "パスワードを入力してください",
                minLength: {
                  value: 8,
                  message: "8文字以上で入力してください",
                },
                validate: {
                  hasUpperCase: (v) =>
                    /[A-Z]/.test(v) || "大文字を含めてください",
                  hasLowerCase: (v) =>
                    /[a-z]/.test(v) || "小文字を含めてください",
                  hasNumber: (v) => /[0-9]/.test(v) || "数字を含めてください",
                },
              })}
              type="password"
              placeholder="Enter your password"
              className="mt-1 w-full rounded-md border border-gray-400 bg-gray-200 px-3 py-2 placeholder-gray-600"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-full bg-blue-500 py-2 text-white text-lg font-semibold hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-black">
          Don&apos;t have an account?{" "}
          <a href="#" className="font-medium text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};
