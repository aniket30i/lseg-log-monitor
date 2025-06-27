import { useMemo, useState } from "react";
import { formatTime } from "../../helper/formatTime";
import Legend from "./Legend";
const EvaluatedList = ({ finalList }: { finalList: GroupedTask[] }) => {
  const itemHeight = 100;
  const height = 600;
  const [indices, setIndices] = useState<number[]>([
    0,
    Math.floor(height / itemHeight),
  ]);

  const filteredList = useMemo(
    () =>
      finalList.filter(
        (item) => item.status === "WARNING" || item.status === "ERROR"
      ),
    [finalList]
  );
  const visibleList = filteredList.slice(indices[0], indices[1] + 1);

  const handleOnScroll = (e) => {
    const { scrollTop } = e.target;
    const newStartIndex = Math.floor(scrollTop / itemHeight);
    const newEndIndex = newStartIndex + Math.floor(height / itemHeight);
    setIndices([newStartIndex, newEndIndex]);
  };

  // console.log(finalList[0]?.desc);
  return (
    <div className="container">
      <div className="list-container" onScroll={handleOnScroll}>
        <div style={{ height: filteredList.length * itemHeight }}>
          {visibleList?.map((item, idx) => (
            <div
              className="item"
              key={idx}
              style={{
                height: itemHeight,
                backgroundColor:
                  item.status === "OK"
                    ? "#6cbe6c"
                    : item.status === "WARNING"
                    ? "#cab631"
                    : "#ca844a",
                position: "absolute",
                width: "100%",
                top: (indices[0] + idx) * itemHeight,
                borderTop: "5px solid black",
              }}
            >
              <p>PID : {item.pid}</p> <p>Description : {item.desc}</p>{" "}
              <p>Started at: {item.start ? formatTime(item.start) : "N/A"}</p>
              <p>Ended at: {item.end ? formatTime(item.end) : "N/A"}</p>
              <p>Duration: {`${Math.round(item.duration / 60)} minutes`}</p>
              <p>Alert: {item.status}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Legend />
      </div>
    </div>
  );
};

export default EvaluatedList;
