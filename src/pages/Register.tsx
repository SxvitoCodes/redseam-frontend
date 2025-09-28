import RegisterForm from "../components/RegisterForm";
import authSideImage from "../assets/auth-side.png";

export default function RegisterPage() {
  return (
    <div className="flex h-screen">
      {/* Left side image */}
      <div className="flex w-1/2 bg-grey items-center justify-center">
        <img
          src={authSideImage}
          alt="Clothing"
          className="w-full max-h-full object-cover"
        />
      </div>

      {/* Right side form */}
      <div className="w-1/2 flex flex-col justify-center px-[172px]">
        <h1 className="text-primary text-[2.625rem] font-semibold">Registration</h1>
        <RegisterForm />
      </div>
    </div>
  );
}
