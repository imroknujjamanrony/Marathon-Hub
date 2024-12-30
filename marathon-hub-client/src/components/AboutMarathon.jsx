const AboutMarathon = () => {
  return (
    <div
      className="text-center rounded-lg  py-16 bg-gradient-to-r from-[#003f63] via-[#00AEEF] to-[#006c8e] text-gray-800 dark:text-gray-200"
      data-aos="fade-up"
    >
      <h2 className="text-4xl md:text-5xl font-extrabold text-[#FFB21C]">
        Marathon Hub: Turning Races Into Achievements
      </h2>
      <p className="mt-4 text-lg text-white font-medium">
        Marathon Hub is where runners become champions. Whether it’s raising
        awareness for a cause, supporting local communities, or pushing your
        limits, our platform connects participants, organizers, and supporters
        for a greater purpose. Together, we create unforgettable events and
        empower individuals to run towards their dreams.
      </p>

      {/* Grid Section */}
      <div className="rounded-2xl mt-10 bg-[#004d6d] dark:bg-[#002e44] py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 px-6">
          {[
            {
              src: "https://i.ibb.co.com/GFvys0Z/marathon-1.jpg",
              title: "City Marathon",
            },
            {
              src: "https://i.ibb.co.com/YXjDYKL/6.jpg",
              title: "Charity Run",
            },
            {
              src: "https://i.ibb.co.com/YXjDYKL/6.jpg",
              title: "Team Relay",
            },
            {
              src: "https://i.ibb.co.com/q7d1RXt/siddhant-soni-Cvq-Czw-VOh-CM-unsplash.jpg",
              title: "Kids Fun Run",
            },
            {
              src: "https://i.ibb.co.com/vcL3H23/2m.jpg",
              title: "Elite Runners",
            },
            {
              src: "https://i.ibb.co.com/09mQ2Wz/marathon-3.jpg",
              title: "Virtual Marathon",
            },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full object-cover shadow-lg"
                src={item.src}
                alt={item.title}
              />
              <h2 className="pt-2 text-sm md:text-base text-white">
                {item.title}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutMarathon;
