import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

// Filene skal lastes kun hvis de benyttes. Dvs. at filer brukt i en
// kombinasjon først lastes når denne kombinasjonen vises (eksempelvis
// når en bruker velger denne tabben).

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      error: null,

      choices: {
        sound: "nature",
        svg: "scary",
        poem: "romance"
      },
      // Storing of data. Once fetched, it is stored here.
      svg: {
        nature: [null, null, null, null],
        romance: [null, null, null, null],
        scary: [null, null, null, null]
      },
      sound: {
        nature: [null, null, null, null],
        romance: [null, null, null, null],
        scary: [null, null, null, null]
      },
      poem: {
        nature: [null, null, null, null],
        romance: [null, null, null, null],
        scary: [null, null, null, null]
      },
      currentArtwork: { svg: null, sound: null, poem: null }
    };
  }

  fetchPoems = async category => {
    try {
      let res = await fetch(
        `http://localhost:3000/media/poem/${category}/${category}.json`
      );

      let poem = await res.json();
      this.setState(
        state => ({
          poem: {
            ...this.state.poem,
            [category]: [
              poem[`${category}-1`],
              poem[`${category}-2`],
              poem[`${category}-3`],
              poem[`${category}-4`]
            ]
          }
        }),
        () => console.log("poems", category, this.state.poem[category])
      );
    } catch (e) {
      console.error(e);
    }
  };

  fetchSvg = async (category, fileName) => {
    let mediaIndex = parseInt(fileName[0], 10) - 1;
    try {
      let res = await fetch(
        `http://localhost:3000/media/svg/${category}/${fileName}`
      );

      let svg = await res.text();
      this.setState(
        state => ({
          svg: {
            ...this.state.svg,
            [category]: state.svg[category].map((element, index) => {
              if (index === mediaIndex) {
                return svg;
              }
              return element;
            })
          }
        }),
        () => console.log("svg", category, this.state.svg[category])
      );
    } catch (e) {
      console.error(e);
    }
  };

  getRandomInteger = (min, max) => {
    // Returns a random number between 1 and 10 (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  componentDidMount() {
    const { choices } = this.state;
    this.fetchSvg(choices.svg, `${this.getRandomInteger(1, 4)}.svg`);
    this.fetchPoems(choices.poem);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
