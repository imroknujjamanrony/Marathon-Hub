import { Helmet } from "react-helmet-async";
import Slider from "../components/swiper/Slider";
import RunningMarathon from "../components/RunningMarathon";
import UpcomingMarathons from "../components/UpcomingMarathons";
import Legacy from "../components/Legacy";
import AboutMarathon from "../components/AboutMarathon";
import ReviewSection from "../components/ReviewSection";
import Partner from "../components/Partner";
import Stats from "../components/Stats";
import Countdown from "../components/Countdown";
import GeminiUi from "../components/gemini/GeminiUi";

const Home = () => {
  return (
    <div className="bg-[#F0F4F8] text-[#1C1C1C]">
      <Helmet>
        <title>Marathon Hub</title>
      </Helmet>
      <Slider></Slider>
      <section className="bg-gray-100 dark:bg-gray-900 text-white py-12">
        <AboutMarathon></AboutMarathon>
        <Partner></Partner>
        <GeminiUi></GeminiUi>
        <Countdown></Countdown>
        <Stats></Stats>
        <Legacy></Legacy>
        <RunningMarathon></RunningMarathon>
        <UpcomingMarathons></UpcomingMarathons>
        <ReviewSection></ReviewSection>
      </section>
    </div>
  );
};

export default Home;
