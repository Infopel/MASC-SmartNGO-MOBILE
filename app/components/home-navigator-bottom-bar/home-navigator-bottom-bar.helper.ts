import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { IconProps } from "components/icon/icon"
import { HomeBottomTabNavigatorParamList } from "navigators"
export function findIconName(key: keyof HomeBottomTabNavigatorParamList): IconProps {
  switch (key) {
    case "home":
      return { name: "home", type: "material" }
    case "search":
      return { name: "search", type: "material" }
    case "stats":
      return { name: "pie-chart", type: "material" }
    case "settings":
      return { name: "settings", type: "material" }
    case "sync":
      return { name: "sync", type: "material-community" }

    default:
      throw new Error("Icon not known")
  }
}
