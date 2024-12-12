 const roleColor = (role: string) => {
  switch (role) {
    case "SUPER ADMIN":
      return " text-red-600";
    case "NORMAL USER":
      return " text-green-600";
    default:
      return "text-blue-600";
  }
};
export default roleColor;
