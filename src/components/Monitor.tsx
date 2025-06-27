import { useState } from "react";

const Monitor = () => {
  const [text, setText] = useState<string>();

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
      <div>
        <label>Upload Log</label>
        <input
          type="file"
          accept=".log, .txt"
          onChange={(e) => handleLogUpload(e)}
          placeholder="Upload Log"
        />
      </div>
      <div></div>
      <div>Show Categorized Logs</div>
    </div>
  );
};

export default Monitor;
