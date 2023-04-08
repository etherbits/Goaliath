import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserButton } from "@clerk/nextjs";

export const Header: React.FC = () => {
  const router = useRouter();
  return (
    <header className="flex h-24 w-full items-center justify-between px-9">
      <Link href={"#"}>
        <Image
          src="/assets/images/logo.svg"
          className=""
          width={109}
          height={24}
          alt="logo"
        />
      </Link>
      <nav className="flex items-center gap-4">
        <Link
          href={"#"}
          className={`text-base ${
            router.pathname === "/" ? "text-indigo-400" : "text-neutral-200"
          }`}
        >
          Goals
        </Link>
        <Link
          href={"#"}
          className={`text-base ${
            router.pathname === "/feed" ? "text-indigo-400" : "text-neutral-200"
          }`}
        >
          Feed
        </Link>
        <Link
          href={"#"}
          className={`text-base ${
            router.pathname === "/dashboard"
              ? "text-indigo-400"
              : "text-neutral-200"
          }`}
        >
          Dashboard
        </Link>

        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: {
                width: "40px",
                height: "40px",
              },
            },
          }}
        />
      </nav>
    </header>
  );
};
