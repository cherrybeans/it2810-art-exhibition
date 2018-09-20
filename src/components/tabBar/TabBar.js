import React from "react";
import "./TabBar.css";

const TabBar = ({ updateCurrentTab, currentTab }) => {
  const increaseTab = () => {
    if (currentTab < 4) {
      updateCurrentTab(currentTab + 1);
    }
  };

  const decreaseTab = () => {
    if (currentTab > 1) {
      updateCurrentTab(currentTab - 1);
    }
  };

  return (
    <div className="tab-bar-container">
      <div className="arrow-container">
        <i onClick={() => decreaseTab()} className="fas fa-angle-left" />
      </div>
      <div className="tab-number-container">
        <button
          onClick={() => updateCurrentTab(1)}
          className={"tab-number" + (currentTab === 1 ? " tab-focus" : " ")}
          id="button-1"
        >
          1
        </button>
        <button
          onClick={() => updateCurrentTab(2)}
          className={"tab-number" + (currentTab === 2 ? " tab-focus" : " ")}
          id="button-2"
        >
          2
        </button>
        <button
          onClick={() => updateCurrentTab(3)}
          className={"tab-number" + (currentTab === 3 ? " tab-focus" : " ")}
          id="button-3"
        >
          3
        </button>
        <button
          onClick={() => updateCurrentTab(4)}
          className={"tab-number" + (currentTab === 4 ? " tab-focus" : " ")}
          id="button-4"
        >
          4
        </button>
      </div>
      <div className="arrow-container">
        <i onClick={() => increaseTab()} className="fas fa-angle-right" />
      </div>
    </div>
  );
};

export default TabBar;
