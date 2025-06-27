import EvaluatedList from "./EvaluatedList";

import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

const mockLogs = [
  {
    pid: "123",
    desc: "Background job X",
    status: "OK",
    duration: 180, // 3 minutes
    start: new Date("2025-06-27T10:00:00"),
    end: new Date("2025-06-27T10:03:00"),
  },
  {
    pid: "456",
    desc: "Scheduled task A",
    status: "WARNING",
    duration: 360, // 6 minutes
    start: new Date("2025-06-27T11:00:00"),
    end: new Date("2025-06-27T11:06:00"),
  },
  {
    pid: "789",
    desc: "Cron job Z",
    status: "ERROR",
    duration: 700, // 11.6 minutes
    start: new Date("2025-06-27T12:00:00"),
    end: new Date("2025-06-27T12:11:40"),
  },
];

describe("EvaluatedList Component", () => {
  beforeEach(() => {
    //clean DOM state
    document.body.innerHTML = "";
  });

  it("filters out logs with status OK", () => {
    render(<EvaluatedList finalList={mockLogs} />);
    expect(screen.queryByText(/Background job X/)).not.toBeInTheDocument();
  });

  it("renders logs with status WARNING or ERROR", () => {
    render(<EvaluatedList finalList={mockLogs} />);
    expect(screen.getByText(/Scheduled task A/)).toBeInTheDocument();
    expect(screen.getByText(/Cron job Z/)).toBeInTheDocument();
  });

  it("displays the correct formatted duration", () => {
    render(<EvaluatedList finalList={mockLogs} />);
    expect(screen.getByText(/6 minutes/i)).toBeInTheDocument();
    expect(screen.getByText(/12 minutes/i)).toBeInTheDocument();
  });

  it("renders PID and Description correctly", () => {
    render(<EvaluatedList finalList={mockLogs} />);
    expect(screen.getByText(/PID : 456/i)).toBeInTheDocument();
    expect(screen.getByText(/PID : 789/i)).toBeInTheDocument();
  });

  it("renders Alert labels correctly", () => {
    render(<EvaluatedList finalList={mockLogs} />);
    expect(screen.getByText(/Alert: WARNING/i)).toBeInTheDocument();
    expect(screen.getByText(/Alert: ERROR/i)).toBeInTheDocument();
  });
});
