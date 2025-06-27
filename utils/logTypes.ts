export type LogLine = {
  time: string;
  desc: string;
  status: "START" | "END";
  pid: string;
};

export type GroupedTask = {
  pid: string;
  desc: string;
  start?: Date;
  end?: Date;
  duration?: number; // in seconds
  status: "OK" | "WARNING" | "ERROR";
};
