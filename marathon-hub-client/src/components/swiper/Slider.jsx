import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const Slider = () => {
  return (
    <div className="py-3">
      <Swiper
        spaceBetween={20}
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 2000 }}
      >
        {/* First Slide */}
        <SwiperSlide>
          <div className="relative w-full h-[500px]">
            <img
              className="w-full h-full object-cover"
              src="https://i.ibb.co/GFvys0Z/marathon-1.jpg"
              alt="Beautiful Landscape"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
              <h2 className="text-5xl font-bold">
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
              <p className="text-2xl font-medium">
                Join the ultimate challenge.
              </p>
              <Link to={"/marathons"}>
                <button className="btn btn-sm bg-[#0078D4] btn-outline text-white hover:bg-red-600">
                  See Marathons
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* Second Slide */}
        <SwiperSlide>
          <div className="relative w-full h-[500px]">
            <img
              className="w-full h-full object-cover"
              src="https://i.ibb.co/cx81Kww/marathon-2.jpg"
              alt="Peaceful Forest"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
              <h2 className="text-5xl font-bold">
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
              <p className="text-2xl font-medium">
                Experience the joy of running together.
              </p>
              <Link to={"/marathons"}>
                <button className="btn btn-sm bg-[#0078D4] btn-outline text-white hover:bg-red-600">
                  See Marathons
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* Third Slide */}
        <SwiperSlide>
          <div className="relative w-full h-[500px]">
            <img
              className="w-full h-full object-cover"
              src="https://i.ibb.co/09mQ2Wz/marathon-3.jpg"
              alt="Another Scene"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
              <h2 className="text-5xl font-bold">
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
              <p className="text-2xl font-medium">Push your limits.</p>
              <Link to={"/marathons"}>
                <button className="btn btn-sm bg-[#0078D4] btn-outline text-white hover:bg-red-600">
                  See Marathons
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
