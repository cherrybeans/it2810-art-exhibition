# Gruppe 1 Webutvikling - Prosjekt 2
> it2810-webutvikling-h18-prosjekt-2-gruppe--01

# Project structure

The project can be divided into four main parts: Media-content, App.js,  containers  and components.

The media content inside the public folder is where we store all the poems, svgs and mp3-files. In App.js, the poems and svgs are fetched using the Fetch API with the ES7 AJAX-syntax, async and await. The files are only fetched if they’re going to be used, and are only fetched once and stored for later usage.

App.js is our main React component, which is at the top of the class-hierarchy. All other components are, in some way, a child of App.js. It handles the markup of all the other components in its render function. Through its child component MediaCategories, it updates its state with the most recent category-choices made by the user, which it then displays as 4 different randomly generated art exhibits, which can be browsed by using the TabBar component to navigate. As a part of generating art exhibits it also uses the PlayButton component for playing and controlling the music. 

We’ve split our child components into the folders “components” and “containers”, following the pattern suggested here:  
[Dan Abramov on smart & dumb components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) 

The container-components in this project are tasked with handling the selection of categories for the random art exhibit. They are vertically structured in the following manner, with parents on the left and children to the right:
	
  App.js -> MediaCategories.js -> CategoryContainer.js

MediaCategories.js’ main concerns are whether the “Show me my artworks” should be disabled/enabled and which of the categories are selected for every media type (svg, poem, sound). When the “Show me my artworks” button is clicked it passes its state to the parent, App.js. In addition to the button, MediaCategories consists of three CategoryContainer components, where each represents a media type. The main concern of the CategoryContainer component is keeping track of which category is selected: nature, romance or scary. It keeps track of this state and passes it to its parent, MediaCategories, whenever a new category is selected. 

The components TabBar and PlayButton are used directly in App.js. The TabBar lets the user switch between 4 generated artworks by clicking the numbers or the arrows in the tab-bar. The play button simply autoplay the sound which it generated for the currently selected artwork. 


# Components & Containers

Component classes in our project are divided into the categories: Components and Containers, with the exception of our main App.js-file. 
* Components without state, which are only presentational in nature are classified as ‘Components’ and are located in the ./src/components folder.
* Components who keep track of state, which are ‘smart’, are classified as ‘Containers’ and are located in the ./src/containers folder
* Our main React Component is App.js, which is located directly in ./src. 


# Functional Requirements

The functional requirements for the website are relatively simple. As the main purpose of it is to generate random artworks based on user input. 
When the user first loads the website, the website generates a random art exhibit. The user can generate new art exhibits by selecting the desired categories and clicking the “Show me my artworks!” button. 
The website generates 4 artworks for each art exhibit, where each artwork consists of an svg file, a poem from a JSON object and an mp3 file for sound. The user can look at each artwork separately by interacting with the tab-bar. 


# Technical Requirements

### React:
The project is based on React-components, using ES6 syntax. Only ordinary mechanisms in react were allowed, so no external libraries are used. For this project we made all components completely from scratch, without the use of third-party components.
### AJAX:
We have used the Fetch API with async/await that comes with ES7 to handle asynchronous fetching. The photos and poems are loaded dynamically only when they are needed, and then saved in the client. This way we avoid unnecessary storing of data. A placeholder-svg is used to avoid elements jumping around while the website waits for the fetch to complete. 
### Responsive web design:
The web page is dynamic and responsive, and will adjust to different screen sizes and orientations. This is accomplished mainly by the use of flexbox, grid and media queries. 

The responsiveness of our website is handled through App.css. This is where we define our CSS Grid and CSS Flexboxes along with general styling. The file is structured with sections marked by  /* Comments */. 

Check the other .css files for more of the detailed styling and positioning of specific components and containers.
### GIT & General code structure:
We have used the project board in git to organise the issues. The issues have been assigned to a person, and moved to in progress when started then to done when task completed. The commits have been connected to its corresponding issue. 
### Node.js & NPM:
We used create-react-app to create the project, and then used npm install + npm start to run the project in browser. 


# Testing

In this project we have employed a manual systematic testing scheme:
* The website has been tested on multiple browsers: Google Chrome, Mozilla Firefox and Safari.
* The website has been tested on different screen sizes: Mobile (down to 360x640), Laptop and Desktop monitors of various sizes. 
* A test consists of opening the website, generating artworks, clicking on all clickable items, generating new artworks and resizing the browser window. 
