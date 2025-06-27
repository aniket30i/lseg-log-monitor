import { useEffect, useState } from "react";
import { parseLogLine } from "../../utils/parseLogLine.ts";
import { groupLogsByPid } from "../../utils/groupLogs.ts";
import EvaluatedList from "./EvaluatedList.tsx";
import type { GroupedTask } from "../../utils/logTypes.ts";

const Monitor = () => {
  const [text, setText] = useState<string>();
  const [filename, setFileName] = useState<string>();
  const [catergorizedLog, setCatergorizedLog] = useState<GroupedTask[]>();

  useEffect(() => {
    if (!text) return;
    const rawLines = text?.split("\n").filter((line) => line.trim() !== "");
    const parsedLines = rawLines
      ?.map(parseLogLine)
      .filter((line): line is LogLine => line !== null);
    const groupedTasks = groupLogsByPid(parsedLines);
    setTimeout(() => setCatergorizedLog(groupedTasks), 3000);

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
      setFileName(file.name);
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <div className="upload-section">
        <div className="upload-container">
          {filename && text ? (
            <>
              <h4>{`📄 Uploaded: ${filename}`}</h4>
              <button onClick={() => setText("")}>Remove File</button>
            </>
          ) : (
            <div>
              <h3>Upload a log file</h3>
              <input
                type="file"
                accept=".log, .txt"
                onChange={(e) => handleLogUpload(e)}
                placeholder="Upload Log"
              />
            </div>
          )}
        </div>
      </div>
      <header>
        <label className="list-heading">Evaluated Logs Report List</label>
      </header>

      <div
        style={{
          minHeight: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {text && !catergorizedLog ? (
          <div className="loader">
            <span>⏳ Analyzing your logs... please wait</span>
          </div>
        ) : catergorizedLog ? (
          <EvaluatedList finalList={catergorizedLog} />
        ) : (
          <div style={{ textAlign: "center", opacity: 0.7 }}>
            <h3>📝 No log report yet</h3>
            <p>Please upload a .log or .txt file to begin analysis.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Monitor;
