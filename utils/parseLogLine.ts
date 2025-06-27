import { z } from "zod";
import { LogLine } from "./logTypes";

const LogSchema = z.object({
  time: z.string().regex(/^\d{2}:\d{2}:\d{2}$/),
  desc: z.string().min(1),
  status: z.enum(["START", "END"]),
  pid: z.string().regex(/^\d+$/),
});

// zod for additional validation
export function parseLogLine(line: string): LogLine | null {
  const parts = line.split(",");
  if (parts.length !== 4) return null;

  const [time, desc, statusRaw, pid] = parts.map((p) => p.trim());
  const parsed = {
    time,
    desc,
    status: statusRaw as "START" | "END",
    pid,
  };
  //structuring the log data as object for better usage to display

  const result = LogSchema.safeParse(parsed); // passing throught zod for validation of formatting
  return result.success ? result.data : null;
}
