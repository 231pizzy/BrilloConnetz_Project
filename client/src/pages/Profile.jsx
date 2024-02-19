import { useSelector } from "react-redux";
import pattern from "../assets/bgBanner.jpeg";

const bannerImg = {
  backgroundImage: `url(${pattern})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
  opacity:0.9
};

export default function Profile({ theme }) {

  const { currentUser} = useSelector((state) => state.user);
 
  return (
    <div className="w-full h-full" style={theme !== "dark" ? bannerImg : {}}>

    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
  <img
    onClick={() => fileRef.current.click()}
    src={currentUser.avatar}
    alt="profile"
    className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
  />

  <label htmlFor="firstName">First Name:</label>
  <input
    type="text"
    placeholder="First Name"
    defaultValue={currentUser.firstName}
    id="firstName"
    className="border p-3 rounded-lg"
    disabled
  />

  <label htmlFor="lastName">Last Name:</label>
  <input
    type="text"
    placeholder="Last Name"
    defaultValue={currentUser.lastName}
    id="lastName"
    className="border p-3 rounded-lg"
    disabled
  />

  <label htmlFor="userName">Username:</label>
  <input
    type="text"
    placeholder="Username"
    defaultValue={currentUser.userName}
    id="userName"
    className="border p-3 rounded-lg"
    disabled
  />

  <label htmlFor="phone">Phone Number:</label>
  <input
    type="text"
    placeholder="Phone Number"
    defaultValue={currentUser.phone}
    id="phone"
    className="border p-3 rounded-lg"
    disabled
  />

  <label htmlFor="email">Email:</label>
  <input
    type="email"
    placeholder="Email"
    defaultValue={currentUser.email}
    id="email"
    className="border p-3 rounded-lg"
    disabled
  />

  <label htmlFor="interests">Interests:</label>
  {currentUser.interests.map((interest, index) => (
    <input
      key={index}
      type="text"
      defaultValue={interest}
      className="border p-3 rounded-lg"
      disabled
    />
  ))}
</form>


    </div>
    </div>
  );
}
