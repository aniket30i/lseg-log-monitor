import { render, screen } from "@testing-library/react";
import EvaluatedList from "../components/EvaluatedList";

const mockList = [
  {
    pid: "123",
    desc: "Example task",
    status: "WARNING",
    duration: 400,
    start: new Date("2025-06-27T11:10:00"),
    end: new Date("2025-06-27T11:16:40"),
  },
];

describe("EvaluatedList", () => {
  it("renders warning task", () => {
    render(<EvaluatedList finalList={mockList} />);
    expect(screen.getByText(/task id : 123/i)).toBeInTheDocument();
    expect(screen.getByText(/example task/i)).toBeInTheDocument();
  });
});
