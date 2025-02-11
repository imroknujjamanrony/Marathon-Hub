import { Helmet } from "react-helmet-async";
import Slider from "../components/swiper/Slider";
import RunningMarathon from "../components/RunningMarathon";
import UpcomingMarathons from "../components/UpcomingMarathons";
import Legacy from "../components/Legacy";
import AboutMarathon from "../components/AboutMarathon";
import ReviewSection from "../components/ReviewSection";

const Home = () => {
  return (
    <div className="bg-[#F0F4F8] text-[#1C1C1C]">
      <Helmet>
        <title>Marathon Hub</title>
      </Helmet>
      <Slider></Slider>
      <section className="bg-gray-100 text-white py-12">
        <AboutMarathon></AboutMarathon>
        <Legacy></Legacy>
        <RunningMarathon></RunningMarathon>
        <UpcomingMarathons></UpcomingMarathons>
        <ReviewSection></ReviewSection>
      </section>
    </div>
  );
};

export default Home;
