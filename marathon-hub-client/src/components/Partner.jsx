const Partner = () => {
  const partners = [
    "https://i.ibb.co.com/PK7tYNj/p1.webp",
    "https://i.ibb.co.com/ZprkGTS8/p2.webp",
    "https://i.ibb.co.com/SwdNRTLr/p3.webp",
  ];

  return (
    <div className="py-10 px-4  mx-auto text-center  dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-[#6D394D] dark:text-teal-300 py-4 mb-8">
        Meet Our Programme Partners
      </h2>
      <div className="grid w-11/12 mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {partners.map((url, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-[#1f1f1f] text-[#333] dark:text-gray-200 rounded-2xl shadow-md overflow-hidden transform hover:scale-105 transition duration-300"
          >
            <img
              src={url}
              alt={`partner-${idx}`}
              className="w-full h-36 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partner;
