import { useState } from "react";
import { formatTime } from "../../helper/formatTime";
const EvaluatedList = ({ finalList }: { finalList: GroupedTask[] }) => {
  const itemHeight = 100;
  const height = 600;
  const [indices, setIndices] = useState<number[]>([
    0,
    Math.floor(height / itemHeight),
  ]);
  const visibleList = finalList.slice(indices[0], indices[1] + 1);

  const handleOnScroll = (e) => {
    const { scrollTop } = e.target;
    const newStartIndex = Math.floor(scrollTop / itemHeight);
    const newEndIndex = newStartIndex + Math.floor(height / itemHeight);
    setIndices([newStartIndex, newEndIndex]);
  };
  // console.log(finalList[0]?.desc);
  return (
    <div className="container">
      <div className="list-container">
        <div style={{ height: finalList?.length * itemHeight }}>
          {finalList?.map((item, idx) => (
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
              <p>Task Id : {item.pid}</p> <p>Description : {item.desc}</p>{" "}
              <p>Started at: {item.start ? formatTime(item.start) : "N/A"}</p>
              <p>Ended at: {item.end ? formatTime(item.end) : "N/A"}</p>
              <p>Duration: {item.duration}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EvaluatedList;
