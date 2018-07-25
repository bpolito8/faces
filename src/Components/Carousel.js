import React from 'react';

class Carousel extends React.Component {

constructor() {
  super();


  this.state = {
    images: [
      {
        src: 'https://images.pexels.com/photos/60006/spring-tree-flowers-meadow-60006.jpeg?auto=compress&cs=tinysrgb&h=350',
        display: 'block',
        caption: 'I love flowers'
      },
      {
        src: 'https://www.planwallpaper.com/static/images/colorful-nature-wallpaper.jpg',
        display: 'block',
        caption: 'Perp'
      },
      {
        src: 'https://images.pexels.com/photos/34950/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350',
        display: 'block',
        caption: 'I love rr'
      }
    ],
    slideIndex: 0
  };

  // this.showSlides.bind(this);
  // this.plusSlides.bind(this);
  // this.currentSlide.bind(this);

  this.showSlides(this.state.slideIndex);
}



// Next/previous controls
plusSlides(n) {
  this.showSlides(this.state.slideIndex += n);
}

// Thumbnail image controls
currentSlide(n) {
  this.showSlides(this.state.slideIndex = n);
}

showSlides(n) {
  var i;
  //var slides = document.getElementsByClassName("mySlides");
  //var dots = document.getElementsByClassName("dot");
  if (n > this.state.images.length - 1) {this.state.slideIndex = 0} 
  if (n < 0) {this.state.slideIndex = this.state.images.length - 1}
  for (i = 0; i < this.state.images.length; i++) {
      this.state.images[i].display = 'none'; 
  }
  // for (i = 0; i < dots.length; i++) {
  //     //dots[i].className = dots[i].className.replace(" activedot", "");
  // }
  console.log(this.state.images);
  console.log(this.state.slideIndex);
  //if(this.state.images[this.state.slideIndex]){
  this.state.images[this.state.slideIndex].display = 'block';
  //} 
  //dots[this.slideIndex-1].className += " activedot";
}

  render() {
    var images = this.state.images.map((item, i) => {
      return 
      (<div key={i} style={{display: 'block'}} className="fade">
        <div className="numbertext">{i} / {this.state.images.length}</div>
        <img src={item.src} style={{width: '100%'}} />
        <div className="text">{item.caption}</div>
      </div>)
    });
    return (
      <div className="Carousel">
        {/* <!-- Slideshow container --> */}
        <div className="slideshow-container">

          {/* <!-- Full-width images with number and caption text --> */}
          {images}

          {/* <!-- Next and previous buttons --> */}
          <a className="prev" onClick={this.plusSlides(-1)}>&#10094;</a>
          <a className="next" onClick={this.plusSlides(1)}>&#10095;</a>
        </div>
        <br/>

          {/* <!-- The dots/circles --> */}
          <div style={{textAlign: 'center'}}>
            <span className="dot" onClick={this.currentSlide(1)}></span>
            <span className="dot" onClick={this.currentSlide(2)}></span>
            <span className="dot" onClick={this.currentSlide(3)}></span>
          </div>
      </div>
        );
  }
}

export default Carousel;
