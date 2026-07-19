import { createFileRoute } from "@tanstack/react-router";
import { Check, Copy, RefreshCw, ShieldCheck } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { ToolsLayout } from "~/feature/tools/layouts/ToolsLayout";
import { ToolsNavbar } from "~/feature/tools/components/ToolsNavbar";

const characterSets = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.?/|~",
};

type CharacterOption = keyof typeof characterSets;

function getSecureRandomIndex(max: number) {
  const randomValue = new Uint32Array(1);
  const limit = Math.floor(0x100000000 / max) * max;

  do {
    crypto.getRandomValues(randomValue);
  } while (randomValue[0] >= limit);

  return randomValue[0] % max;
}

function createPassword(
  length: number,
  enabled: Record<CharacterOption, boolean>,
) {
  const selected = (Object.keys(characterSets) as CharacterOption[]).filter(
    (option) => enabled[option],
  );
  const pool = selected.map((option) => characterSets[option]).join("");

  if (!pool) return "";

  const password = selected.map((option) => {
    const characters = characterSets[option];
    return characters[getSecureRandomIndex(characters.length)];
  });

  while (password.length < length) {
    password.push(pool[getSecureRandomIndex(pool.length)]);
  }

  for (let index = password.length - 1; index > 0; index -= 1) {
    const swapIndex = getSecureRandomIndex(index + 1);
    [password[index], password[swapIndex]] = [
      password[swapIndex],
      password[index],
    ];
  }

  return password.join("");
}

export const Route = createFileRoute("/tools/password-generator/")({
  component: PasswordGeneratorPage,
});

function PasswordGeneratorPage() {
  const [length, setLength] = useState(12);
  const [enabled, setEnabled] = useState<Record<CharacterOption, boolean>>({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePassword = () => setPassword(createPassword(length, enabled));

  useEffect(() => {
    generatePassword();
  }, [length, enabled]);

  const enabledCount = Object.values(enabled).filter(Boolean).length;
  const strength = useMemo(() => {
    const score = Math.min(4, Math.ceil((length * enabledCount) / 12));
    return ["Weak", "Fair", "Good", "Strong"][Math.max(0, score - 1)];
  }, [enabledCount, length]);

  const strengthWidth = {
    Weak: "25%",
    Fair: "50%",
    Good: "75%",
    Strong: "100%",
  }[strength];

  const copyPassword = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const toggleOption = (option: CharacterOption) => {
    if (enabled[option] && enabledCount === 1) return;
    setEnabled((current) => ({ ...current, [option]: !current[option] }));
  };

  return (
    <ToolsLayout>
      <ToolsNavbar />
      <section className="min-h-[calc(100vh-4rem)] bg-[#f8f9fa] px-4 py-12 text-[#101010] sm:px-8 lg:py-16">
        <div className="mx-auto max-w-[832px]">
          <header className="mx-auto max-w-[760px] text-center">
            <h1 className="text-4xl font-medium leading-[1.14] tracking-tight sm:text-5xl">
              Instantly generate a secure, random password with the LastPass
              online tool
            </h1>
            <p className="mx-auto mt-5 max-w-[720px] text-xl leading-relaxed sm:text-2xl">
              Use our online password generator tool to instantly create a
              secure, random password.
            </p>
          </header>

          <div className="mt-9">
            <div className="flex min-h-[94px] items-center gap-3 rounded-lg border border-[#6e6e6e] bg-white px-6 py-4 shadow-sm sm:px-7">
              <output
                aria-live="polite"
                className="min-w-0 flex-1 truncate text-[25px] tracking-tight sm:text-[28px]"
              >
                {password}
              </output>
              <button
                type="button"
                onClick={generatePassword}
                className="rounded-full p-2 text-[#707070] transition hover:bg-zinc-100 hover:text-zinc-950 focus:outline-none focus:ring-2 focus:ring-[#d51443]"
                aria-label="Generate a new password"
              >
                <RefreshCw className="h-7 w-7" strokeWidth={2.5} />
              </button>
              <button
                type="button"
                onClick={copyPassword}
                className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#d71445] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#b90f3a] focus:outline-none focus:ring-2 focus:ring-[#d71445] focus:ring-offset-2 sm:px-5"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied ? "Copied" : "Copy password"}
              </button>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <div className="h-[8px] flex-1 overflow-hidden rounded-full bg-[#cbd0ca]">
                <div
                  className="h-full rounded-full bg-[#286a3a] transition-all"
                  style={{ width: strengthWidth }}
                />
              </div>
              <span className="flex items-center gap-1 text-sm font-bold text-[#286a3a]">
                <ShieldCheck className="h-4 w-4 fill-[#286a3a] text-white" />
                {strength}
              </span>
            </div>
          </div>

          <div className="relative mt-6 rounded-lg bg-[#dfeedd] px-8 py-10 sm:px-8">
            <div className="absolute -top-4 left-1/2 h-8 w-8 -translate-x-1/2 rotate-45 bg-[#dfeedd]" />
            <div className="relative space-y-10">
              <div className="grid items-center gap-5 sm:grid-cols-[200px_1fr]">
                <label htmlFor="password-length" className="text-sm font-bold">
                  Password Length {length}
                </label>
                <input
                  id="password-length"
                  type="range"
                  min="8"
                  max="32"
                  value={length}
                  onChange={(event) => setLength(Number(event.target.value))}
                  className="password-range h-2 w-full cursor-pointer appearance-none rounded-full"
                  style={
                    {
                      "--range-progress": `${((length - 8) / 24) * 100}%`,
                    } as React.CSSProperties
                  }
                />
              </div>

              <fieldset className="grid items-center gap-5 sm:grid-cols-[200px_1fr]">
                <legend className="text-sm font-bold sm:float-left sm:w-[200px]">
                  Characters Used
                </legend>
                <div className="flex flex-wrap gap-x-6 gap-y-4">
                  {(Object.keys(characterSets) as CharacterOption[]).map(
                    (option) => (
                      <label
                        key={option}
                        className="flex cursor-pointer items-center gap-2 text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={enabled[option]}
                          onChange={() => toggleOption(option)}
                          className="h-5 w-5 accent-black"
                        />
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </label>
                    ),
                  )}
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </section>
    </ToolsLayout>
  );
}
