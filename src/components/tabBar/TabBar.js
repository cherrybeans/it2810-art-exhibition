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

  const generateClassName = tab => {
    return "TabBar-number" + (currentTab === tab ? " TabBar-selectedTab" : " ");
  };

  return (
    <div className="TabBar-wrapper">
      <div className="TabBar-arrow-wrapper">
        <i
          onClick={() => decreaseTab()}
          className="TabBar-icon fas fa-angle-left"
        />
      </div>
      <div className="TabBar-number-wrapper">
        <button
          onClick={() => updateCurrentTab(1)}
          className={generateClassName(1)}
          id="button-1"
        >
          1
        </button>
        <button
          onClick={() => updateCurrentTab(2)}
          className={generateClassName(2)}
          id="button-2"
        >
          2
        </button>
        <button
          onClick={() => updateCurrentTab(3)}
          className={generateClassName(3)}
          id="button-3"
        >
          3
        </button>
        <button
          onClick={() => updateCurrentTab(4)}
          className={generateClassName(4)}
          id="button-4"
        >
          4
        </button>
      </div>
      <div className="TabBar-arrow-wrapper">
        <i
          onClick={() => increaseTab()}
          className="TabBar-icon fas fa-angle-right"
        />
      </div>
    </div>
  );
};

export default TabBar;
