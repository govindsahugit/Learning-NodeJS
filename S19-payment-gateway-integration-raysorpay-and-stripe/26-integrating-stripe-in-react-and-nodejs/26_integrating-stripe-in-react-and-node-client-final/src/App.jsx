import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";

const response = await fetch("http://localhost:4000");
const courses = await response.json();

export default function App() {
  const [paymentSuccessMessage, setPaymentSuccessMessage] = useState("");
  const [paymentFailedMessage, setPaymentFailedMessage] = useState("");
  useEffect(() => {
    const sessionId = new URLSearchParams(location.search).get("session_id");

    if (sessionId) {
      verifyPaymentStatus(sessionId);
    }
  }, []);

  async function verifyPaymentStatus(sessionId) {
    const response = await fetch("http://localhost:4000/verify-payment", {
      method: "POST",
      body: JSON.stringify({ sessionId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const paymentStatus = await response.json();
    if (paymentStatus.status === "success") {
      setPaymentSuccessMessage(paymentStatus.message);
      setTimeout(() => {
        setPaymentSuccessMessage("");
        location.href = '/'
      }, 3000);
    } else {
      setPaymentFailedMessage(paymentStatus.message);
      setTimeout(() => {
        setPaymentFailedMessage("");
        location.href = '/'
      }, 3000);
    }
  }
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-10">
      <div className="max-w-7xl pt-6 mx-auto px-4 sm:px-6 lg:px-8 ">
        <h1 className="text-4xl  text-center font-bold text-gray-900 dark:text-white mb-8">
          All Courses
        </h1>
        <h2 className="text-green-400">{paymentSuccessMessage}</h2>
        <h2 className="text-red-400">{paymentFailedMessage}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>
    </div>
  );
}
