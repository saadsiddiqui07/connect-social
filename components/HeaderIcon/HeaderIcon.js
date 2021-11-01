import { useRouter } from "next/router";

const HeaderIcon = ({ Icon, title }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/${title}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center 
    cursor-pointer 
    sm:h-10 px-5 md:h-15 px-7 hover:bg-gray-100 lg:px-12 h-22 2xl:px-10 h-22
    active:border-b-2
    active:border-gray-500 group`}
    >
      <Icon className="hidden sm:inline-flex text-12 md:inline-flex text-2xl lg:inline-flex text-3xl" />
      <p className="hidden">{title}</p>
    </div>
  );
};
export default HeaderIcon;
