import React, { memo, useEffect } from "react";
import {
  Button,
  Text,
  XStack,
  YStack,
  Avatar,
  View,
  Separator,
  Spinner,
} from "tamagui";
import { useThemeColors } from "@/hooks/theme/useThemeColors";
import { useAuthStore } from "@/utils/store/useAuthStore";
import { useRouter } from "expo-router";
import { User2, Edit3, ShieldCheck } from "@tamagui/lucide-icons";
import { useProfile } from "@/hooks/(authenticated)/useProfile";

const StatItem = memo(
  ({
    label,
    value,
    color,
  }: {
    label: string;
    value: string;
    color: string;
  }) => (
    <YStack alignItems="center" flex={1}>
      <Text fontSize={16} fontWeight="800" color={color}>
        {value}
      </Text>
      <Text
        fontSize={10}
        fontWeight="600"
        color="$gray10"
        textTransform="uppercase"
        letterSpacing={0.5}
      >
        {label}
      </Text>
    </YStack>
  ),
);

const UserCard = () => {
  const { colors, fonts } = useThemeColors();
  const router = useRouter();

  // uploadAvatar ko hook se le liya
  const { profile, stats, loading, uploadAvatar } = useProfile();
  const email = useAuthStore((state) => state.user?.email);

  const fullName = profile?.full_name || "Chef";
  const avatarUrl = profile?.avatar_url || "";

  useEffect(() => {
    console.log("avatarUrl", avatarUrl);
  }, [avatarUrl]);
  const isPremium = profile?.is_premium || false;

  return (
    <YStack marginBottom="$6" marginTop="$2">
      {/* Profile Header */}
      <XStack alignItems="center" position="relative" paddingRight="$10">
        {/* Avatar Section - Now Pressable for Upload */}
        <View
          onPress={uploadAvatar}
          pressStyle={{ scale: 0.96, opacity: 0.9 }}
          padding={2}
          borderRadius={100}
          borderWidth={2}
          borderColor={isPremium ? "$gold" : colors.primary + "30"}
          marginRight="$4"
          position="relative"
        >
          <Avatar circular size="$6">
            {/* key={avatarUrl} dalne se image cache nahi hoti, foran update hoti hai */}
            <Avatar.Image src={avatarUrl} key={avatarUrl} />
            <Avatar.Fallback
              backgroundColor={colors.surface}
              alignItems="center"
              justifyContent="center"
            >
              {loading ? (
                <Spinner color={colors.primary} />
              ) : (
                <User2 size={24} color={colors.textSecondary} />
              )}
            </Avatar.Fallback>
          </Avatar>

          {/* Camera/Edit Badge */}
          <View
            position="absolute"
            bottom={0}
            right={0}
            backgroundColor={colors.primary}
            padding="$1"
            borderRadius={100}
            borderWidth={2}
            borderColor={colors.background}
            shadowColor="$shadowColor"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.2}
            shadowRadius={3}
          >
            <Edit3 size={10} color="white" />
          </View>
        </View>

        {/* User Info */}
        <YStack flex={1} justifyContent="center">
          <XStack alignItems="center" gap="$2">
            <Text
              fontSize={20}
              fontWeight="800"
              color={colors.text}
              fontFamily={fonts.bold?.fontFamily}
              numberOfLines={1}
              ellipsizeMode="tail"
              flexShrink={1}
            >
              {loading ? "Loading..." : fullName || "Chef"}{" "}
            </Text>
            {isPremium && (
              <ShieldCheck size={16} color="$gold" flexShrink={0} />
            )}
          </XStack>

          <Text
            fontSize={13}
            color={colors.textSecondary}
            fontFamily={fonts.medium?.fontFamily}
            opacity={0.7}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {email || "No email linked"}
          </Text>

          <View marginTop="$1.5" alignItems="flex-start">
            <View
              backgroundColor={isPremium ? "$gold" : colors.primary + "15"}
              paddingHorizontal="$2"
              paddingVertical="$0.5"
              borderRadius="$4"
            >
              <Text
                fontSize={9}
                fontWeight="900"
                color={isPremium ? "black" : colors.primary}
                textTransform="uppercase"
              >
                {isPremium ? "PREMIUM" : "FREE PLAN"}
              </Text>
            </View>
          </View>
        </YStack>

        {/* Edit Button (Link to Account Settings) */}
        <Button
          position="absolute"
          right={0}
          circular
          size="$3"
          backgroundColor={colors.surface}
          borderWidth={1}
          borderColor={colors.border}
          onPress={() => router.push("/(profile)/account")}
          icon={<Edit3 size={14} color={colors.text} />}
        />
      </XStack>

      {/* Stats Section */}
      <XStack
        marginTop="$6"
        justifyContent="space-between"
        alignItems="center"
        backgroundColor={colors.surface}
        padding="$4"
        borderRadius="$6"
        borderWidth={1}
        borderColor={colors.border}
      >
        <StatItem
          label="Meals"
          value={loading ? "..." : stats?.meals_count?.toString() || "0"}
          color={colors.primary}
        />
        <Separator vertical borderColor={colors.border} height={20} />
        <StatItem
          label="Saved"
          value={loading ? "..." : `${stats?.waste_saved_kg || 0}kg`}
          color={colors.accent}
        />
        <Separator vertical borderColor={colors.border} height={20} />
        <StatItem
          label="Rank"
          value={
            loading
              ? "..."
              : stats?.global_rank
                ? `#${stats.global_rank}`
                : "--"
          }
          color="$orange10"
        />
      </XStack>
    </YStack>
  );
};

export default memo(UserCard);
