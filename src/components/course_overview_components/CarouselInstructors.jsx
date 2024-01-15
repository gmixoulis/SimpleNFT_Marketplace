import Punk from "../../assets/instructors/punk6529.jpg"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    centerMode: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  }

  return (
    <div>
      <Slider {...settings}>
        <div className="text-center ">
          <img src={Punk} alt="img" className="w-[16rem] mx-auto rounded-2xl" />
          <p className="pt-2 font-light text-textgray">PUNK6529</p>
        </div>
        <div className="text-center ">
          <img src={Punk} alt="img" className="w-[16rem] mx-auto rounded-2xl" />
          <p className="pt-2 font-light text-textgray">PUNK6529</p>
        </div>
        <div className="text-center ">
          <img src={Punk} alt="img" className="w-[16rem] mx-auto rounded-2xl" />
          <p className="pt-2 font-light text-textgray">PUNK6529</p>
        </div>
        <div className="text-center ">
          <img src={Punk} alt="img" className="w-[16rem] mx-auto rounded-2xl" />
          <p className="pt-2 font-light text-textgray">PUNK6529</p>
        </div>
      </Slider>
    </div>
  )
}

export default Carousel
