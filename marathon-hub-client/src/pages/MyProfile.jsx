import UseAuth from "../context/UseAuth";

const MyProfile = () => {
  const { user } = UseAuth();
  return (
    <div className="max-w-xs mx-auto py-20 bg-white shadow-lg rounded-2xl p-5 hover:shadow-3xl transition duration-300">
      <div className="flex flex-col items-center">
        <img
          src={user?.photoURL}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md"
        />
        <h2 className="mt-3 text-xl font-semibold text-gray-800">
          {user?.displayName}
        </h2>
        <p className="text-gray-500">{user?.email}</p>
      </div>
    </div>
  );
};

export default MyProfile;
