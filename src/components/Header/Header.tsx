import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export const Header: React.FC = () => {
  const router = useRouter();
  return (
    <header className="flex h-[96px] w-full items-center justify-between px-9">
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
        <Link
          href={"#"}
          className="flex h-10 w-10 justify-center rounded-full bg-neutral-800"
        >
          <Image
            src="/assets/images/user.svg"
            width={24}
            height={24}
            alt="profile"
          />
        </Link>
      </nav>
    </header>
  );
};
