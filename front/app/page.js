import Image from "next/image";
import Link from "next/link";
import RealEstate from "../public/HomePage/RealEstate.png";
import Automotive from "../public/HomePage/Automotive.png";
import Restaurants from "../public/HomePage/Restaurants.png";
import Ecommerce from "../public/HomePage/E-commerce.png";
import TechnologyServices from "../public/HomePage/Technology&Services.png";
import EducationTraining from "../public/HomePage/Education&Training.png";
import Healthcare from "../public/HomePage/Healthcare.png";
import FinancialServices from "../public/HomePage/Financial Services.png";
import Arrow from "../public/HomePage/Arrow.png";

export default function Home() {
  const businessCategories = [
    {
      title: "Real Estate",
      description:
        "Property management, real estate agencies, and property development",
      icon: RealEstate,
    },
    {
      title: "Automotive",
      description:
        "Vehicle sales, auto repair shops, and car rental businesses",
      icon: Automotive,
    },
    {
      title: "Restaurants",
      description:
        "Food service establishments, cafes, and catering businesses",
      icon: Restaurants,
    },
    {
      title: "E-commerce",
      description:
        "Online retail stores, digital products, and e-commerce platforms",
      icon: Ecommerce,
    },
    {
      title: "Technology & IT Services",
      description:
        "Software development, IT consulting, and tech support services",
      icon: TechnologyServices,
    },
    {
      title: "Education & Training",
      description:
        "Educational institutions, training centers, and online learning platforms",
      icon: EducationTraining,
    },
    {
      title: "Healthcare",
      description:
        "Medical practices, healthcare providers, and wellness services",
      icon: Healthcare,
    },
    {
      title: "Financial Services",
      description:
        "Financial consulting, investment services, and banking solutions",
      icon: FinancialServices,
    },
  ];

  return (
    <section className="w-full min-h-screen p-4 sm:p-6 xl:p-8">
      <h1 className="text-[2rem] text-center xl:text-left xl:text-[3rem] text-white fjalla-one px-2 sm:px-4 xl:px-[3rem] pt-[5rem] pb-[2rem] xl:pt-[6rem] xl:pb-[2rem]">
        Select Your Business Type
      </h1>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-6 max-w-[95%] mx-auto">
        {businessCategories.map((category, index) => (
          <Link
            href={`/business?type=${encodeURIComponent(category.title)}`}
            key={index}
          >
            <div className="bg-[#1e2229] rounded-lg p-4 sm:p-6 cursor-pointer hover:bg-[#252932] transition-all group relative ">
              <div className="w-full flex items-center justify-between">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 ">
                  <Image
                    src={category.icon}
                    alt={category.title}
                    className="w-12 sm:w-16 xl:w-20 lg:w-[5.8rem] object-contain"
                  />

                  <div>
                    <h3 className="text-dark-yellow text-xl sm:text-2xl xl:text-[2.2rem]  mb-1 sm:mb-2 fjalla-one">
                      {category.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm sm:text-base">
                      {category.description}
                    </p>
                  </div>
                </div>
                <Image
                  src={Arrow}
                  alt="Arrow"
                  className="w-4 h-4 sm:w-5 sm:h-5 xl:w-[1.3rem] xl:h-[1.3rem] object-contain transform transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
