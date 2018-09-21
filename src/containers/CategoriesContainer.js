import React, { Component } from "react";
import "./CategoriesContainer.css";

class CategoriesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nature: false,
      romance: false,
      scary: false
    };
  }

  isButtonSelected = category => {
    return this.state[category];
  };

  categorySelected = category => {
    /* Toggle state by which category was clicked, only one can be selected at a time */
    switch (category) {
      case "nature":
        this.setState(
          state => ({
            nature: !state.nature,
            romance: false,
            scary: false,
            selectedButton: "nature"
          }),
          this.props.updateLocalChoices(this.props.mediaType, "nature")
        );
        break;

      case "romance":
        this.setState(
          state => ({
            romance: !state.romance,
            nature: false,
            scary: false,
            selectedButton: "romance"
          }),
          this.props.updateLocalChoices(this.props.mediaType, "romance")
        );
        break;

      case "scary":
        this.setState(
          state => ({
            scary: !state.scary,
            romance: false,
            nature: false,
            selectedButton: "scary"
          }),
          this.props.updateLocalChoices(this.props.mediaType, "scary")
        );
        break;

      default:
        break;
    }
  };

  generateClassName = category => {
    return (
      "CategoriesContainer-button" +
      (this.isButtonSelected(category)
        ? " CategoriesContainer-selectedButton"
        : "")
    );
  };

  render() {
    return (
      <div className="CategoriesContainer-wrapper">
        <button
          className={this.generateClassName("nature")}
          onClick={() => this.categorySelected("nature")}
        >
          Nature
        </button>
        <button
          className={this.generateClassName("romance")}
          onClick={() => this.categorySelected("romance")}
        >
          Romance
        </button>
        <button
          className={this.generateClassName("scary")}
          onClick={() => this.categorySelected("scary")}
        >
          Scary
        </button>
      </div>
    );
  }
}

export default CategoriesContainer;
