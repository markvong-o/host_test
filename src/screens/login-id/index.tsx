import "@/index.css";
// import { lazy, Suspense } from "react";
// const LoginForm = lazy(() => import("./login-form"));
// const AccountBenefits = lazy(() => import("./account-benefits"));
// import { useLoginIdManager } from "./hooks/useLoginIdManager";
import PrivacyComponent from "mfe_app/PrivacyComponent";
import type React from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
// import { Trophy, Search, User as LucideIcon, User } from "lucide-react";
import { useTranslation } from "@/components/shared/hooks/useTranslation";

interface Benefit {
  icon: "Trophy" | "Search" | "User";
  title: string;
  description: string;
}

// Map of string names (from JSON) to their actual React components
// const iconMap: Record<Benefit["icon"], typeof LucideIcon> = {
//   Trophy: Trophy,
//   Search: Search,
//   User: User,
// };

function AccountBenefits() {
  // 1. Example of managing locale state
  const [locale, setLocale] = useState("en");

  // 2. Use the hook to get the translation function
  const { t, loading } = useTranslation(locale);
  const rawBenefits = t("benefits");
  // const rawBenefits = "";
  const benefits: Benefit[] = (
    Array.isArray(rawBenefits) ? rawBenefits : []
  ) as Benefit[];

  useEffect(() => {
    let loginIdManager: any = null;
    let authParams: any = null;
    try {
    } catch (e) {
      console.error(e);
    }
    console.log(loginIdManager, authParams);
    if (authParams) {
      const l = authParams["ext"]["ext-locale"];
      setLocale(l);
    }
  }, []);

  if (loading) {
    console.log("loading account benefits...");
  }

  return (
    <div className="w-full max-w-lg space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-light text-foreground text-balance">
          {t("benefits_title")}
        </h2>
        <p className="text-muted-foreground text-lg">
          {t("benefits_subtitle")}
        </p>
      </div>

      <div className="space-y-6">
        {benefits.map((benefit, index) => {
          // const IconComponent = iconMap[benefit.icon];

          // if (!IconComponent) return null; // Fallback if icon name is misspelled

          return (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  {/* <IconComponent className="h-6 w-6 text-primary" /> */}
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-foreground">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LoginForm() {
  // Extracting attributes from hook made out of LoginIdInstance class of Auth0 JS SDK
  // const { loginIdInstance, texts, isPasskeyEnabled } = useLoginIdManager();

  document.title = "Login";
  // const [email, setEmail] = useState("");

  // 1. Example of managing locale state
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    // console.log("Login submitted", { email });
  };

  if (loading) {
    console.log("loading login form...");
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-light text-foreground">{t("title")}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Google Sign In */}
        <button
          type="button"
          // variant="outline"
          className="w-full h-12 text-base font-normal bg-transparent! flex justify-center items-center !border-gray-500"
        >
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
          {t("google_social_btn")}
        </button>

        {/* Email Input */}
        <div className="space-y-2 flex flex-col">
          <label htmlFor="email" className="text-left text-lg font-bold">
            {t("email_label")}
          </label>
          <input
            id="email"
            type="email"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            className="h-12 border-1 border-solid border-gray-500"
            required
          />
        </div>

        {/* Password Link */}
        <div>
          <a
            href="#"
            className="!text-[#0064b2] hover:underline text-sm font-normal"
          >
            {t("pw_label")}
          </a>
        </div>

        {/* Continue Button */}
        <button
          type="submit"
          className="!bg-[#0064b2] w-full h-12 text-white font-normal"
        >
          {t("continue_btn")}
        </button>
      </form>

      {/* Footer Links */}
      <div className="space-y-4 text-center text-sm">
        <p className="!text-[#0064b2]">
          {t("missing_acct_content")}{" "}
          <a href="#" className="!text-[#0064b2] hover:underline font-normal">
            {t("create_btn")}
          </a>
        </p>
        <p className="text-muted-foreground">
          {t("help_content")}{" "}
          <a href="#" className="!text-[#0064b2] hover:underline font-normal">
            {t("faq_content")}
          </a>
        </p>
        <PrivacyComponent />
      </div>
    </div>
  );
}

// export default LoginForm;

export default function LoginIdScreen() {
  return (
    <div className="!min-w-full !min-h-full !w-full !h-full flex flex-col">
      {/* Header */}
      <header className="bg-background">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              {/* <svg viewBox="0 0 24 24" className="h-8 w-8 text-primary" fill="currentColor">
                <path d="M3 3h18v18H3V3zm2 2v14h14V5H5z" />
                <path d="M7 7h10v10H7V7z" />
              </svg> */}
              <span className="text-xl font-semibold text-primary">
                Dell Technologies
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex">
        <div className="w-full lg:grid lg:grid-cols-2 border-b border-red">
          {/* Login Form Section */}
          <div className="flex items-center justify-center px-6 py-12 lg:px-12">
            {/* <Suspense fallback={<></>}> */}
            <LoginForm />
            {/* </Suspense> */}
          </div>

          {/* Benefits Section */}
          <div className="lg:flex items-center justify-center bg-secondary px-12 py-12">
            {/* <Suspense fallback={<></>}> */}
            <AccountBenefits />
            {/* </Suspense> */}
          </div>
        </div>
      </main>
    </div>
  );
}
