import { useSelector } from "react-redux";



export default function Notification() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="p-3 max-w-lg mx-auto">

            <h1 className="text-3xl text-center font-semibold my-7">Welcome to BrilloConnetz</h1>
            <h2 className="text-xl text-center font-semibold my-7">An email verification link has been sent to your registred email address</h2>
            <h3 className="text-lg text-center font-semibold my-7">{currentUser.email}</h3>
  
    </div>
  );
}
