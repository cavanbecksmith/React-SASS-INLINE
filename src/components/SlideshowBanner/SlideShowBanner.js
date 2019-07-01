import React, {Component} from "react";
import ReactDOM from "react-dom";
import "./SlideShowBanner.scss";

export default class SlideShowBanner extends Component{

    constructor(props){
        super(props);
        this.loaded = false;
        this.timerID = null;
        this.previousIndex = null;
        this.state = {
            slideIndex: 0,
            content: [
                {
                    img: require('assets/slideshow/img_01.jpg'),
                    header: `Test`,
                    para: 'Test'
                },
                {
                    img: require('assets/slideshow/img_02.jpg'),
                    header: `Test`,
                    para: `Test`
                },
                {
                    img: require('assets/slideshow/img_03.jpg'),
                    header: `Test`,
                    para: 'Test'
                }
            ],
            displayContent: []
        };
        this.nextSlide = this.nextSlide.bind(this);
        this.previousSlide = this.previousSlide.bind(this);
    }

    componentDidMount() {
        if(!this.loaded){
            this.loaded = true;
        }
        this.timeOut();
    }


    timeOut(){
        this.timerID = setTimeout(() => {
            this.nextSlide();
        }, 5000);
    }

    nextSlide(){
        clearTimeout(this.timerID);
        this.previousIndex = this.state.slideIndex;
        if(this.state.slideIndex === this.state.content.length - 1){
            this.setState({
                slideIndex: 0
            });
        }
        else{
            this.setState({
                slideIndex: this.state.slideIndex + 1
            });
        }
        this.timeOut();
    }

    previousSlide() {
        clearTimeout(this.timerID);
        this.previousIndex = this.state.slideIndex;
        if (this.state.slideIndex === 0) {
            this.setState({
                slideIndex: this.state.content.length - 1
            });
        }
        else {
            this.setState({
                slideIndex: this.state.slideIndex - 1
            });
        }
        this.timeOut();
    }

    render(){

        const SlideShowSlide = ({ header, para, active, image, zIndex, previous }) => {

            return (
                <div
                    className={`SlideShowBanner ${active ? '' : (previous ? '' : 'hidden')}`} style={{ zIndex: zIndex }}>
                    <div className={`SlideShowBanner__backgroundIMG ${active ? 'inAnim' : 'outAnim'}`} style={{ backgroundImage: `url(${previous ? '' : image})`, backgroundSize: 'cover' }}></div>
                    <div className="SlideShowBanner__container">

                        <div className="SlideShowBanner__container__content">
                            <div className={`SlideShowBanner__container__content__text ${active ? 'inAnim' : 'outAnim'}`}>
                                <div className="header">{`${header}`}</div>
                                <div className="footnote">{`${para}`}</div>
                            </div>
                        </div>

                    </div>
                </div>
            )
        };

        return(
            <div className="SlideShowWrapper __slide">


                {this.props.children}
                {this.state.content.map((v,i)=>{

                    let active = i === this.state.slideIndex ? true : false;
                    // let zi = `${!this.loaded ? (i !== this.state.slideIndex ? -1 : 1) : (i !== this.state.slideIndex ? 1 : 0)}`;
                    let activeHidden = null;
                    let previousIndex = this.previousIndex === i ? true : false;

                    return(
                        <SlideShowSlide active={active} previous={previousIndex} header={v['header']} para={v['para']} image={v['img']} zIndex={1} key={i}/>
                    );
                })}
            </div>
        )
    }

}
