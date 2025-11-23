import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Languages } from "lucide-react";

interface LanguageSelectorProps {
  variant?: "navbar" | "standalone";
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = "standalone",
}) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    {
      code: "en",
      flag: "🇺🇸",
      names: {
        en: "English",
        vi: "Tiếng Anh",
        ja: "英語",
      },
    },
    {
      code: "vi",
      flag: "🇻🇳",
      names: {
        en: "Vietnamese",
        vi: "Tiếng Việt",
        ja: "ベトナム語",
      },
    },
    {
      code: "ja",
      flag: "🇯🇵",
      names: {
        en: "Japanese",
        vi: "Tiếng Nhật",
        ja: "日本語",
      },
    },
  ];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  const currentLanguage = languages.find((lang) => lang.code === i18n.language);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen && variant === "navbar") {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, variant]);

  // Navbar variant - compact dropdown
  if (variant === "navbar") {
    return (
      <div className="relative" ref={dropdownRef}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="gap-2"
          title="Change language"
        >
          <Languages className="h-5 w-5" />
          <span className="hidden sm:inline text-sm">
            {currentLanguage?.flag}
          </span>
        </Button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden">
            <div className="py-2">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors ${
                    i18n.language === language.code
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-accent text-foreground"
                  }`}
                >
                  <span className="text-xl">{language.flag}</span>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium">
                      {
                        language.names[
                          i18n.language as keyof typeof language.names
                        ]
                      }
                    </div>
                  </div>
                  {i18n.language === language.code && (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Standalone variant - original modal style
  return (
    <>
      {/* Language Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-3 right-3 z-50 px-4 py-2 rounded-lg border bg-card backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 flex items-center gap-2"
        aria-label="Change language"
      >
        <Languages className="w-5 h-5" />
        <span className="text-sm font-medium hidden sm:inline">
          {
            currentLanguage?.names[
              i18n.language as keyof typeof currentLanguage.names
            ]
          }
        </span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          {/* Backdrop with blur */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            style={{
              animation: "fadeIn 0.3s ease-out",
            }}
          />

          {/* Modal Dialog */}
          <div
            className="relative bg-card rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: "slideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            {/* Language Options */}
            <div className="p-6">
              <div className="space-y-3">
                {languages.map((language, index) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 ${
                      i18n.language === language.code
                        ? "bg-primary/10 text-primary shadow-lg scale-105"
                        : "bg-muted hover:bg-accent text-foreground hover:scale-102"
                    }`}
                    style={{
                      animation: `slideInItem 0.4s ease-out ${index * 0.1}s both`,
                    }}
                  >
                    <span className="text-3xl">{language.flag}</span>
                    <div className="flex-1 text-left">
                      <div className="font-semibold">
                        {
                          language.names[
                            i18n.language as keyof typeof language.names
                          ]
                        }
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {
                          language.names[
                            language.code as keyof typeof language.names
                          ]
                        }
                      </div>
                    </div>
                    {i18n.language === language.code && (
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            {/* <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
              <p className="text-center text-sm text-gray-600">
                Press{" "}
                <kbd className="px-2 py-1 bg-white rounded border text-xs">
                  Esc
                </kbd>{" "}
                or click outside to close
              </p>
            </div> */}
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(-50px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes slideInItem {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        kbd {
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
        }
      `}</style>
    </>
  );
};

export default LanguageSelector;
