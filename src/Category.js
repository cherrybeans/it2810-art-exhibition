import React, { Component } from 'react';

class Category extends React.Component {
    render (){
        return(
            <button onClick={()=> this.props.clickFunction(this.props.type)}>{this.props.type}</button>
        );
    }
}

export default Category;