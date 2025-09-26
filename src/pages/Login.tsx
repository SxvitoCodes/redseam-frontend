import LoginForm from "../components/LoginForm";
import authSideImage from "../assets/auth-side.png";

export default function LoginPage() {
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
      <div className="w-1/2 flex flex-col justify-center px-8 md:px-16">
        <h1 className="text-3xl font-bold mb-6">Welcome Back</h1>
        <LoginForm />
      </div>
    </div>
  );
}
