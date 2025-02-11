const Legacy = () => {
  return (
    <div
      className="flex flex-col md:flex-row gap-6 bg-white p-6 md:p-8 rounded-sm shadow-lg backdrop-blur-lg"
      data-aos="flip-down"
    >
      {/* Left Image */}
      <div className="flex-shrink-0 md:w-1/2">
        <img
          className="w-full h-auto max-h-96 object-cover rounded-xl shadow-md"
          src="https://i.ibb.co.com/GFvys0Z/marathon-1.jpg"
          alt="Marathon Event"
        />
      </div>

      {/* Right Content */}
      <div className="md:w-1/2">
        <h2 className="text-[#005F99] text-3xl md:text-4xl font-semibold mb-4">
          Empowering Runners, Creating Memories
        </h2>
        <p className="text-lg text-gray-700 font-normal leading-relaxed">
          At Marathon Hub, we believe in bringing communities together through
          the spirit of running. Whether you're organizing a charity marathon, a
          corporate race, or a fun run, our platform makes it easier than ever
          to manage your event from start to finish. We provide tools for
          organizing, tracking, and fundraising, all while ensuring your
          participants have an unforgettable experience. Join us in creating
          impactful events where every mile matters and every runner’s effort
          counts.
        </p>
      </div>
    </div>
  );
};

export default Legacy;
