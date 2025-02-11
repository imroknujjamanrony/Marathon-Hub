import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaStar, FaStarHalfAlt, FaQuoteLeft } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    rating: 5,
    review:
      "The Marathon Hub event was truly incredible! Well organized and an unforgettable experience.",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    rating: 4.5,
    review:
      "Loved the energy and the support from the community. Will definitely join next year!",
  },
  {
    id: 3,
    name: "Michael Brown",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    rating: 4,
    review:
      "Great event! The hydration points were well placed, and the track was amazing.",
  },
];

const ReviewSection = () => {
  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          What Runners Say
        </h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop
          className="pb-8"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="bg-white p-6 shadow-lg rounded-xl flex flex-col items-center text-center relative">
                <FaQuoteLeft className="text-5xl text-blue-500 absolute -top-6 left-6 opacity-20" />
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-20 h-20 rounded-full border-4 border-blue-500 shadow-md mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900">
                  {review.name}
                </h3>
                <div className="flex justify-center gap-1 text-yellow-400 my-2">
                  {[...Array(Math.floor(review.rating))].map((_, index) => (
                    <FaStar key={index} />
                  ))}
                  {review.rating % 1 !== 0 && <FaStarHalfAlt />}
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {review.review}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ReviewSection;
