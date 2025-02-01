import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full h-14 bg-slate-50 flex items-center ">
      <div className="w-[250px] h-full bg-[#21263c]">
        <div className="rounded-bl-xl bg-[#181c2e] w-[250px] h-full pl-4 pt-4">
          <h1 className="text-2xl font-poppins text-white">HMS</h1>
        </div>
      </div>
      <div className="flex-1 items-center flex justify-between px-5 gap-10">
        <div>
          <h1 className="text-xl">Admin Dashboard</h1>
        </div>
        <div className="flex gap-5 flex-row">
          <div className="items-center border p-2 rounded-md cursor-pointer">
            <h1>Lanet Regional Hospital</h1>
          </div>
          <div className="flex items-center gap-5">
            <div className="cursor-pointer hover:bg-white hover:border hover:p-2 hover:rounded-full">
              <Image
                src="/images/user.png"
                alt="image"
                width={17}
                height={17}
              />
            </div>
            <div className="cursor-pointer hover:bg-white hover:border hover:p-2 hover:rounded-full">
              <Image
                src="/images/bell.png"
                alt="image"
                width={17}
                height={17}
              />
            </div>

            <div className="cursor-pointer hover:bg-white hover:border hover:p-2 hover:rounded-full">
              <Image
                src="/images/settings.png"
                alt="image"
                width={17}
                height={17}
              />
            </div>

            <div className="border rounded-full p-2 bg-white border-gray-300">
              <Image
                src="/images/user.png"
                alt="image"
                width={25}
                height={25}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
