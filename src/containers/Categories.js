import React, {Component} from "react";
import CategoryCollection from "./CategoryCollection";


class Categories extends Component {
    constructor(props){
        super(props);

        this.state = {
            svg: null,
            poem: null,
            sound: null,
        }
    }

    updateChoices = () => {
        this.props.updateChoices({
            svg: this.state.svg,
            poem: this.state.poem,
            sound: this.state.sound
        });
    }

    updateLocalChoices = (mediaType, category) => {
        this.setState((state) => ({
            [mediaType]: state[mediaType] === category ? null : category
        }), () => console.log(this.state));
    }

    isButtonDisabled = () =>{
        const {svg, poem, sound} = this.state;

        if (svg !== null && poem !== null && sound !== null) {
            return false;
        }
        return true;

    }

    render () {
        return (
            <div>
                SVG<CategoryCollection mediaType="svg"  updateLocalChoices={this.updateLocalChoices}/>
                POEM<CategoryCollection mediaType="poem" updateLocalChoices={this.updateLocalChoices}/>
                SOUND<CategoryCollection mediaType="sound" updateLocalChoices={this.updateLocalChoices}/>
                <button onClick={() => this.updateChoices()} disabled={this.isButtonDisabled()}>Show the art</button>
            </div>
        );
    }



}

export default Categories;