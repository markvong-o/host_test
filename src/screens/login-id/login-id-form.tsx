// // import PrivacyComponent from "mfe_app/PrivacyComponent";
// // import PartnerComponent from "mfe_app/PartnerComponent";
// import type React from "react";
// import { useEffect, useState } from "react";
// import { useTranslation } from "@/components/shared/hooks/useTranslation";
// import { LoginId } from "@auth0/auth0-acul-js";
// function LoginForm() {
//   // Extracting attributes from hook made out of LoginIdInstance class of Auth0 JS SDK
//   // const { loginIdInstance, texts, isPasskeyEnabled } = useLoginIdManager();

//   document.title = "Login";
//   const loginIdManager = new LoginId();
//   const currClientName = loginIdManager.client.name;
//   // const [email, setEmail] = useState("");
//   const wsid_mappings = {
//     "Dell.com": "5b64d307-2a2d-4268-9b19-6524087987bb_Register",
//     "Dell Partner": "cf7b2e54-c82f-48d0-95b3-eeca5d68e3ea_Register",
//   } as any;
//   const wsid = wsid_mappings[currClientName];

//   // 1. Example of managing locale state
//   const [locale, setLocale] = useState("en");

//   // 2. Use the hook to get the translation function
//   const { t, loading } = useTranslation(locale);

// useEffect(() => {
//   let authParams: any = null;
//   try {
//   } catch (e) {
//     console.error(e);
//   }
//   if (authParams) {
//     const l = authParams["ext"]["ext-locale"];
//     setLocale(l);
//   }
// }, []);

// const handleSubmit = (e: React.FormEvent) => {
//   e.preventDefault();
//   // Handle login logic here
//   // console.log("Login submitted", { email });
// };

// if (loading) {
//   // console.log("loading login form...");
// }

//   return (
//     <div className="w-full max-w-md space-y-8">
//       <div className="space-y-2">
//         <h1 className="text-4xl font-light text-foreground">
//           {currClientName === "Dell.com" ? t("title") : t("partners_title")}
//         </h1>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Google Sign In */}
//         <button
//           type="button"
//           // variant="outline"
//           className="w-full h-12 text-base font-normal bg-transparent! flex justify-center items-center !border-gray-500"
//         >
//           <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
//             <path
//               fill="#4285F4"
//               d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//             />
//             <path
//               fill="#34A853"
//               d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//             />
//             <path
//               fill="#FBBC05"
//               d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//             />
//             <path
//               fill="#EA4335"
//               d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//             />
//           </svg>
//           {t("google_social_btn")}
//         </button>

//         {/* Email Input */}
//         <div className="space-y-2 flex flex-col">
//           <label htmlFor="email" className="text-left text-lg font-bold">
//             {t("email_label")}
//           </label>
//           <input
//             id="email"
//             type="email"
//             // value={email}
//             // onChange={(e) => setEmail(e.target.value)}
//             className="h-12 border-1 border-solid border-gray-500"
//             required
//           />
//         </div>

//         {/* Password Link */}
//         <div>
//           <a
//             href="#"
//             className="!text-[#0064b2] hover:underline text-sm font-normal"
//           >
//             {t("pw_label")}
//           </a>
//         </div>

//         {/* Continue Button */}
//         <button
//           type="submit"
//           className="!bg-[#0064b2] w-full h-12 text-white font-normal"
//         >
//           {t("continue_btn")}
//         </button>
//       </form>

//       <div className="space-y-4 text-sm">
//         <dell-pmc-ncm data-wsid={wsid} data-locale="us-en"></dell-pmc-ncm>
//         {/* Footer Links */}
//         {/* <div className="space-y-4 text-center text-sm">
//         <p className="!text-[#0064b2]">
//           {t("missing_acct_content")}{" "}
//           <a href="#" className="!text-[#0064b2] hover:underline font-normal">
//             {t("create_btn")}
//           </a>
//         </p>
//         <p className="text-muted-foreground">
//           {t("help_content")}{" "}
//           <a href="#" className="!text-[#0064b2] hover:underline font-normal">
//             {t("faq_content")}
//           </a>
//         </p>
//         {currClientName === "Dell.com" ? (
//           <PrivacyComponent />
//         ) : (
//           <PartnerComponent />
//         )}
//       </div> */}
//       </div>
//     </div>
//   );
// }

// export default LoginForm;

import React, { useRef, useState, useMemo, useEffect } from "react";
import {
  useScreen,
  useTransaction,
  login,
  federatedLogin,
  passkeyLogin,
  useLoginIdentifiers,
} from "@auth0/auth0-acul-react/login-id";
// import { Logo } from '../../components/Logo';
import { LoginId } from "@auth0/auth0-acul-js";
import { useTranslation } from "@/components/shared/hooks/useTranslation";

