import React, { Component } from 'react';
import Category from "./Category.js";


class CategoryCollection extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            nature: false,
            romance: false,
            scary: false
        };
        this.categorySelected = this.categorySelected.bind(this);
    }

    categorySelected(type){
        /* Toggle state by which category was clicked, only one can be selected at a time */
        switch (type){
            case "nature":
                this.setState((state, props) => ({
                    nature: !state.nature
                }));
                if (this.state.romance) {
                    this.setState((state, props) => ({
                        romance: !state.romance
                    }));
                } else if (this.state.scary){
                    this.setState((state, props) => ({
                        scary: !state.scary
                    }));
                }
                return;
            case "romance":
                this.setState((state, props) => ({
                    romance: !state.romance
                }));
                if (this.state.nature) {
                    this.setState((state, props) => ({
                        nature: !state.nature
                    }));
                } else if (this.state.scary){
                    this.setState((state, props) => ({
                        scary: !state.scary
                    }));
                }
                return;
            case "scary":
                this.setState((state, props) => ({
                    scary: !state.scary
                }));
                if (this.state.romance) {
                    this.setState((state, props) => ({
                        romance: !state.romance
                    }));
                } else if (this.state.nature){
                    this.setState((state, props) => ({
                        nature: !state.nature
                    }));
                }
                return;
        }
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <Category clickFunction={this.categorySelected} type={"nature"}/>
                <Category clickFunction={this.categorySelected} type={"romance"}/>
                <Category clickFunction={this.categorySelected} type={"scary"}/>
            </div>
        );
    }
}


export default CategoryCollection;