import { useSelector } from "react-redux";


// Function to mask email address
const maskEmail = (email) => {
  const atIndex = email.indexOf('@'); // Find the index of '@' symbol
  const maskedChars = '*'.repeat(atIndex - 1); // Calculate the number of masked characters

  // Concatenate the masked characters with the first character and the characters after '@'
  const maskedEmail = `${email.charAt(0)}${email.charAt(1)}${email.charAt(2)}${maskedChars}${email.slice(atIndex)}`;
  
  // Return the masked email address
  return maskedEmail;
};

export default function Notification() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="p-3 max-w-lg mx-auto dark:bg-black dark:text-white h-screen">

            <h1 className="text-3xl text-center font-semibold my-7">Welcome to BrilloConnetz</h1>
            <h2 className="text-xl text-center font-semibold my-7">An email verification link has been sent to your registred email address</h2>
            <h3 className="text-lg text-center font-semibold my-7">{maskEmail(currentUser.email)}</h3>
  
    </div>
  );
}
