// src/components/Navbar.tsx
import { Link } from "react-router-dom";
import LogoSvg from "../assets/HandEye.svg";
import PersonSvg from "../assets/person.svg";
import CartSvg from "../assets/shopping-cart.svg";
import ChevronDownSvg from "../assets/chevron-down.svg";
import avatar from "../assets/test-avatar.png";

interface NavbarProps {
  isLoggedIn: boolean;
}

export default function Navbar({ isLoggedIn }: NavbarProps) {
  return (
    <nav className="w-full px-[100px] bg-white border-b border-gray-200">
      <div className="w-full flex justify-between items-center py-7">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1">
          {LogoSvg && <img src={LogoSvg} alt="RedSeam Logo" className="h-6 w-6" />}
          <span className="text-primary font-semibold capitalize">
            RedSeam Clothing
          </span>
        </Link>

        {/* Menu Items*/}
        <div className="flex items-center gap-5">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="flex items-center gap-1"
              >
                {PersonSvg && <img src={PersonSvg} alt="User Icon" className="h-5 w-5" />}
                <span className="text-xs text-primary font-medium">Log in</span>
              </Link>
            </>
          ) : (
            <>
              <button className="">
                {CartSvg && <img src={CartSvg} alt="Cart Icon" className="h-6 w-6" />}
              </button>
              <Link to="/profile" className="flex items-center gap-1">
                {avatar && <img src={avatar} alt="User Avatar" className="h-10 w-10 rounded-full object-cover" />}
                {ChevronDownSvg && <img src={ChevronDownSvg} alt="Dropdown Icon" className="h-4 w-4" />}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
