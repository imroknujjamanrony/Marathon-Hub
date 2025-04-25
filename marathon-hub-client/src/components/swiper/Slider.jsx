import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const Slider = () => {
  const slides = [
    {
      img: "https://i.ibb.co/GFvys0Z/marathon-1.jpg",
      text: "Join the ultimate challenge.",
    },
    {
      img: "https://i.ibb.co/cx81Kww/marathon-2.jpg",
      text: "Experience the joy of running together.",
    },
    {
      img: "https://i.ibb.co/09mQ2Wz/marathon-3.jpg",
      text: "Push your limits.",
    },
  ];

  return (
    <div className="py-3">
      <Swiper
        spaceBetween={20}
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 3000 }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[545px]">
              <img
                className="w-full h-full object-cover"
                src={slide.img}
                alt={`slide-${index}`}
              />
              {/* Strong overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
              {/* Gradient from bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-20" />
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-[#c3c400] drop-shadow-lg">
                  <Typewriter
                    words={[
                      "Run for Hope: Annual Charity Marathon",
                      "City Lights Half Marathon 2024",
                      "Trail Blazers Ultra Run Challenge",
                    ]}
                    loop={true}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                </h2>
                <p className="text-lg md:text-2xl text-white font-medium py-3 mt-4 drop-shadow-sm">
                  {slide.text}
                </p>
                <Link to="/marathons">
                  <button className="px-4 py-1 border border-white text-white rounded hover:bg-white hover:text-[#EA738D] transition">
                    See marathons
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
