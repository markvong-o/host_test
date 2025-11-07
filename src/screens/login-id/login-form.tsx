import PrivacyComponent from "mfe_app/PrivacyComponent";
import PartnerComponent from "mfe_app/PartnerComponent";
import type React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "@/components/shared/hooks/useTranslation";
import { LoginId } from "@auth0/auth0-acul-js";
function LoginForm() {
  // Extracting attributes from hook made out of LoginIdInstance class of Auth0 JS SDK
  // const { loginIdInstance, texts, isPasskeyEnabled } = useLoginIdManager();

  document.title = "Login";
  const loginIdManager = new LoginId();
  const currClientName = loginIdManager.client.name;
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
    // console.log("loading login form...");
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-light text-foreground">
          {currClientName === "Dell.com" ? t("title") : t("partners_title")}
        </h1>
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
        {currClientName === "Dell.com" ? (
          <PrivacyComponent />
        ) : (
          <PartnerComponent />
        )}
      </div>
    </div>
  );
}

export default LoginForm;
