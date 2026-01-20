import { FC, memo } from "react"
import { Button, Text, XStack, YStack, View } from "tamagui"
import { Trash2, Edit3, PackageOpen } from "@tamagui/lucide-icons"
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";
import { IngredientItemProps, Ingredient } from "@/utils/types/inventory";


export const IngredientItem: FC<IngredientItemProps> = memo(({
  item,
  index,
  onEdit,
  onDelete,
  colors,
}) => {
  // Safety check to prevent .length error
  if (!item) return null;

  const handleEdit = () => {
    if (Platform.OS === 'ios') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onEdit(index);
  }

  const handleDelete = () => {
    if (Platform.OS === 'ios') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    onDelete(index);
  }

  return (
    <YStack
      backgroundColor={colors.surface}
      borderWidth={1}
      borderColor={colors.border}
      paddingVertical="$3"
      paddingHorizontal="$4"
      borderRadius="$6"
      // Card jaisi styling manually
      shadowColor="#000"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.05}
      shadowRadius={5}
      elevation={2}
    >
      <XStack justifyContent="space-between" alignItems="center" space="$3">
        
        {/* Left Section */}
        <XStack flex={1} ai="center" space="$3">
          <View 
            p="$2" 
            br="$4" 
            bg={colors.primary + '15'} 
            ai="center" 
            jc="center"
          >
            <PackageOpen size={18} color={colors.primary} />
          </View>

          <YStack flex={1} space="$0.5">
            <Text 
              color={colors.text} 
              fontSize={16} 
              fontWeight="700"
              numberOfLines={1}
              textTransform="capitalize"
            >
              {item.name || "Unknown Item"}
            </Text>
            
            <XStack>
              <View bg={colors.border} px="$2" py="$0.5" br="$3">
                <Text color={colors.textSecondary} fontSize={10} fontWeight="700">
                  {item.quantity} {(item.unit || "").toUpperCase()}
                </Text>
              </View>
            </XStack>
          </YStack>
        </XStack>

        {/* Right Section */}
        <XStack space="$1">
          <Button
            icon={<Edit3 size={18} color={colors.textSecondary} />}
            size="$3.5"
            circular
            chromeless
            onPress={handleEdit}
            pressStyle={{ scale: 0.8, opacity: 0.7 }}
          />
          <View width={1} height={15} bg={colors.border} opacity={0.5} alignSelf="center" mx="$1" />
          <Button
            icon={<Trash2 size={18} color={colors.warning} />}
            size="$3.5"
            circular
            chromeless
            onPress={handleDelete}
            pressStyle={{ scale: 0.8, opacity: 0.7 }}
          />
        </XStack>
      </XStack>
    </YStack>
  )
})