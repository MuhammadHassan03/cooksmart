import React, { memo } from 'react'
import { Sheet, SheetProps, YStack } from 'tamagui'
import { useThemeColors } from "@/hooks/theme/useThemeColors"

interface CustomSheetProps extends Omit<SheetProps, 'children'> {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
  snapPoints?: (string | number)[]
}

export const CustomSheet = memo(({ 
  open, 
  onOpenChange, 
  children, 
  snapPoints = [85, 50], 
  ...props 
}: CustomSheetProps) => {
  const { colors } = useThemeColors()

  return (
    <Sheet
      modal
      open={open}
      onOpenChange={onOpenChange}
      snapPoints={snapPoints}
      dismissOnSnapToBottom
      // 1. Z-Index ko barha diya
      zIndex={200_000}
      animation="medium"
      moveOnKeyboardChange
      forceRemoveScrollEnabled={open}
      // 2. PortalProps add kiye taake ye Bottom Tabs ke upar render ho
      portalProps={{
        stackZIndex: 200_000,
      }}
      {...props}
    >
      <Sheet.Overlay 
        animation="lazy"
        enterStyle={{ opacity: 0 }} 
        exitStyle={{ opacity: 0 }} 
        backgroundColor="rgba(0,0,0,0.5)"
      />
      
      <Sheet.Handle backgroundColor={colors.border} />
      
      <Sheet.Frame 
        padding="$4" 
        // 3. Bottom padding add ki taake navigation bar se gap rahe
        paddingBottom="$10" 
        backgroundColor={colors.surface}
        borderTopLeftRadius="$10"
        borderTopRightRadius="$10"
        jc="flex-start" 
      >
        <YStack f={1} gap="$4">
           {children}
        </YStack>
      </Sheet.Frame>
    </Sheet>
  )
})

CustomSheet.displayName = 'CustomSheet'