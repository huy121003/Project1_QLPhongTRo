import React from "react";

interface Props {
  children: React.ReactNode;
}

function AuthLayout({ children }: Props) {
  return (
    <div className="flex justify-center items-center h-screen relative">
      {/* Background image */}
      <img
        className="absolute inset-0 w-full h-auto object-cover"
        src="https://wallpaperaccess.com/full/84248.png"
        alt="Background"
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default AuthLayout;
