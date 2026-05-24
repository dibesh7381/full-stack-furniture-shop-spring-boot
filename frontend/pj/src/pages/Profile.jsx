/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import authAPI from "../api/authAPI";

import {
  User,
  Mail,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";

const Profile = () => {

  const [profile, setProfile] = useState(null);

  const [userRole, setUserRole] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {

    if (token) {

      const decoded = jwtDecode(token);

      setUserRole(decoded.role);
    }

  }, [token]);

  const getProfile = async () => {

    try {

      const response = await authAPI.get(
        "/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(response.data.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const isSeller = userRole === "SELLER";

  return (
    <div className="min-h-screen bg-[#f5efe6] flex justify-center items-center px-3 sm:px-4 py-6 sm:py-8">

      <div
        className={`w-full max-w-md backdrop-blur-md rounded-[24px] sm:rounded-[28px] shadow-xl overflow-hidden border ${
          isSeller
            ? "bg-[#fff8ec] border-yellow-300"
            : "bg-white/80 border-[#e7ddd3]"
        }`}
      >

        {/* Top Section */}

        <div
          className={`px-4 sm:px-6 py-6 sm:py-8 flex flex-col items-center ${
            isSeller
              ? "bg-gradient-to-r from-yellow-500 to-amber-600"
              : "bg-[#3e2c23]"
          }`}
        >

          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white flex items-center justify-center shadow-lg mb-4">

            <User
              size={38}
              className={`sm:w-[50px] sm:h-[50px] ${
                isSeller
                  ? "text-yellow-600"
                  : "text-[#3e2c23]"
              }`}
            />

          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">
            My Profile
          </h2>

          <p className="text-white/80 mt-2 text-xs sm:text-sm text-center leading-6">
            {isSeller
              ? "Seller Account Activated"
              : "User Account Details"}
          </p>

        </div>

        {/* Profile Info */}

        {profile && (

          <div className="p-4 sm:p-6 space-y-4">

            {/* Username */}

            <div
              className={`rounded-2xl p-4 flex gap-3 sm:gap-4 border ${
                isSeller
                  ? "bg-yellow-50 border-yellow-200"
                  : "bg-[#f8f4ef] border-[#e5d8ca]"
              }`}
            >

              <div
                className={`min-w-[46px] h-[46px] rounded-xl flex items-center justify-center ${
                  isSeller
                    ? "bg-yellow-100"
                    : "bg-orange-100"
                }`}
              >

                <User
                  size={20}
                  className={
                    isSeller
                      ? "text-yellow-700"
                      : "text-orange-600"
                  }
                />

              </div>

              <div className="flex-1 min-w-0">

                <p className="text-xs sm:text-sm text-[#7a685d] mb-1">
                  Username
                </p>

                <h3 className="text-[15px] sm:text-lg font-semibold text-[#3e2c23] break-words leading-6">
                  {profile.username}
                </h3>

              </div>

            </div>

            {/* Email */}

            <div
              className={`rounded-2xl p-4 flex gap-3 sm:gap-4 border ${
                isSeller
                  ? "bg-yellow-50 border-yellow-200"
                  : "bg-[#f8f4ef] border-[#e5d8ca]"
              }`}
            >

              <div
                className={`min-w-[46px] h-[46px] rounded-xl flex items-center justify-center ${
                  isSeller
                    ? "bg-yellow-100"
                    : "bg-blue-100"
                }`}
              >

                <Mail
                  size={20}
                  className={
                    isSeller
                      ? "text-yellow-700"
                      : "text-blue-600"
                  }
                />

              </div>

              <div className="flex-1 min-w-0">

                <p className="text-xs sm:text-sm text-[#7a685d] mb-1">
                  Email
                </p>

                <h3 className="text-[15px] sm:text-lg font-semibold text-[#3e2c23] break-all leading-6">
                  {profile.email}
                </h3>

              </div>

            </div>

            {/* Role */}

            <div
              className={`rounded-2xl p-4 flex gap-3 sm:gap-4 border ${
                isSeller
                  ? "bg-yellow-50 border-yellow-200"
                  : "bg-[#f8f4ef] border-[#e5d8ca]"
              }`}
            >

              <div
                className={`min-w-[46px] h-[46px] rounded-xl flex items-center justify-center ${
                  isSeller
                    ? "bg-yellow-100"
                    : "bg-green-100"
                }`}
              >

                <ShieldCheck
                  size={20}
                  className={
                    isSeller
                      ? "text-yellow-700"
                      : "text-green-600"
                  }
                />

              </div>

              <div className="flex-1 min-w-0">

                <p className="text-xs sm:text-sm text-[#7a685d] mb-1">
                  Role
                </p>

                <div className="flex items-center gap-2 flex-wrap">

                  <h3 className="text-[15px] sm:text-lg font-semibold text-[#3e2c23]">
                    {profile.role}
                  </h3>

                  <BadgeCheck
                    size={16}
                    className={
                      isSeller
                        ? "text-yellow-600"
                        : "text-green-600"
                    }
                  />

                </div>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default Profile;