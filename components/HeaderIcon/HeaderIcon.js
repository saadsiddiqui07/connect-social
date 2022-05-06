import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Tooltip } from "@mui/material";

const HeaderIcon = ({ Icon, title }) => {
  const [active, setActive] = useState(false);
  const router = useRouter();
  const tabTitle = router.pathname;

  const handleClick = () => {
    router.push(`/${title}`);
  };

  useEffect(() => {
    tabTitle === `/${title}` ? setActive(true) : setActive(false);
  }, [tabTitle, title]);

  return (
    <Tooltip className="capitalize" title={!title ? "home" : title}>
      <div
        onClick={handleClick}
        className={`flex items-center 
    cursor-pointer 
    sm:h-10 px-5 md:h-15 px-7 hover:bg-gray-100 lg:px-12 h-22 max-w-fit 2xl:px-10 h-22
    active:border-b-2
    active:border-gray-500 group ${
      active && "md:border-b-2 md:border-solid md:border-black md:rounded-sm"
    }`}
      >
        <Icon className="hidden sm:inline-flex text-12 md:inline-flex text-2xl lg:inline-flex lg:text-3xl" />
        <p className="hidden">{title}</p>
      </div>
    </Tooltip>
  );
};

export default HeaderIcon;
