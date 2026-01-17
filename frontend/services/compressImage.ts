import * as ImageManipulator from "expo-image-manipulator";

export const compressImage = async (uri: string) => {
  const manipulatedImage = await ImageManipulator.manipulateAsync(
    uri,
    [],
    { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG },
  );
  return manipulatedImage.uri;
};
