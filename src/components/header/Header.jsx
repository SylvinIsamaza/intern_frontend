import React from "react";
import { Icon, InlineIcon } from "@iconify/react";
import profile from "../../assets/profile.jpeg";
function Header() {
  return (
    <div className="bg-white h-[60px] rounded-lg flex-1 md:mt-5 absolute top-0 md:right-[30px] left-0 right-0  md:left-[80px]  flex items-center justify-center flex-col px-3 shadow-sm">
      <div className="flex justify-between w-full items-center">
        <div className="bg-[#F0F3FE] p-1 rounded-lg">
          <Icon icon="gg:menu-right" color="#04015E" width={25} height={25} />
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#F0F3FE] p-1 h-[35px] w-[35px] rounded-lg flex items-center justify-center">
            <Icon
              icon="clarity:notification-solid"
              color="#04015E"
              width={25}
              height={25}
            />
          </div>
          <img className="rounded-full w-[40px] h-[40px]" src={profile} />
          <div className="md:flex hidden flex-col py-4">
            <div className="flex gap1 font-[600] items-center">
              <p className="font-[600]">John Thomson</p>
              <Icon
                icon="mingcute:down-fill"
                color="#04015E"
                width={15}
                height={15}
              />
            </div>
            <p className=" text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
