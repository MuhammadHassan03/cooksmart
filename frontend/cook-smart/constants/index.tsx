import Constants from "expo-constants";


export const appName = Constants.manifest?.name?.split("-").join(" ").toUpperCase() || "Cook Smart";