const LoginScreen: React.FC = () => {
  const loginIdManager = new LoginId();
  const currClientName = loginIdManager.client.name;
  const logoUrl = loginIdManager.branding.themes?.default.widget
    .logo_url as string;

  console.log(loginIdManager);

  const wsid_mappings = {
    "Dell.com (/app1)": "5b64d307-2a2d-4268-9b19-6524087987bb_Register",
    "Dell Partner (/app2)": "cf7b2e54-c82f-48d0-95b3-eeca5d68e3ea_Register",
  } as any;
  const wsid = wsid_mappings[currClientName];
  const screen = useScreen();
  const transaction = useTransaction();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const activeIdentifiers = useLoginIdentifiers();
  //   // 1. Example of managing locale state
  const [locale, setLocale] = useState("en");

  // 2. Use the hook to get the translation function
  const { t, loading } = useTranslation(locale);

  useEffect(() => {
    let authParams: any = null;
    try {
    } catch (e) {
      console.error(e);
    }
    if (authParams) {
      const l = authParams["ext"]["ext-locale"];
      setLocale(l);
    }
  }, []);

  if (loading) {
    // console.log("loading login form...");
  }

  const identifierLabel = useMemo(() => {
    if (activeIdentifiers?.length === 1)
      return `Enter your ${activeIdentifiers[0]}`;
    return `Enter your ${activeIdentifiers?.join(" or ")}`;
  }, [activeIdentifiers]);

  const handleLoginClick = async () => {
    const username = usernameRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";
    const captcha = captchaRef.current?.value ?? "";

    setIsLoading(true);
    setErrorMessages([]);

    try {
      await login({ username, password, captcha });
    } catch (err: any) {
      setErrorMessages([err?.message || "Login failed"]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFederatedLogin = async (connection: string) => {
    setErrorMessages([]);
    try {
      await federatedLogin({ connection });
    } catch (err: any) {
      setErrorMessages([err?.message || "Federated login failed"]);
    }
  };

  const handlePasskeyLogin = async () => {
    setErrorMessages([]);
    try {
      await passkeyLogin({});
    } catch (err: any) {
      setErrorMessages([err.message || "Passkey login failed"]);
    }
  };

  const isCaptchaAvailable = (screen as any).isCaptchaAvailable || false;
  const alternateConnections = transaction.alternateConnections || [];
  const passkeyEnabled = transaction.isPasskeyEnabled;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-10">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-20 h-20">
            <img src={logoUrl} alt="logo" className="mx-auto block" />
          </div>
        </div>

        {/* Title */}
        <h2 className="mt-6 text-center text-xl font-semibold text-gray-900">
          {currClientName === "Dell.com" ? t("title") : t("partners_title")}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          {screen.texts?.description || "Log in"}
        </p>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLoginClick();
          }}
          className="mt-6 space-y-4"
        >
          <div className="rounded-md shadow-sm">
            <div className="mb-4">
              <label htmlFor="username">{identifierLabel}</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                placeholder={identifierLabel}
                ref={usernameRef}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {isCaptchaAvailable && (
              <div className="mt-4">
                <label
                  htmlFor="captcha"
                  className="block text-sm font-medium text-gray-300"
                >
                  {screen.texts?.captchaCodePlaceholder ||
                    "Enter the code shown above"}
                </label>
                <input
                  id="captcha"
                  name="captcha"
                  type="text"
                  placeholder={
                    screen.texts?.captchaCodePlaceholder || "Enter captcha"
                  }
                  ref={captchaRef}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-[#0064b2] hover:bg-indigo-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {isLoading
                ? screen.texts?.buttonText
                  ? `${screen.texts.buttonText}...`
                  : "Logging in..."
                : screen.texts?.buttonText || "Login"}
            </button>
          </div>
        </form>

        {/* Sign up + reset password links */}
        {screen.links && (
          <>
            <p className="mt-4 text-center text-sm text-gray-500">
              {screen.texts?.footerText || "Don't have an account?"}{" "}
              {screen.links.signup && (
                <a
                  href={screen.signupLink || "#"}
                  className="text-indigo-500 hover:underline"
                >
                  {screen.texts?.signupActionLinkText || "Sign up"}
                </a>
              )}
            </p>

            {screen.links.reset_password && (
              <p className="mt-2 text-center text-sm text-indigo-600 hover:text-indigo-500 cursor-pointer">
                <a href={screen.links.reset_password}>
                  {screen.texts?.forgotPasswordText || "Can't log in?"}
                </a>
              </p>
            )}
          </>
        )}

        {/* OR separator */}
        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google login */}
        {alternateConnections.map((conn: any) => (
          <button
            key={conn.name}
            onClick={() => handleFederatedLogin(conn.name)}
            className="w-full flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {conn.name === "google-oauth2" && (
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            Continue with {conn.options?.display_name || conn.name}
          </button>
        ))}

        {/* Passkey login */}
        {passkeyEnabled && (
          <button
            onClick={handlePasskeyLogin}
            className="mt-3 w-full bg-[#0064b2] rounded-md py-2 text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {screen.texts?.passkeyButtonText || "Continue with a passkey"}
          </button>
        )}

        {transaction.hasErrors && errorMessages.length > 0 && (
          <div className="mt-4 text-red-600 text-center text-sm">
            {errorMessages.map((msg, i) => (
              <p key={i}>{msg}</p>
            ))}
          </div>
        )}
        <div className="my-[15px]"></div>
        <dell-pmc-ncm data-wsid={wsid} data-locale="us-en"></dell-pmc-ncm>
      </div>
    </div>
  );
};

export default LoginScreen;
