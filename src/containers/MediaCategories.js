import React, { Component } from "react";
import CategoriesContainer from "./CategoriesContainer";
import "./MediaCategories.css";

class MediaCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      svg: null,
      poem: null,
      sound: null
    };
  }

  updateChoices = () => {
    this.props.updateChoices({
      svg: this.state.svg,
      poem: this.state.poem,
      sound: this.state.sound
    });
  };

  updateLocalChoices = (mediaType, category) => {
    this.setState(state => ({
      [mediaType]: state[mediaType] === category ? null : category
    }));
  };

  isButtonDisabled = () => {
    const { svg, poem, sound } = this.state;

    if (svg !== null && poem !== null && sound !== null) {
      return false;
    }
    return true;
  };

  render() {
    return (
      <div className="MediaCategories-wrapper">
        <div className="MediaCategories-categoryset-wrapper">
          <span>Picture</span>
          <span>Poem</span>
          <span>Music</span>

          <CategoriesContainer
            mediaType="svg"
            updateLocalChoices={this.updateLocalChoices}
          />
          <CategoriesContainer
            mediaType="poem"
            updateLocalChoices={this.updateLocalChoices}
          />
          <CategoriesContainer
            mediaType="sound"
            updateLocalChoices={this.updateLocalChoices}
          />
        </div>

        <button
          className={
            "MediaCategories-button" +
            (this.isButtonDisabled() ? " " : " MediaCategories-enabled")
          }
          onClick={() => this.updateChoices()}
          disabled={this.isButtonDisabled()}
        >
          Show me my artworks!
        </button>
      </div>
    );
  }
}

export default MediaCategories;
