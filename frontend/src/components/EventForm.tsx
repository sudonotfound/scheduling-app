import React, { useState } from "react";
import type { Event } from "../types";

interface Props {
  onEventCreated: (event: Event) => void;
}

const EventForm: React.FC<Props> = ({ onEventCreated }) => {
  const [title, setTitle] = useState("");
  const [candidate, setCandidate] = useState("");     // 1件分の日時（datetime-local）
  const [dates, setDates] = useState<string[]>([]);   // 複数候補

  const addCandidate = () => {
    if (!candidate) return;
    // 重複防止（同じ日時は追加しない）
    if (dates.includes(candidate)) return;
    setDates(prev => [...prev, candidate]);
    setCandidate("");
  };

  const removeCandidate = (value: string) => {
    setDates(prev => prev.filter(d => d !== value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("タイトルを入力してください");
      return;
    }
    if (dates.length === 0) {
      alert("少なくとも1つの候補日時を追加してください");
      return;
    }

    const payload: Event = { title: title.trim(), dates };

    try {
      const res = await fetch("http://localhost:8000/api/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: Event = await res.json();

      onEventCreated(data);
      setTitle("");
      setDates([]);
      setCandidate("");
    } catch (err) {
      console.error(err);
      alert("イベント作成に失敗しました");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, maxWidth: 520 }}>
      <div>
        <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>タイトル</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="例: 飲み会 / 定例MTG"
          style={{ width: "100%", padding: 8 }}
          required
        />
      </div>

      <div>
        <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
          候補日時（datetime-local）
        </label>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            type="datetime-local"
            value={candidate}
            onChange={e => setCandidate(e.target.value)}
            style={{ flex: 1, padding: 8 }}
          />
          <button type="button" onClick={addCandidate}>
            候補を追加
          </button>
        </div>

        {/* 追加済み候補の一覧 */}
        {dates.length > 0 && (
          <ul style={{ marginTop: 8 }}>
            {dates.map(d => (
              <li key={d} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <code>{d}</code>
                <button type="button" onClick={() => removeCandidate(d)}>
                  削除
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <button type="submit">イベントを作成</button>
      </div>
    </form>
  );
};

export default EventForm;
