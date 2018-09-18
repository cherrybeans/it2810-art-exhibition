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
      poem: {
        nature: [null, null, null, null],
        romance: [null, null, null, null],
        scary: [null, null, null, null]
      },
      // sound only stores the link to the soundtrack
      sound: {
        nature: [
          "http://localhost:3000/media/sound/nature/1.mp3",
          "http://localhost:3000/media/sound/nature/2.mp3",
          "http://localhost:3000/media/sound/nature/3.mp3",
          "http://localhost:3000/media/sound/nature/4.mp3"
        ],
        romance: [
          "http://localhost:3000/media/sound/romance/1.mp3",
          "http://localhost:3000/media/sound/romance/2.mp3",
          "http://localhost:3000/media/sound/romance/3.mp3",
          "http://localhost:3000/media/sound/romance/4.mp3"
        ],
        scary: [
          "http://localhost:3000/media/sound/scary/1.mp3",
          "http://localhost:3000/media/sound/scary/2.mp3",
          "http://localhost:3000/media/sound/scary/3.mp3",
          "http://localhost:3000/media/sound/scary/4.mp3"
        ]
      },

      artworks: {
        // reference to the elements
        1: { svg: null, poem: null, sound: null },
        2: { svg: null, poem: null, sound: null },
        3: { svg: null, poem: null, sound: null },
        4: { svg: null, poem: null, sound: null }
      }
    };
  }

  fetchPoems = async category => {
    try {
      let res = await fetch(
        `http://localhost:3000/media/poem/${category}/${category}.json`
      );

      let poem = await res.json();
      this.setState(state => ({
        poem: {
          ...this.state.poem,
          [category]: [
            poem[`${category}-1`],
            poem[`${category}-2`],
            poem[`${category}-3`],
            poem[`${category}-4`]
          ]
        }
      }));
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
      this.setState(state => ({
        svg: {
          ...this.state.svg,
          [category]: state.svg[category].map((element, index) => {
            if (index === mediaIndex) {
              return svg;
            }
            return element;
          })
        }
      }));
    } catch (e) {
      console.error(e);
    }
  };

  getRandomInteger = (min, max) => {
    // Returns a random number between 1 and 10 (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  generateRandomArtwork = (id, svgCategory, poemCategory, soundCategory) => {
    let svgId = this.getRandomInteger(0, 3);
    let poemId = this.getRandomInteger(0, 3);
    let soundId = this.getRandomInteger(0, 3);

    console.log("svg", this.state.svg[svgCategory][svgId]);
    if (!this.state.svg[svgCategory][svgId]) {
      this.fetchSvg(svgCategory, `${svgId + 1}.svg`);
    }
    if (!this.state.poem[poemCategory][poemId]) {
      this.fetchPoems(poemCategory);
    }

    this.setState(
      state => ({
        artworks: {
          ...this.state.artworks,
          [id]: {
            svg: svgId,
            poem: poemId,
            sound: soundId
          }
        }
      }),
      () => console.log("artworks", this.state.artworks[id])
    );
  };

  componentDidMount() {
    const { choices } = this.state;
    this.generateRandomArtwork(1, choices.svg, choices.poem, choices.sound);
  }

  render() {
    const { poem, svg, sound, artworks, choices } = this.state;
    console.log(poem);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <div
          id="artwork-image"
          dangerouslySetInnerHTML={{
            __html: svg[choices.svg][artworks[1].svg]
          }}
        />
        <div id="artwork-poem">{poem[choices.poem][artworks[1].poem]}</div>
      </div>
    );
  }
}

export default App;
