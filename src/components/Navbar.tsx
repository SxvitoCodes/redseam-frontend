import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import LogoSvg from "../assets/HandEye.svg";
import PersonSvg from "../assets/person.svg";
import CartSvg from "../assets/shopping-cart.svg";
import ChevronDownSvg from "../assets/chevron-down.svg";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full px-[100px] bg-white border-b border-gray-200">
      <div className="w-full flex justify-between items-center py-7">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1">
          <img src={LogoSvg} alt="RedSeam Logo" className="h-6 w-6" />
          <span className="text-primary font-semibold capitalize">
            RedSeam Clothing
          </span>
        </Link>

        {/* Right menu */}
        <div className="flex items-center gap-5 relative">
          {!isLoggedIn ? (
            <Link to="/login" className="flex items-center gap-1">
              <img src={PersonSvg} alt="User Icon" className="h-5 w-5" />
              <span className="text-xs text-primary font-medium">Log in</span>
            </Link>
          ) : (
            <>
              {/* Cart */}
              <button>
                <img src={CartSvg} alt="Cart Icon" className="h-6 w-6 cursor-pointer" />
              </button>

              {/* Avatar + Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <img
                    src={user?.profile_photo || PersonSvg}
                    alt="User Avatar"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <img
                    src={ChevronDownSvg}
                    alt="Dropdown Icon"
                    className="h-5 w-5"
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg py-2 z-50">
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Orders
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setDropdownOpen(false);
                        logout();
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
