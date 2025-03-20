
import Image from "next/image";
import Link from "next/link";

export default function About() {


  // Features of the application
  const features = [
    {
      title: "Business Analysis",
      description:
        "Get detailed analysis of your business metrics with actionable insights",
    },
    {
      title: "Industry-Specific Forms",
      description:
        "Customized forms for different business types capturing the most relevant data",
    },
    {
      title: "Data Visualization",
      description:
        "Visual representation of your business performance and comparative metrics",
    },
    {
      title: "Strategic Recommendations",
      description:
        "AI-powered suggestions to improve your business performance",
    },
  ];

  // Team members
  const team = [
    {
      name: "Obadia Mari",
      role: "Back-end developer",
    },
    {
      name: "Ahmad Al-rihawi",
      role: "Front-end developer"
    },
    {
      name: "Muhammad Taleb",
      role: "Front-end developer",
    },
    {
      name: "Ousama Sukkar",
      role: "Back-end developer",
    },
  ];

  return (
    <section className="w-full min-h-screen p-4 sm:p-6 xl:p-8">
      <h1 className="text-[2rem] text-center xl:text-left xl:text-[4.5rem] text-white fjalla-one px-2 sm:px-4 xl:px-[3rem] pt-[5rem] pb-[2rem] xl:pt-[6rem] xl:pb-[3rem]">
        About Business Consultant AI
      </h1>

      <div className="max-w-[95%] mx-auto">
        {/* Mission Section */}
        <div className="bg-[#1a1d24] rounded-xl p-6 mb-8 shadow-xl">
          <h2 className="text-2xl md:text-3xl text-dark-yellow mb-4 fjalla-one">
            Our Mission
          </h2>
          <p className="text-white text-lg leading-relaxed mb-6">
            Business Consultant AI is designed to help business owners and
            entrepreneurs make data-driven decisions by analyzing key
            performance indicators and providing strategic recommendations. Our
            platform leverages advanced AI to offer industry-specific insights
            tailored to your unique business needs.
          </p>
          <p className="text-white text-lg leading-relaxed">
            Whether you&apos;re running a real estate agency, a restaurant, or
            an e-commerce store, our tools help you understand your market
            position, identify growth opportunities, and optimize your
            operations for success.
          </p>
        </div>

        {/* Features Section */}
        <div className="bg-[#1a1d24] rounded-xl p-6 mb-8 shadow-xl">
          <h2 className="text-2xl md:text-3xl text-dark-yellow mb-6 fjalla-one">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-[#252932] p-5 rounded-lg">
                <h3 className="text-xl text-dark-yellow mb-2 fjalla-one">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-[#1a1d24] rounded-xl p-6 mb-8 shadow-xl">
          <h2 className="text-2xl md:text-3xl text-dark-yellow mb-6 fjalla-one">
            Our Expert Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-[#252932] p-5 rounded-lg text-center"
              >
                <div className="w-20 h-20 bg-[#353a45] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-dark-yellow text-2xl fjalla-one">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl text-white mb-1">{member.name}</h3>
                <h4 className="text-dark-yellow mb-2 text-sm">{member.role}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-[#1a1d24] rounded-xl p-6 mb-8 shadow-xl">
          <h2 className="text-2xl md:text-3xl text-dark-yellow mb-4 fjalla-one">
            How It Works
          </h2>
          <ol className="text-white space-y-4">
            <li className="flex gap-4 items-start">
              <div className="bg-dark-yellow text-[#1e2229] w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl mb-1">Select Your Business Type</h3>
                <p className="text-gray-300">
                  Choose from our wide range of industry-specific business
                  categories.
                </p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <div className="bg-dark-yellow text-[#1e2229] w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl mb-1">Input Your Business Data</h3>
                <p className="text-gray-300">
                  Complete the customized form with your specific business
                  metrics and information.
                </p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <div className="bg-dark-yellow text-[#1e2229] w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl mb-1">Receive Detailed Analysis</h3>
                <p className="text-gray-300">
                  Get instant insights and recommendations based on your data
                  and industry benchmarks.
                </p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <div className="bg-dark-yellow text-[#1e2229] w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold">
                4
              </div>
              <div>
                <h3 className="text-xl mb-1">
                  Implement Strategic Recommendations
                </h3>
                <p className="text-gray-300">
                  Apply the AI-generated strategies to improve your business
                  performance.
                </p>
              </div>
            </li>
          </ol>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-10">
          
          <Link href="/">
            <button
              type="button"
              className="bg-dark-yellow text-[#1e2229] py-3 px-12 rounded-lg text-xl font-semibold hover:bg-yellow-500 transition-all fjalla-one"
            >
              Try It Now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
