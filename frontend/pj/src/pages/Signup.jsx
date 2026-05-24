import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authAPI from "../api/authAPI";

const Signup = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await authAPI.post("/signup", formData);

      setIsError(false);

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setIsError(true);

      setMessage(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5efe6] flex justify-center items-center px-4">
      <form
        onSubmit={submitHandler}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Signup</h2>

        {/* Message */}

        <div className="h-[50px] mb-4">
          {message && (
            <div
              className={`h-full flex items-center justify-center px-4 rounded-lg text-sm font-medium ${
                isError
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {message}
            </div>
          )}
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={inputHandler}
            className="w-full border p-3 rounded-lg outline-none"
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={inputHandler}
            className="w-full border p-3 rounded-lg outline-none"
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={inputHandler}
            className="w-full border p-3 rounded-lg outline-none"
          />
        </div>

        <button className="w-full bg-black text-white py-3 rounded-lg font-semibold">
          Signup
        </button>

        <p className="text-center mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
