import { useState } from "react";
import { Text, View } from "tamagui";
import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";

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
