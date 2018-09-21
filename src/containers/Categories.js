import React, { Component } from "react";
import CategoryCollection from "./CategoryCollection";
import "./Categories.css";

class Categories extends Component {
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
    this.setState(
      state => ({
        [mediaType]: state[mediaType] === category ? null : category
      }),
      () => console.log(this.state)
    );
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
      <div className="Categories-categoryContainer">
        <div className="Categories-categoryCollectionContainer">
          <span>Picture</span>
          <span>Poem</span>
          <span>Music</span>
          <CategoryCollection
            mediaType="svg"
            updateLocalChoices={this.updateLocalChoices}
          />
          <CategoryCollection
            mediaType="poem"
            updateLocalChoices={this.updateLocalChoices}
          />
          <CategoryCollection
            mediaType="sound"
            updateLocalChoices={this.updateLocalChoices}
          />
        </div>
        <button
          className='Categories-button'
          onClick={() => this.updateChoices()}
          disabled={this.isButtonDisabled()}
        >
          Show me my artwork!
        </button>
      </div>
    );
  }
}

export default Categories;
