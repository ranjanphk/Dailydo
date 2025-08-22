export function parseTask(raw) {
  const meta = { text: raw, project: null, tags: [], dueAt: null, attachments: [] };

  let s = raw;

  s = s.replace(/\/project\s+([^\n/]+)/i, (_, name) => {
    meta.project = name.trim();
    return "";
  });

  s = s.replace(/\/tag\s+([^\s]+)/gi, (_, tag) => {
    meta.tags.push(tag.trim());
    return "";
  });

  s = s.replace(/\/by\s+([^\n]+)/i, (_, dateStr) => {
    const val = dateStr.trim().toLowerCase();
    const now = new Date();
    if (val === "today") {
      now.setHours(23, 59, 0, 0);
      meta.dueAt = now.toISOString();
    } else if (val === "tomorrow") {
      const t = new Date(now);
      t.setDate(t.getDate() + 1);
      t.setHours(17, 0, 0, 0);
      meta.dueAt = t.toISOString();
    } else {
      meta.dueAt = new Date(dateStr).toISOString();
    }
    return "";
  });

  s = s.replace(/\/attach\s+([^\s]+)/gi, (_, path) => {
    meta.attachments.push({ name: path, url: path });
    return "";
  });

  meta.text = s.replace(/\s{2,}/g, " ").trim();
  return meta;
}
