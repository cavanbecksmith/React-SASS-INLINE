import React, { Component } from "react";
import ReactDOM from "react-dom";
import './Container.scss';

// let classes = '';

export default class Container extends Component {

    // componentDidMount(){
    //     if(this.props.classes){
    //         classes = this.props.classes
    //     }
    // }

    render() {
        return (
            <div className="Container">
                <div className="Container__inner">
                    {this.props.children}
                </div>
            </div>
        );
    }

}