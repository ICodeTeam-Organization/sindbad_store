import { Card, CardFooter, CardHeader } from "@/components/ui/card";

import SocialAuthButtons from "./SocialAuthButtons";
import LoginForm from "./LoginForm";
const AuthContent = () => {
  return (
    <Card className=" w-[400px] pt-0">
      <CardHeader className="pt-0 px-0"></CardHeader>
      <LoginForm />
      <CardFooter className="flex flex-col">
        <SocialAuthButtons />
      </CardFooter>
    </Card>
  );
};

export default AuthContent;
