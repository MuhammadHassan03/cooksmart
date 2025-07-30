import { Toast, useToastState } from '@tamagui/toast'
import { useTheme, Text, YStack } from 'tamagui'

export const ThemedToast = () => {
  const toast = useToastState()
  const theme = useTheme()

  if (!toast || toast.isHandledNatively) return null

  const preset = toast?.customData?.preset ?? 'info'

  const backgroundColor = {
    success: theme.success?.val,
    error: theme.error?.val,
    warning: theme.warning?.val,
    info: theme.info?.val,
  }[preset]

  const textColor = theme.text?.val ?? '#000'
  const shadowColor = theme.shadow?.val ?? 'rgba(0,0,0,0.1)'

  return (
    <Toast
      key={toast.id}
      duration={toast.duration}
      elevate
      enterStyle={{ y: 20, opacity: 0 }}
      exitStyle={{ y: 20, opacity: 0 }}
      animation="medium"
      backgroundColor={backgroundColor}
      borderRadius="$4"
      shadowColor={shadowColor}
      shadowOffset={{ width: 0, height: 4 }}
      shadowRadius={12}
      shadowOpacity={0.15}
      padding="$4"
      margin="$3"
    >
      <YStack>
        <Text fontWeight="700" fontSize="$5" color={textColor}>
          {toast.title}
        </Text>
        {toast.message && (
          <Text fontSize="$3" color={textColor} opacity={0.85}>
            {toast.message}
          </Text>
        )}
      </YStack>
    </Toast>
  )
}