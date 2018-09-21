import React, { Component } from 'react';
import "./CategoryCollection.css";

class CategoryCollection extends Component {
    constructor(props){
        super(props);
        this.state = {
            nature: false,
            romance: false,
            scary: false,
        };
        this.categorySelected = this.categorySelected.bind(this);
    }

    categorySelected(category){
        /* Toggle state by which category was clicked, only one can be selected at a time */
        switch (category){
            case "nature":
                this.setState((state) => ({
                    nature: !state.nature,
                    romance: false,
                    scary: false
                }), this.props.updateLocalChoices(this.props.mediaType, "nature"));
                break;

            case "romance":
                this.setState((state) => ({
                    romance: !state.romance,
                    nature: false,
                    scary: false
                }), this.props.updateLocalChoices(this.props.mediaType, "romance"));
                break;

            case "scary":
                this.setState((state) => ({
                    scary: !state.scary,
                    romance: false,
                    nature: false
                }), this.props.updateLocalChoices(this.props.mediaType, "scary"));
                break;

            default:
                break;
        }
    }

    render() {
        return (
            <div className='CategoryCollection-categoryButtonContainer'>
                <button className='CategoryCollection-categoryButton' onClick={() => this.categorySelected("nature")}>nature</button>
                <button className='CategoryCollection-categoryButton' onClick={() => this.categorySelected("romance")}>romance</button>
                <button className='CategoryCollection-categoryButton' onClick={() => this.categorySelected("scary")}>scary</button>
            </div>
        );
    }
}


export default CategoryCollection;