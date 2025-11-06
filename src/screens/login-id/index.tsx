import "@/index.css";

import LoginForm from "./login-form";
import AccountBenefits from "./account-benefits";

// import { redirectTo } from "@/components/shared/utils";

export default function LoginIdScreen() {
  // const [text, setText] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
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
            <LoginForm />
            {/* {text} */}
          </div>

          {/* Benefits Section */}
          <div className="lg:flex items-center justify-center bg-secondary px-12 py-12">
            <AccountBenefits />
          </div>
        </div>
      </main>
    </div>
  );
}
