import RegisterForm from "../components/RegisterForm";
import authSideImage from "../assets/auth-side.png";

export default function RegisterPage() {
  return (
    <div className="w-full flex h-[calc(100vh-5rem)]">
      {/* Left side image */}
      <div className="flex w-1/2 bg-grey items-center justify-center">
        <img
          src={authSideImage}
          alt="Clothing"
          className="w-full max-h-full object-cover"
        />
      </div>

      {/* Right side form */}
      <div className="w-1/2 flex flex-col justify-center px-8 md:px-16">
        <h1 className="text-5xl text-primary font-semibold mb-12">Registration</h1>
        <RegisterForm />
      </div>
    </div>
  );
}
