const Partner = () => {
  const partners = [
    "https://i.ibb.co.com/PK7tYNj/p1.webp",
    "https://i.ibb.co.com/ZprkGTS8/p2.webp",
    "https://i.ibb.co.com/SwdNRTLr/p3.webp",
  ];

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-teal-500 mb-8">
        Meet Our Programme Partners
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {partners.map((url, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md overflow-hidden transform hover:scale-105 transition duration-300"
          >
            <img
              src={url}
              alt={`partner-${idx}`}
              className="w-full h-48 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partner;
