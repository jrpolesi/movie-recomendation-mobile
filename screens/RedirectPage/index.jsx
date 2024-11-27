import { WebView } from "react-native-webview";

export function RedirectPage({ navigation, route }) {
  const { requestToken } = route.params;

  const handleWebViewStateChange = async (event) => {
    if (event.url.includes("allow")) {
      navigation.navigate("Login", { requestToken });
    } else if (event.url.includes("deny")) {
      setTimeout(() => {
        navigation.navigate("Login");
      }, 5000);
    }
  };

  return (
    <WebView
      source={{
        uri: `https://www.themoviedb.org/authenticate/${requestToken}`,
      }}
      onNavigationStateChange={handleWebViewStateChange}
    />
  );
}
