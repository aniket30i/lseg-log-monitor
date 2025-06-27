import { parseLogLine } from "../../utils/parseLogLine";

describe("parseLogLine", () => {
  it("parses a valid log line correctly", () => {
    const line = "11:35:23,scheduled task 032, START,37980";
    const result = parseLogLine(line);

    expect(result).toEqual({
      time: "11:35:23",
      desc: "scheduled task 032",
      status: "START",
      pid: "37980",
    });
  });

  it("returns null for invalid format", () => {
    const badLine = "bad,log,line";
    const result = parseLogLine(badLine);
    expect(result).toBeNull();
  });
});
