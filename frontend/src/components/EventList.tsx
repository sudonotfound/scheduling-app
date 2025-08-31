import React from "react";
import type { Event } from "../types";

interface Props {
  events: Event[];
}

const EventList: React.FC<Props> = ({ events }) => {
  if (events.length === 0) {
    return <p>イベントがまだありません</p>;
  }

  const format = (value: string) => {
    // datetime-local はタイムゾーンなしのローカル表現文字列（例: "2025-08-24T19:30"）
    // 表示はシンプルにそのまま。必要なら new Date(value) で整形（要注意: TZ 取扱い）
    return value.replace("T", " ");
  };

  return (
    <ul>
      {events.map((event, index) => (
        <li key={index}>
          <strong>{event.title}</strong>
          <div>候補日時:</div>
          <ul>
            {event.dates.map((d) => (
              <li key={d}>{format(d)}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default EventList;
