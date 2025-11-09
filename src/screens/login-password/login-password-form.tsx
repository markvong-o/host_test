import { useState } from "react";
import {
  useScreen,
  login,
  useErrors,
} from "@auth0/auth0-acul-react/login-password";
import { LoginPassword } from "@auth0/auth0-acul-js";
// import { Logo } from '../../components/Logo';

export default function LoginPasswordForm() {
  const screen = useScreen();

  const loginPasswordManager = new LoginPassword();

  const logoUrl = loginPasswordManager.branding.themes?.default.widget
    .logo_url as string;

  //   const transaction = useTransaction();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { hasError, errors } = useErrors();
  const username = screen.data?.username || "";

  const handleLoginClick = async () => {
    setIsLoading(true);

    try {
      await login({ username, password });
    } catch (err: any) {
      console.log([err?.message || "Login failed"]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 text-center">
        <img src={logoUrl} alt="logo" className="mx-auto block" />
        {/* Title */}
        <h2 className="mt-6 text-center text-xl font-semibold text-gray-900">
          {screen.texts?.title || "Enter Your Password"}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          {screen.texts?.description || `Enter your password for ${username}`}
        </p>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLoginClick();
          }}
          className="mt-6 space-y-4"
        >
          {/* Username (prefilled, read-only) */}
          <div>
            <input
              type="text"
              value={username}
              readOnly
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-900 sm:text-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="sr-only">
              {screen.texts?.passwordPlaceholder || "Password"}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder={screen.texts?.passwordPlaceholder || "Password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Continue Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading
                  ? "bg-[#0064b2] cursor-not-allowed"
                  : "bg-[#0064b2] hover:bg-indigo-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {isLoading
                ? screen.texts?.buttonText
                  ? `${screen.texts.buttonText}...`
                  : "Continuing..."
                : screen.texts?.buttonText || "Continue"}
            </button>
          </div>
        </form>

        {/* Links */}
        {screen.links && (
          <>
            {/* Signup */}
            {screen.links.signup && (
              <p className="mt-4 text-center text-sm text-gray-500">
                {screen.texts?.footerText || "Don't have an account?"}{" "}
                <a
                  href={screen.links.signup}
                  className="text-[#0064b2] hover:underline"
                >
                  {screen.texts?.signupActionLinkText || "Sign up"}
                </a>
              </p>
            )}

            {/* Reset Password */}
            {screen.links.reset_password && (
              <p className="mt-2 text-center text-sm text-[#0064b2] hover:text-indigo-500 cursor-pointer">
                <a href={screen.links.reset_password}>
                  {screen.texts?.forgotPasswordText || "Forgot password?"}
                </a>
              </p>
            )}
          </>
        )}

        {/* Errors */}
        {hasError && errors.length > 0 && (
          <div className="mt-4 text-red-600 text-center text-sm">
            {errors.map((error, i) => (
              <p key={i}>{error.message}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
