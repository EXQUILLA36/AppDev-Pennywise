import { SignUp } from "@clerk/clerk-react";

export default function Signup() {
  return (
    <div className="flex h-[90vh] items-center justify-center">
      <SignUp
        path="/signup"
        routing="path"
        signInUrl="/login"
        appearance={{
          variables: {
            colorPrimary: "#630000",
            colorBorder: "#ffffff",
            colorInputText: "#000000",
            colorText: "#FFFFFF",
            colorBackground: "#191919",
            colorShadow: "rgba(255, 255, 255, 0.1)",
            colorForeground: "#FFFFFF",
            colorInputForeground: "#000000",
            colorInputPlaceholder: "#000000",
            borderRadius: "0.5rem",
            fontFamily: "Montserrat, sans-serif",
          },
          elements: {
            socialButtonsBlockButtonText: "!text-white",
            footerActionLink: "!text-red-500",
          },
        }}
      />
    </div>
  );
}
