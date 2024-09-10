"use client";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import SocialAuthButtons from "./SocialAuthButtons";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import TabButton from "./TabButton";
import { useState } from "react";
const AuthContent = () => {
  const [showLoginForm, setShowLoginForm] = useState<boolean>(true);
  const handleChangeForm = () => {
    setShowLoginForm((prev) => !prev);
  };
  return (
    <Card className=" w-96 pt-0">
      <CardHeader className="pt-0 px-0">
        <TabButton
          showLoginForm={showLoginForm}
          handleChangeForm={handleChangeForm}
        />
      </CardHeader>
      {showLoginForm ? <LoginForm /> : <SignUpForm />}
      <CardFooter className="flex flex-col">
        <SocialAuthButtons />
      </CardFooter>
    </Card>
  );
};

export default AuthContent;
