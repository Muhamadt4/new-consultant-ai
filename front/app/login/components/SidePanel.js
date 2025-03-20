import Image from "next/image";
import business from "../../assets/business-dashboard.jpg";
import logo from "../../assets/logo.png";

export default function SidePanel() {
  return (
    <div className="w-1/2 relative">
      <Image
        src={business}
        alt="Business Dashboard"
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col h-full justify-between p-6 text-white">
        <Image src={logo} alt="logo" width={200} height={200} />
        <div>
          <h3 className="text-xl font-semibold">
            Your smart business analytics platform
          </h3>
          <p className="text-sm text-gray-300">
            Explore strengths and weaknesses, and get strategic advice to
            increase efficiency and profits. Get started now!
          </p>
        </div>
      </div>
    </div>
  );
}
