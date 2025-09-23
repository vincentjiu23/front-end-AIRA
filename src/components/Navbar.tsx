import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { label: "Diagnosis", path: "/diagnosis" },
    { label: "Prognosis", path: "/prognosis" },
    { label: "Treatment", path: "/treatment" },
    { label: "Informasi", path: "/information" },
  ];

  return (
    <nav className="w-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] h-20 flex items-center relative z-50">
      {/* Logo di kiri */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2">
        <Link to="/">
          <img
            src="logo.PNG"
            alt="UMN Cancer Society"
            className="h-12 w-auto cursor-pointer"
          />
        </Link>
      </div>

      {/* Menu di tengah */}
      <div className="w-full flex justify-center">
        <ul className="flex gap-16 text-xl font-semibold">
          {menuItems.map((item) => {
            const isActive = currentPath === item.path;
            const isHome = currentPath === "/";

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`transition-colors duration-200 ${
                    isActive && !isHome
                      ? "font-bold text-[#181852]"
                      : "font-normal text-[#212129]"
                  } hover:text-[#181852]`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
