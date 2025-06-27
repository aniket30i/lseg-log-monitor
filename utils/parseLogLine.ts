import { z } from "zod";
import { LogLine } from "./logTypes";

const LogSchema = z.object({
  time: z.string().regex(/^\d{2}:\d{2}:\d{2}$/),
  desc: z.string().min(1),
  status: z.enum(["START", "END"]),
  pid: z.string().regex(/^\d+$/),
});
