import Image from "next/image";

const SidebarAds = () => {
  return (
    <div className="hidden flex-1 lg:inline cursor-pointer bg-white p-2 rounded shadow-lg ml-5 mr-6 mb-auto">
      <Image
        src="https://ppcprotect.com/static/2462efe5633121a7b298d08f21e8f5da/ga-worth-it-thumbnail.jpg"
        height={500}
        width={400}
        objectFit="contain"
      />
    </div>
  );
};

export default SidebarAds;
