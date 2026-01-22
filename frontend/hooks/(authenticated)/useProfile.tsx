import { useEffect, useState } from "react";
import { useAuthStore } from "@/utils/store/useAuthStore";
import { supabase } from "@/utils/lib/supabase";
import { userQueries } from "@/database/queries/user.queries";
import * as ImagePicker from "expo-image-picker";
import { decode } from "base64-arraybuffer";

export const useProfile = () => {
  const user = useAuthStore((s) => s.user);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);

  const loadData = async () => {
    try {
      if (!user?.id) return;

      // 1. Pehle Local SQLite se uthao (Instant)
      const localUser = userQueries.getFullUser();
      console.log("localUser", localUser);
      const localStats = userQueries.getStats();
      if (localUser) setProfile(localUser);
      if (localStats) setStats(localStats);
      setLoading(false);
      // 2. Background mein Supabase se fetch karo (Sync)

      const [pRes, sRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
        supabase
          .from("user_stats")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle(),
      ]);
      console.log("pRes", pRes);

      if (pRes.data) {
        console.log("Supabase Data:", pRes.data);
        setProfile(pRes.data);
        // SQLite update karo
        userQueries.saveUser(
          user.id,
          user.email!,
          pRes.data.full_name,
          true,
          pRes.data.avatar_url,
        );
      }
      if (sRes.data) {
        setStats(sRes.data);
        // SQLite update karo
        userQueries.saveStats(
          user.id,
          sRes.data.meals_count,
          sRes.data.waste_saved_kg,
          sRes.data.global_rank,
        );
      }
    } catch (e) {
      console.log("Offline mode: Using local data only.", e);
    }
  };

  const uploadAvatar = async () => {
    try {
      // 1. Image Pick karein (Cropping enabled)
      const result = await ImagePicker.launchImageLibraryAsync({
        // Naya syntax warning fix karne ke liye
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
        base64: true,
      });

      if (result.canceled || !result.assets[0].base64) return;

      setLoading(true);
      const file = result.assets[0];
      const fileExt = file.uri.split(".").pop();
      const filePath = `${user?.id}/avatar.${fileExt}`; // User folder structure

      // 2. Supabase Storage mein upload
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, decode(file.base64), {
          contentType: file.mimeType || "image/jpeg",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // 3. Public URL lein
      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath);

      // 4. Supabase Database (profiles table) update karein
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", user?.id);

      if (updateError) throw updateError;

      // 5. Local update (Optional but good for speed)
      // userQueries.updateAvatarLocal(user.id, publicUrl);

      await loadData(); // Data refresh karein
    } catch (error: any) {
      console.error("Upload error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateEmail = async (newEmail: string) => {
    const { error } = await supabase.auth.updateUser({ email: newEmail });
    if (error) throw error;
    return true;
  };

  const updatePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
    return true;
  };

  const deleteAccount = async () => {
    // 1. Sign out karein
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    return true;
  };

  useEffect(() => {
    loadData();
  }, [user?.id]);

  return { profile, stats, loading, refresh: loadData, uploadAvatar, updateEmail, updatePassword, deleteAccount };
};
