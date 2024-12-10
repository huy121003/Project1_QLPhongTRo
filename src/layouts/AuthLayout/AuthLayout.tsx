import { useTheme } from "contexts/ThemeContext";

interface Props {
  children: React.ReactNode;
}

function AuthLayout({ children }: Props) {
  const { theme, toggleTheme } = useTheme();
  const isLightTheme = theme === "light";
  const textColor = isLightTheme ? "text-black" : "text-white";
  const bgColor = isLightTheme ? "bg-white" : "bg-gray-800";

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} flex flex-col`}>
      {/* Nút chuyển đổi theme */}
      <div className="flex justify-end pr-6 pt-2">
        <i
          className={`fa-solid text-2xl cursor-pointer hover:opacity-80 ${
            theme === "light" ? "fa-sun text-black" : "fa-moon text-white"
          }`}
          onClick={toggleTheme}
        />
      </div>

      {/* Layout chính */}
      <div className="flex flex-1 flex-col md:flex-row items-center justify-center">
        {/* Phần bên trái */}
        <div className="flex flex-col items-center justify-center md:w-1/2 p-10 text-center">
          <img
            src="https://avatars3.githubusercontent.com/u/12101536?s=400&v=4"
            alt="logo"
            className="w-20 h-20 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full mb-4"
          />
          <p className="text-xl md:text-2xl lg:text-4xl font-bold">
            Boarding House Management
          </p>
        </div>

        {/* Phần bên phải */}
        <div className="flex-1 flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
