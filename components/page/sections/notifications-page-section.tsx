import React from "react";
import {
  AtSign,
  Heart,
  Repeat2,
  Settings,
  UserRoundPlus,
  Verified,
} from "lucide-react";

const tabs = ["All", "Verified", "Mentions"];

type NotificationType = "follow" | "like" | "repost" | "mention";

type NotificationItem = {
  id: number;
  type: NotificationType;
  actor: string;
  handle: string;
  time: string;
  text: string;
  verified?: boolean;
};

const notifications: NotificationItem[] = [
  {
    id: 1,
    type: "follow",
    actor: "Frontend Daily",
    handle: "@FrontendDaily",
    time: "2h",
    text: "followed you",
  },
  {
    id: 2,
    type: "like",
    actor: "Next.js",
    handle: "@nextjs",
    time: "4h",
    text: "liked your post about App Router performance.",
    verified: true,
  },
  {
    id: 3,
    type: "repost",
    actor: "OpenAI",
    handle: "@OpenAI",
    time: "6h",
    text: "reposted your post.",
    verified: true,
  },
  {
    id: 4,
    type: "mention",
    actor: "Code With Ada",
    handle: "@ada_codes",
    time: "1d",
    text: 'mentioned you: "This UI rhythm is clean @jubril1234"',
  },
];

const notificationIcon: Record<
  NotificationType,
  { icon: React.ComponentType<{ className?: string }>; className: string }
> = {
  follow: {
    icon: UserRoundPlus,
    className: "text-sky-500",
  },
  like: {
    icon: Heart,
    className: "text-pink-500",
  },
  repost: {
    icon: Repeat2,
    className: "text-emerald-500",
  },
  mention: {
    icon: AtSign,
    className: "text-sky-600",
  },
};

const NotificationPageSection: React.FC = () => {
  return (
    <section className="min-h-screen w-full max-w-150 border-r border-zinc-200 dark:border-zinc-800">
      <header className="sticky top-0 z-20 border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-black/90 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 pt-2 pb-1">
          <h1 className="text-xl font-extrabold">Notifications</h1>
          <button
            type="button"
            className="rounded-full p-2 text-zinc-700 dark:text-zinc-300 transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="Notification settings"
          >
            <Settings className="h-5 w-5" />
          </button>
        </div>

        <nav className="grid grid-cols-3 text-[15px]">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              type="button"
              className={`relative py-4 font-medium transition hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                index === 0
                  ? "font-semibold text-black dark:text-white"
                  : "text-zinc-500"
              }`}
            >
              {tab}
              {index === 0 ? (
                <span className="absolute right-8 bottom-0 left-8 h-1 rounded-full bg-sky-500" />
              ) : null}
            </button>
          ))}
        </nav>
      </header>

      <div>
        {notifications.map((item) => {
          const ItemIcon = notificationIcon[item.type].icon;

          return (
            <article
              key={item.id}
              className="cursor-pointer border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 transition hover:bg-zinc-50 dark:hover:bg-zinc-900"
            >
              <div className="flex gap-3">
                <div className="mt-1 w-8 shrink-0 text-right">
                  <ItemIcon
                    className={`ml-auto h-5 w-5 ${notificationIcon[item.type].className}`}
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-300 dark:bg-zinc-600 text-sm font-bold text-zinc-700 dark:text-zinc-300">
                      {item.actor[0]}
                    </div>
                    <div className="min-w-0 text-[15px] leading-5">
                      <p className="flex items-center gap-1.5">
                        <span className="truncate font-bold">{item.actor}</span>
                        {item.verified ? (
                          <Verified className="h-4 w-4 fill-sky-500 text-white" />
                        ) : null}
                        <span className="truncate text-zinc-500">
                          {item.handle}
                        </span>
                        <span className="text-zinc-500">· {item.time}</span>
                      </p>
                    </div>
                  </div>

                  <p className="mt-2 text-[15px] text-zinc-900">{item.text}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default NotificationPageSection;
