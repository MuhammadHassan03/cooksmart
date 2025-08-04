import { supabase } from "../database/supabase.client";

export const registerUser = async (
  email: string,
  password: string,
  fullName: string
) => {
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    user_metadata: {
      fullName,
      is_onboarded: false,
    },
    email_confirm: true,
  });

  if (error) throw new Error(error.message);

  return data.user;
};

export const loginUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  console.log('data', data?.user?.user_metadata?.is_onboarded)

  if (error) throw new Error(error.message);
  return {
    session: data.session,
    user: data.user,
    is_onboarded: data?.user?.user_metadata?.is_onboarded,
  };
};

export const markUserAsOnboarded = async (
  userId: string,
  preferences: {
    diet: string[],
    allergies: string[],
    cuisines: string[]
  }
) => {
  console.log('userId', userId)
  const { error: updateError, data: user_data } = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: {
      is_onboarded: true,
      preferences,
    },
  });

  console.log('updateError',updateError, user_data)

  if (updateError) throw new Error(updateError.message);
  return true;
};


export const sendResetPasswordEmail = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.CLIENT_URL}/auth/reset`,
  });

  if (error) throw new Error(error.message);
};

export const resetUserPassword = async (newPassword: string) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw new Error(error.message);
  return data;
};

export const fetchCurrentUser = async (token: string) => {
  const { data, error } = await supabase.auth.getUser(token);

  if (error) throw new Error(error.message);
  return data.user;
};
