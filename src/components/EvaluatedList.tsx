const EvaluatedList = ({ finalList }) => {
  console.log(finalList[0].desc);
  return (
    <div className="container">
      <div className="list-container">
        <div className="window">
          <div className="list">
            {finalList?.map((item, idx) => (
              <div className="item" key={idx}>
                {item.desc}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluatedList;
