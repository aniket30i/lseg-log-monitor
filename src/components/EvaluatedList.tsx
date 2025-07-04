import { useMemo, useState } from "react";
import { formatTime } from "../../helper/formatTime";
import Legend from "./Legend";
import type { GroupedTask } from "../../utils/logTypes";
const EvaluatedList = ({ finalList }: { finalList: GroupedTask[] }) => {
  const itemHeight = 100;
  const height = 600;

  // itemheight and height are in pixels , and can be dynamic if required and can be passed down as props
  const [indices, setIndices] = useState<number[]>([
    0,
    Math.floor(height / itemHeight),
  ]);

  const filteredList = useMemo(
    () =>
      finalList.filter(
        (item) => item.status === "WARNING" || item.status === "ERROR" // remove the ok tasks from the list to render
      ),
    [finalList]
  );

  // adding caching just in case the list is too long
  const visibleList = filteredList.slice(indices[0], indices[1] + 1);

  const handleOnScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget;
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
