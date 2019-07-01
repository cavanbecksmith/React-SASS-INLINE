import React, {Component} from "react";
import ReactDOM from "react-dom";
import Navigation from './components/Navigation/Navigation';
import SlideShowBanner from './components/SlideshowBanner/SlideShowBanner';
import Container from './components/Container/Container';
import ColCell from './components/ColCell/ColCell';
import ArticleContent from './components/ArticleContent/ArticleContent';
import $ from 'jquery';
import Style from './index.scss';
window.$ = $;

const placeholder = require('assets/ColPlaceholder.jpg');
const img1 = require('assets/logo.jpg');

const car = require('assets/car.jpg');
const turbine = require('assets/tubine.jpg');


class App extends Component {

  render() {
    return (
      <div>
        <Navigation></Navigation>
        <main>
          <Container>
            <ColCell 
              img={placeholder} 
              para="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet varius sapien. " 
              ctaTxt="Discover more" 
              ctaLink="http://google.com"></ColCell>
            <ColCell
              img={placeholder}
              para="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet varius sapien. " 
              ctaTxt="Discover more"
              ctaLink="http://google.com"></ColCell>
            <ColCell
              img={placeholder}
              para="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet varius sapien. " 
              ctaTxt="Discover more"
              ctaLink="http://google.com"></ColCell>
          </Container>
          <SlideShowBanner></SlideShowBanner>
          <Container>
            <ArticleContent
              header="Aeronautics"
              para="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet varius sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu rhoncus nisl. Mauris vitae ullamcorper erat. Sed at diam elementum dolor dictum euismod nec in ante."
              img={turbine}
              ctaTxt="Discover more"
              ctaLink="http://google.com"
              position="left"></ArticleContent>
            <ArticleContent
              header="Automation"
              para="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet varius sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu rhoncus nisl. Mauris vitae ullamcorper erat. Sed at diam elementum dolor dictum euismod nec in ante."
              ctaTxt="Discover more"
              img={car}
              ctaLink="http://google.com"
              position="right"></ArticleContent>
          </Container>
        </main>
      </div>
    );
  }
}



ReactDOM.render(
  <App />,
  document.getElementById('root')
);
