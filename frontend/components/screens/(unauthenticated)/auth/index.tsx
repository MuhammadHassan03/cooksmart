import { useState, useMemo, useCallback } from "react";
import { View } from "tamagui";
import { AnimatePresence, View as MotiView } from "moti";
import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";
import ForgotPasswordScreen from "./ForgotPasswordScreen";

// 1. Enum for Type-Safety: Taki typos ki wajah se screen crash na ho
enum AuthStep {
  LOGIN = "login",
  SIGNUP = "signup",
  FORGOT_PASSWORD = "forgot_password",
}

export const AuthScreen = () => {
  const [step, setStep] = useState<AuthStep>(AuthStep.LOGIN);

  // 2. Memoized Handlers: Taki unnecessary re-renders na hon
  const goToLogin = useCallback(() => setStep(AuthStep.LOGIN), []);
  const goToSignup = useCallback(() => setStep(AuthStep.SIGNUP), []);
  const goToForgot = useCallback(() => setStep(AuthStep.FORGOT_PASSWORD), []);

  // 3. Dynamic Screen Renderer
  // Is approach se code scalable rehta hai (kal ko OTP screen bhi yahin add ho sakti hai)
  const renderScreen = useMemo(() => {
    switch (step) {
      case AuthStep.LOGIN:
        return (
          <MotiView
            key="login"
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ type: 'timing', duration: 300 }}
            style={{ flex: 1 }}
          >
            <LoginScreen 
               switchScreen={goToSignup} 
               onForgot={goToForgot} // Login screen mein ye prop add karna hoga
            />
          </MotiView>
        );
      case AuthStep.SIGNUP:
        return (
          <MotiView
            key="signup"
            from={{ opacity: 0, translateX: 50 }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: -50 }}
            transition={{ type: 'timing', duration: 300 }}
            style={{ flex: 1 }}
          >
            <SignupScreen switchScreen={goToLogin} />
          </MotiView>
        );
      case AuthStep.FORGOT_PASSWORD:
        return (
          <MotiView
            key="forgot"
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 20 }}
            style={{ flex: 1 }}
          >
            <ForgotPasswordScreen onBack={goToLogin} />
          </MotiView>
        );
    }
  }, [step, goToLogin, goToSignup, goToForgot]);

  return (
    <View f={1} bg="$background">
      <AnimatePresence exitBeforeEnter>
        {renderScreen}
      </AnimatePresence>
    </View>
  );
};