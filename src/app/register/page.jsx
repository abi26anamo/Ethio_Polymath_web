"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { register, reset } from "@/redux/features/auth/authSlice";
import LoadingIndicator from "@/componenets/LoadingIndicator";
const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { email, password, confirmPassword } = inputValue;
  const [submitted, setSubmitted] = useState(false);

  const { user, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.auth
  );

  const [emailError, setEmailError] = useState("");

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);

    return isValid;
  };

  const validatePassword = () => {
    return password.length === 9;
  };

  const validateConfirmPassword = () => {
    return password === confirmPassword;
  };

  const handleEmailChange = (e) => {
    setInputValue({ ...inputValue, email: e.target.value });
    setEmailError("");
    dispatch(reset());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (isPasswordValid && isConfirmPasswordValid && isEmailValid) {
      dispatch(register({ email, password, confirmPassword }));
    } else {
      setSubmitted(true);
    }
  };

  useEffect(() => {
    if (isError && message) {
      setEmailError(message);
    } else {
      if (user) {
        console.log("Registration is successful");
        router.push("/admin/dashboard/video-management");
      }
    }
  }, [isError, message, user, router]);

  return (
    <>
      {isLoading && <LoadingIndicator />}
      {!isLoading && !isSuccess && (
        <div className="min-h-full flex items-center justify-center px-4 py-5 lg:py-10 sm:px-6 lg:px-8">
          <div className="w-1/3 space-y-4">
            <div className="flex flex-col gap-5 items-start">
              <h3 className="text-[48px] font-[600] leading-[72px]">
                Registration
              </h3>
            </div>
            <form
              className="space-y-4"
              onSubmit={handleSubmit}
              noValidate
              id="registration-form"
            >
              <div>
                <label
                  htmlFor="email"
                  className="text-[16px] font-[400] leading-[24px] font-poppins text-gray-500"
                >
                  Enter your email to make a new ID
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="none"
                  className={`w-full h-10 md:h-12  px-3 text-base text-gray-700 placeholder-[#c4c4c4] border border-[#c4c4c4] rounded-lg focus:outline-none focus:ring-0 ${
                    (submitted && !validateEmail()) || emailError
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Email"
                  value={email}
                  onChange={(e) => handleEmailChange(e)}
                />
                {emailError || (submitted && !validateEmail()) ? (
                  <p className="text-red-500 text-xs italic">
                    {emailError || "Please enter a valid email address."}
                  </p>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="text-[16px] font-[400] leading-[24px] font-poppins text-gray-500"
                >
                  Set a new password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="none"
                  className={`w-full h-10 md:h-12  px-3 text-base text-gray-700 placeholder-[#c4c4c4] border border-[#c4c4c4] rounded-lg focus:outline-none  focus:ring-0 ${
                    submitted && !validatePassword() ? "border-red-500" : ""
                  }`}
                  placeholder="Password"
                  value={password}
                  onChange={(e) =>
                    setInputValue({ ...inputValue, password: e.target.value })
                  }
                />
                {submitted && !validatePassword() && (
                  <p className="text-red-500 text-xs italic">
                    Password must be exactly 9 characters long.
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="text-[16px] font-[400] leading-[24px] font-poppins text-gray-500"
                >
                  Confirm your new password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  autoComplete="none"
                  className={`w-full h-10 md:h-12  px-3 text-base text-gray-700 placeholder-[#c4c4c4] border border-[#c4c4c4] rounded-lg focus:outline-none focus:ring-0 ${
                    submitted && !validateConfirmPassword()
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setInputValue({
                      ...inputValue,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                {submitted && !validateConfirmPassword() && (
                  <p className="text-red-500 text-xs italic">
                    Passwords do not match.
                  </p>
                )}
              </div>
            </form>
            <div className="fixed bottom-20 sm:bottom-20 flex justify-between w-1/3 space-y-4">
              <div className="flex flex-col justify-end w-[450px]">
                <button
                  className="px-6 h-14 rounded-full py-2 flex justify-center gap-2 items-center text-sm hover:bg-slate-100 w-min duration-200"
                  onClick={() => router.push("/login")}
                >
                  <span className="text-xl">{`<`}</span> Back
                </button>
              </div>
              <div className="flex flex-col px-3 w-119 h-[56px] items-end">
                <button
                  type="submit"
                  form="registration-form"
                  className="px-8 h-56 md:py-13 border rounded-full py-3 text-sm bg-black hover:bg-gray-700 text-white duration-200"
                >
                  <p className="font-[600] text-[16px leading-[21px] font-poppins]">
                    Complete
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;