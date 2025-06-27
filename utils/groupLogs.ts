import type { LogLine, GroupedTask } from "./logTypes";

function parseTimeToDate(time: string): Date {
  const now = new Date();
  const [hh, mm, ss] = time.split(":").map(Number);
  now.setHours(hh, mm, ss, 0);
  return new Date(now);
}

// format string time to date format for the duration calculation

export function groupLogsByPid(logs: LogLine[]): GroupedTask[] {
  const taskMap: Record<string, GroupedTask> = {};

  console.log("sorting out error and warning");

  for (const log of logs) {
    if (!taskMap[log.pid]) {
      taskMap[log.pid] = { pid: log.pid, desc: log.desc };
    }

    // adding each elements into a common object pid as the key

    const task = taskMap[log.pid];

    const logTime = parseTimeToDate(log.time);

    if (log.status === "START") task.start = logTime;
    if (log.status === "END") task.end = logTime;
  }

  return Object.values(taskMap).map((task) => {
    if (task.start && task.end) {
      const duration = (task.end.getTime() - task.start.getTime()) / 1000; // in seconds
      task.duration = duration;

      if (duration > 600) {
        task.status = "ERROR";
      } else if (duration > 300) {
        task.status = "WARNING";
      } else {
        task.status = "OK";
      }
    } else {
      task.status = "ERROR";
    }

    return task;
  });
}
