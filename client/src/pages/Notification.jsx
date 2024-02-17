import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    emailVerification
  } from "../redux/user/userSlice";


export default function Noti() {
  const { currentUser } = useSelector((state) => state.user);
  const[loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailToken = searchParams.get("emailToken")

  useEffect(() => {
    (async () => {
      if (currentUser?.emailVerified && currentUser?.status) {
        setTimeout(() => {
          return navigate("/signin");
        }, 3000);
      } else {
        if (emailToken) {
          setLoading(true);
  
          try {
            const response = await fetch("/api/auth/verify-email", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ emailToken }),
            });
  
            setLoading(false);
            const data = await response.json();
  
            if (!response.ok) {
              throw new Error(data.message || "Email verification failed.");
            }
  
            dispatch(emailVerification(data));
            setTimeout(() => {
                return navigate("/verifyOTP");
              }, 3000);
          } catch (error) {
            setError(error.message || "An error occurred during email verification.");
          }
        }
      }
    })();
  }, [emailToken, currentUser]);

  return (
    <div className="p-3 max-w-lg mx-auto">
        {currentUser?.emailVerified ? (

            <h1 className="text-3xl text-center font-semibold my-7">Email successfully verified, Redirecting.....</h1>
        ) : (
            <div>

                <h1 className="text-3xl text-center font-semibold my-7">{error.message}</h1>
            </div>
        )}
      
    </div>
  );
}
