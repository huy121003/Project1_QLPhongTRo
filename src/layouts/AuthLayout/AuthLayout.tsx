import React from "react";
interface Props {
  children: React.ReactNode;
}
function AuthLayout({ children }: Props) {
  return (
    <div className="flex justify-center items-center  relative h-screen">
      <div className="relative z-10">{children}</div>
    </div>
  );
}
export default AuthLayout;
