// import Dashboard from "../components/swiper/Dashboard";
import { Helmet } from "react-helmet-async";
import Slider from "../components/swiper/Slider";
import RunningMarathon from "../components/RunningMarathon";
import UpcomingMarathons from "../components/UpcomingMarathons";
import Legacy from "../components/Legacy";
import AboutMarathon from "../components/AboutMarathon";

const Home = () => {
  return (
    <div className="">
      <Helmet>
        <title>Marathon Hub</title>
      </Helmet>
      {/* banner */}
      <Slider></Slider>
      <div className=" grid grid-cols-12">
        {/* left side  */}
        <aside className="col-span-4">{/* <Dashboard></Dashboard> */}</aside>
        {/* right side  */}
        <div className="col-span-8"></div>
      </div>
      <section className="">
        <div className="">
          <div className="py-10">
            <AboutMarathon></AboutMarathon>
          </div>
          <Legacy></Legacy>
        </div>
        {/* for dataLimit-6 marathon */}
        <div>
          <RunningMarathon></RunningMarathon>
        </div>
        <div>
          <UpcomingMarathons></UpcomingMarathons>
        </div>
      </section>
    </div>
  );
};

export default Home;
