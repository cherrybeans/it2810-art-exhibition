import React, { Component } from "react";
import "./App.css";
import TabBar from './components/tab-bar/TabBar';

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

  clearArtworks = () => {
    // Run this function on generating a new set of artworks.
    this.setState({
      artworks: {
        1: { svg: null, poem: null, sound: null },
        2: { svg: null, poem: null, sound: null },
        3: { svg: null, poem: null, sound: null },
        4: { svg: null, poem: null, sound: null }
      }
    });
  };

  itemHasBeenUsed = (selfId, type, checkRefId) => {
    let isUsed = true;
    Object.keys(this.state.artworks).forEach(artworkId => {
      if (!artworkId === selfId) {
        if (this.state.artworks[artworkId][type] === checkRefId) {
        }
      }
    });

    return isUsed;
  };

  setItemRef = (artworkId, type, initialId) => {
    let ref = initialId;
    let count = 0;

    // Check if the item has already been used in another artwork
    while (!this.itemHasBeenUsed(artworkId, type, initialId) && count < 50) {
      ref = this.getRandomInteger(0, 3);

      // Prevent infinite loops
      count++;
      if (count === 100) {
        console.log("Too many iterations");
      }
    }
    return ref;
  };

  generateRandomArtwork = (id, svgCategory, poemCategory, soundCategory) => {
    let svgId = this.setItemRef(id, "svg", this.getRandomInteger(0, 3));
    let poemId = this.setItemRef(id, "poem", this.getRandomInteger(0, 3));
    let soundId = this.setItemRef(id, "sound", this.getRandomInteger(0, 3));

    if (!this.state.svg[svgCategory][svgId]) {
      this.fetchSvg(svgCategory, `${svgId + 1}.svg`);
    }
    if (!this.state.poem[poemCategory][poemId]) {
      this.fetchPoems(poemCategory);
    }

    this.setState(state => ({
      artworks: {
        ...this.state.artworks,
        [id]: {
          svg: svgId,
          poem: poemId,
          sound: soundId
        }
      }
    }));
  };

  componentDidMount() {
    const { choices } = this.state;
    this.generateRandomArtwork(1, choices.svg, choices.poem, choices.sound);
  }

  render() {
    const { poem, svg, artworks, choices } = this.state;
    return (
      <div className="App-wrapper">
        <header className="App-header">
          <h1 className="App-title">Random art generator</h1>
        </header>
        <div className="App-intro">
          <p>
            This is an artwork generator that lets you select different
            categories for sound, image and poem, and this page generates a
            piece of art based on your choices.
          </p>

          <p>
            To get started: <br />
            Step 1: Choose categories <br />
            Step 2: Press the "Show me my artworks!"-button
          </p>
        </div>

        <div className="App-categories">Categories</div>

        <div className="App-show-button">Show me my artworks!</div>

        <div className="App-tabs"> <TabBar/> </div>
        <div className="App-art">
          <div
            className="App-artwork-media"
            dangerouslySetInnerHTML={{
              __html: svg[choices.svg][artworks[1].svg]
            }}
          />

          <div className="App-artwork-poem">
            <pre>{poem[choices.poem][artworks[1].poem]}</pre>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
