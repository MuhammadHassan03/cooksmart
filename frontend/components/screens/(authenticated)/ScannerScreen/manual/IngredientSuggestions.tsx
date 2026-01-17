import { FC } from "react"
import { FlatList, TouchableOpacity } from "react-native"
import { Text } from "tamagui"

type IngredientSuggestionsProps = {
  suggestions: string[]
  query: string
  onSelect: (value: string) => void
  textColor: string
}

export const IngredientSuggestions: FC<IngredientSuggestionsProps> = ({
  suggestions,
  query,
  onSelect,
  textColor,
}) => {
  const filtered = suggestions.filter(s =>
    s.toLowerCase().includes(query.toLowerCase())
  )

  if (query.length === 0 || filtered.length === 0) return null

  return (
    <FlatList
      data={filtered}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onSelect(item)}>
          <Text color={textColor} paddingVertical={4}>
            {item}
          </Text>
        </TouchableOpacity>
      )}
    />
  )
}
