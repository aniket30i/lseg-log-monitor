import { useEffect, useState } from "react";
import { parseLogLine } from "../../utils/parseLogLine.ts";
import { groupLogsByPid } from "../../utils/groupLogs.ts";

const Monitor = () => {
  const [text, setText] = useState<string>();

  useEffect(() => {
    if (!text) return;
    const rawLines = text?.split("\n").filter((line) => line.trim() !== "");
    const parsedLines = rawLines
      ?.map(parseLogLine)
      .filter((line): line is LogLine => line !== null);
    const groupedTasks = groupLogsByPid(parsedLines);

    console.log(parsedLines);
    console.log(groupedTasks);
  }, [text]);
  // rerun the categorization when the log file changes

  const handleLogUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const logs = e.target?.result;
      if (typeof logs !== "string") {
        console.error("File read error: Result is not a string");
        return;
      }
      setText(logs as string);
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <div className="upload-section">
        <div className="upload-container">
          <h3>Upload a log file to get started</h3>
          <input
            type="file"
            accept=".log, .txt"
            onChange={(e) => handleLogUpload(e)}
            placeholder="Upload Log"
          />
        </div>
      </div>
      <div></div>
      <div>Show Categorized Logs</div>
    </div>
  );
};

export default Monitor;
