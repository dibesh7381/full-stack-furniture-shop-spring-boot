import {
  ShieldCheck,
  Database,
  Cloud,
  Palette,
  Layers3,
  LockKeyhole,
  MonitorSmartphone,
  Server,
  Code2,
} from "lucide-react";

const Home = () => {

  const features = [
    {
      icon: <Code2 size={34} />,
      title: "React Frontend",
      desc: "Modern responsive frontend built using React Router, Axios and Tailwind CSS.",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: <Server size={34} />,
      title: "Spring Boot Backend",
      desc: "Secure and scalable REST APIs using Spring Boot and Spring Security.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <Database size={34} />,
      title: "PostgreSQL Database",
      desc: "Reliable relational database integration using Spring Data JPA.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <ShieldCheck size={34} />,
      title: "JWT Authentication",
      desc: "Token based authentication with login, signup and protected profile routes.",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: <Cloud size={34} />,
      title: "Cloudinary Uploads",
      desc: "Cloud based image upload and storage support for furniture products.",
      color: "bg-cyan-100 text-cyan-600",
    },
    {
      icon: <LockKeyhole size={34} />,
      title: "Spring Security",
      desc: "Role based authorization and secure API access using Spring Security.",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: <Palette size={34} />,
      title: "Modern UI Design",
      desc: "Fully modern glassmorphism inspired UI with clean responsive layouts.",
      color: "bg-pink-100 text-pink-600",
    },
    {
      icon: <MonitorSmartphone size={34} />,
      title: "Mobile Responsive",
      desc: "Optimized experience for desktop, tablet and mobile devices.",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      icon: <Layers3 size={34} />,
      title: "Full Stack Project",
      desc: "Complete full stack authentication project structure ready for real apps.",
      color: "bg-indigo-100 text-indigo-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5efe6] px-5 py-14">

      {/* Hero Section */}

      <div className="max-w-6xl mx-auto text-center mb-14">

        <h1 className="text-4xl md:text-6xl font-bold text-[#3e2c23] mb-5 leading-tight">
          Furniture Shop
        </h1>

        <p className="text-[#6b5b53] text-base md:text-lg max-w-3xl mx-auto leading-8">
          A modern full stack authentication project built using
          React, Tailwind CSS, Axios, Spring Boot, Spring Security,
          JWT Authentication, PostgreSQL and Cloudinary.
        </p>

      </div>

      {/* Cards */}

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-md border border-[#e7ddd3] rounded-3xl p-7 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >

            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 ${item.color}`}
            >
              {item.icon}
            </div>

            <h2 className="text-2xl font-bold text-[#3e2c23] mb-3">
              {item.title}
            </h2>

            <p className="text-[#6b5b53] leading-7 text-[15px]">
              {item.desc}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Home;