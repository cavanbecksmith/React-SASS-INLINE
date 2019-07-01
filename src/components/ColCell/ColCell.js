import React, { Component } from "react";
import ReactDOM from "react-dom";
import './ColCell.scss';

export default class ColCell extends Component {

    render() {
        return (
            <div className="ColCell">
                <div className="ColCell__inner">
                    <img src={this.props.img} />
                    <p>{this.props.para}</p>
                    <a className="ColCell__cta" href={this.props.ctaLink} target="_blank">{this.props.ctaTxt}</a>
                </div>
            </div>
        );
    }

}