import React, { Component } from "react";
import "./App.css";
import PlayButton from "./components/playButton/PlayButton";
import TabBar from "./components/tabBar/TabBar";

// Filene skal lastes kun hvis de benyttes. Dvs. at filer brukt i en
// kombinasjon først lastes når denne kombinasjonen vises (eksempelvis
// når en bruker velger denne tabben).

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      error: null,
      currentTab: 1,

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
          "/media/sound/nature/1.mp3",
          "/media/sound/nature/2.mp3",
          "/media/sound/nature/3.mp3",
          "/media/sound/nature/4.mp3"
        ],
        romance: [
          "/media/sound/romance/1.mp3",
          "/media/sound/romance/2.mp3",
          "/media/sound/romance/3.mp3",
          "/media/sound/romance/4.mp3"
        ],
        scary: [
          "/media/sound/scary/1.mp3",
          "/media/sound/scary/2.mp3",
          "/media/sound/scary/3.mp3",
          "/media/sound/scary/4.mp3"
        ]
      },
      // The selected categories for each type of media
      choices: {
        sound: "nature",
        svg: "nature",
        poem: "nature"
      },

      artworks: {
        // Tab 1, 2, 3, 4. Reference to the elements
        1: { svg: null, poem: null, sound: null },
        2: { svg: null, poem: null, sound: null },
        3: { svg: null, poem: null, sound: null },
        4: { svg: null, poem: null, sound: null }
      }
    };
  }

  updateCurrentTab = tabNumber => {
    this.setState({ currentTab: tabNumber });
    const { artworks, choices } = this.state;
    if (artworks[tabNumber].svg === null) {
      this.generateRandomArtwork(
        tabNumber,
        choices.svg,
        choices.poem,
        choices.sound
      );
    }
    document.getElementById("Music-player").load();
  };

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
    // Returns a random number between min and max (inclusive)
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
    const { artworks } = this.state;
    let isUsed = false;

    Object.keys(artworks).forEach(id => {
      let intId = parseInt(id);
      if (!(intId === selfId)) {
        if (artworks[intId][type] === checkRefId) {
          isUsed = true;
        }
      }
    });

    return isUsed;
  };

  setItemRef = (artworkId, type, initialId) => {
    let ref = initialId;
    let count = 0;

    // Check if the item has already been used in another artwork
    while (this.itemHasBeenUsed(artworkId, type, ref) && count < 50) {
      ref = this.getRandomInteger(0, 3);

      // Prevent infinite loops
      count++;
      if (count === 50) {
        console.log("Too many iterations");
      }
    }
    return ref;
  };

  generateRandomArtwork = (
    tabNumber,
    svgCategory,
    poemCategory,
    soundCategory
  ) => {
    //Generate and fetch (if needed) items for an artwork.
    let svgId = this.setItemRef(tabNumber, "svg", this.getRandomInteger(0, 3));
    let poemId = this.setItemRef(
      tabNumber,
      "poem",
      this.getRandomInteger(0, 3)
    );
    let soundId = this.setItemRef(
      tabNumber,
      "sound",
      this.getRandomInteger(0, 3)
    );

    if (!this.state.svg[svgCategory][svgId]) {
      this.fetchSvg(svgCategory, `${svgId + 1}.svg`);
    }
    if (!this.state.poem[poemCategory][poemId]) {
      this.fetchPoems(poemCategory);
    }

    this.setState(
      state => ({
        artworks: {
          ...state.artworks,
          [tabNumber]: {
            svg: svgId,
            poem: poemId,
            sound: soundId
          }
        }
      }),
      () => console.log(this.state.artworks)
    );
  };

  componentDidMount() {
    const { choices } = this.state;
    this.generateRandomArtwork(1, choices.svg, choices.poem, choices.sound);
  }

  render() {
    const { poem, svg, sound, artworks, choices, currentTab } = this.state;
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

        <div className="App-tabs">
          <TabBar
            updateCurrentTab={this.updateCurrentTab}
            currentTab={this.state.currentTab}
          />
        </div>
        <div className="App-art">
          <div
            className="App-artwork-media"
            dangerouslySetInnerHTML={{
              __html: svg[choices.svg][artworks[currentTab].svg]
            }}
          />

          <div className="App-artwork-poem">
            <pre>{poem[choices.poem][artworks[currentTab].poem]}</pre>
          </div>
          <div className="App-artwork-music">
            <PlayButton src={sound[choices.sound][artworks[currentTab].sound]} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
