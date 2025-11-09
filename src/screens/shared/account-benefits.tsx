import { useEffect, useState } from "react";
import { useTranslation } from "@/components/shared/hooks/useTranslation";
import { useCurrentScreen } from "@auth0/auth0-acul-react/login-id";
import { Trophy, Search, User as LucideIcon, User } from "lucide-react";

interface Benefit {
  icon: "Trophy" | "Search" | "User";
  title: string;
  description: string;
}

// Map of string names (from JSON) to their actual React components
const iconMap: Record<Benefit["icon"], typeof LucideIcon> = {
  Trophy: Trophy,
  Search: Search,
  User: User,
};

function AccountBenefits() {
  const currentScreen = useCurrentScreen();
  // const loginIdManager = new LoginId();
  const currClientId = currentScreen?.client?.id;

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
    // console.log("loading account benefits...");
  }

  return (
    <div className="w-full max-w-lg space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-light text-foreground text-balance">
          {currClientId === "4lnpYytsL84qlKMy9uuwrzwZORdMMwP8"
            ? t("benefits_title")
            : t("partners_benefits_title")}
        </h2>
        <p className="text-muted-foreground text-lg">
          {t("benefits_subtitle")}
        </p>
      </div>

      <div className="space-y-6">
        {benefits.map((benefit, index) => {
          const IconComponent = iconMap[benefit.icon];

          if (!IconComponent) return null; // Fallback if icon name is misspelled

          return (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <IconComponent className="h-6 w-6 text-primary" />
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

export default AccountBenefits;
