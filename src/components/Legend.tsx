const Legend = () => {
  return (
    <div className="legend-container">
      <div className="legend-item">
        <span
          style={{ backgroundColor: "#cab631" }}
          className="color-code"
        ></span>
        <p>Warning</p>
      </div>
      <div className="legend-item">
        <span
          className="color-code"
          style={{ backgroundColor: "#ca844a" }}
        ></span>
        <p>Error</p>
      </div>
    </div>
  );
};

export default Legend;
