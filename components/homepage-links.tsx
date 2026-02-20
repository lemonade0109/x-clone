import Link from "next/link";
import React from "react";

const links = [
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Download the X app",
    href: "/#",
  },
  {
    name: "Grok",
    href: "/#",
  },
  {
    name: "Help Center",
    href: "/help-center",
  },
  {
    name: "Terms of Service",
    href: "/tos",
  },
  {
    name: "Privacy Policy",
    href: "/privacy",
  },
  {
    name: "Accessibility",
    href: "/resources/accessibility",
  },
  {
    name: "Ads info",
    href: "/#",
  },
  {
    name: "Blog",
    href: "/#",
  },
  {
    name: "Careers",
    href: "/#",
  },
  {
    name: "Brand Resources",
    href: "/#",
  },
  {
    name: "Advertising",
    href: "/#",
  },
  { name: "Marketing", href: "/#" },
  {
    name: "X for Business",
    href: "/#",
  },
  {
    name: "Developers",
    href: "/#",
  },
  {
    name: "News",
    href: "/#",
  },
  {
    name: "Settings",
    href: "/settings",
  },
];

const HomepageLinks: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="px-6 pb-6 text-sm text-gray-500 md:px-8 lg:px-10">
      <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5">
        {links.map((link, index) => (
          <li key={link.name} className="flex items-center gap-3">
            {index > 0 && <span aria-hidden="true">|</span>}
            <Link href={link.href} className="hover:underline">
              {link.name}
            </Link>
          </li>
        ))}
        <li className="flex items-center gap-3">
          <span aria-hidden="true">|</span>
          <span>© {currentYear} X Corp.</span>
        </li>
      </ul>
    </div>
  );
};

export default HomepageLinks;
