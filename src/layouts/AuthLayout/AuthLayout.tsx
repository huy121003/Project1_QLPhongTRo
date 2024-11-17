import React from "react";

interface Props {
  children: React.ReactNode;
}

function AuthLayout({ children }: Props) {
  return (
    <div className="flex flex-col h-screen justify-between bg-white  lg:overflow-y-hidden ">
      {/* Main Content */}
      <div className=" items-center justify-center flex">
        <>
          <img
            src="https://avatars3.githubusercontent.com/u/12101536?s=400&v=4"
            alt="logo"
            className="w-16 h-16 md:h-32 md:w-32 rounded-full  my-4"
          />
        </>
        <p className="text-xl md:text-[40px] font-bold text-center">
          Boarding House Management
        </p>
      </div>
      <div className="flex-1 flex justify-center items-center">{children}</div>

      {/* Footer */}
      <footer className="text-center  py-4">
        <strong className="text-gray-400 text-xl">©Coded by Group 4</strong>
      </footer>
    </div>
  );
}

export default AuthLayout;
