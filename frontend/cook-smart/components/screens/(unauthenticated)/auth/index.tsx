import { useState } from "react";
import { Text, View } from "tamagui";
import LoginScreen from "./Login";
import SignupScreen from "./Signup";

export const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchScreen = () => {
    setIsLogin(!isLogin);
  }

  return isLogin ? (
    <LoginScreen
        switchScreen={switchScreen}
    />
  ): (
    <SignupScreen
        switchScreen={switchScreen}
    />
  )
};
