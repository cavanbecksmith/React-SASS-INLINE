import React, { Component } from "react";
import ReactDOM from "react-dom";
import './ArticleContent.scss';

export default class ArticleContent extends Component {


    checkPosition(){
        if(this.props.position === 'right'){

            return (
                <div className="ArticleContent__inner">
                    <div className="ArticleContent__text ArticleContent__left">
                        <h3>{this.props.header}</h3>
                        <p>{this.props.para}</p>
                        <a href={this.props.ctaLink} target="_blank">{this.props.ctaTxt}</a>
                    </div>
                    <div className="ArticleContent__img"><img src={this.props.img} /></div>
                </div>
            );

        } else {
            return (
                <div className="ArticleContent__inner">
                    <div className="ArticleContent__img ArticleContent__left"><img src={this.props.img} /></div>
                    <div className="ArticleContent__text">
                        <h3>{this.props.header}</h3>
                        <p>{this.props.para}</p>
                        <a href={this.props.ctaLink} target="_blank">{this.props.ctaTxt}</a>
                    </div>
                </div>
            );
        }
    }


    render() {
        return (
            <div className="ArticleContent">
                {this.checkPosition()}
            </div>
        );
    }

}