import Icon from "@expo/vector-icons/FontAwesome6";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useSessionContext } from "../../contexts/index.jsx";
import { useLogout } from "../../hooks/index.jsx";

export function CustomDrawerContent(props) {
  const { session } = useSessionContext();
  const { logout, isLoading } = useLogout();

  const isAuthenticated = !!session?.id;
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {isAuthenticated && (
        <>
          <DrawerItem
            label="Sair"
            onPress={async () => {
              await logout();
              props?.navigation?.closeDrawer();
            }}
            icon={() =>
              isLoading ? (
                <ActivityIndicator size={15} />
              ) : (
                <Icon size={15} name="arrow-right-from-bracket" />
              )
            }
          />
        </>
      )}
    </DrawerContentScrollView>
  );
}
