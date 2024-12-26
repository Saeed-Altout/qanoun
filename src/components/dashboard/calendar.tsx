"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";

interface Event {
  id: number;
  title: string;
  date: number;
  type: "meeting" | "court" | "task";
  color: string;
}

export function Calendar() {
  const t = useTranslations("Dashboard.calendar");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [events] = useState<Event[]>([
    {
      id: 1,
      title: "Client Meeting",
      date: 5,
      type: "meeting",
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: 2,
      title: "Court Hearing",
      date: 12,
      type: "court",
      color: "bg-red-100 text-red-800",
    },
    {
      id: 3,
      title: "Document Review",
      date: 15,
      type: "task",
      color: "bg-yellow-100 text-yellow-800",
    },
  ]);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekDays = isRTL
    ? ["Sat", "Fri", "Thu", "Wed", "Tue", "Mon", "Sun"]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div
      className="bg-white rounded-lg border border-gray-200 p-6"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500"
          >
            {t(`weekDays.${day.toLowerCase()}`)}
          </div>
        ))}
        {days.map((day) => {
          const dayEvents = events.filter((event) => event.date === day);
          return (
            <div
              key={day}
              className="aspect-square p-2 border border-gray-100 rounded-lg hover:border-[#B4975A] transition-colors"
            >
              <div className="text-sm text-gray-600 mb-2">{day}</div>
              {dayEvents.map((event) => (
                <div
                  key={event.id}
                  className={`text-xs p-1 rounded mb-1 ${event.color}`}
                >
                  {event.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
