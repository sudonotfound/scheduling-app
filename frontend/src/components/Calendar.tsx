import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Event } from "../types";

interface Props {
  events: Event[];
}

const Calendar: React.FC<Props> = ({ events }) => {
  // FullCalendar用に変換
  const calendarEvents = events.flatMap((event) =>
    event.dates.map((d) => {
      let start = d;

      if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(d)) {
        start = `${d}:00`;
      }
      return {
        // "
      title: event.title,
      start,  // ISO8601形式 "YYYY-MM-DDTHH:mm"
      };
    })
  );

  return (
    <div style={{ marginTop: "2rem" }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek" // 時間表示付きの週ビュー
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={calendarEvents}
        height="auto"
        dateClick={(info) => {
          alert(`クリックした日時: ${info.dateStr}`);
        }}
      />
    </div>
  );
};

export default Calendar;
