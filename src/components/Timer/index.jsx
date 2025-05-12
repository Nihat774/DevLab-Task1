import { useEffect, useState } from "react";
import "./timer.css";
function Timer({ selectedService, setSelectedTime }) {
  const [isActiveId, setIsActiveId] = useState(null);
  const [isActive, setIsActive] = useState(false);
  let clickedTime;
  const handleClick = (item) => {
    setIsActiveId(item.id);
    setIsActive((prev) => !prev);
    setSelectedTime(item);
    clickedTime = selectedService?.leasure.find((item) => item.id == item.id);
  };

  return (
    <div className="timer-box">
      {selectedService?.leasure?.map((item) => {
        return (
          <div
            className={`timer ${
              isActiveId == item.id && isActive ? "done" : "old"
            }`}
            onClick={() => handleClick(item)}
            key={item.id}
          >
            <span>
              {item.start} - {item.end}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default Timer;
