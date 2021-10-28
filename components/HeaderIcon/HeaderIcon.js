import * as React from "react";

const HeaderIcon = ({ Icon }) => {
  const [active, setActive] = React.useState(true);
  return (
    <div
      className={`flex items-center 
    cursor-pointer md:px-10
    sm:h-14 md:hover:bg-gray-100
    active:border-b-2
    active:border-gray-500 group`}
    >
      <Icon className="h-15 text-3xl" />
    </div>
  );
};

export default HeaderIcon;
