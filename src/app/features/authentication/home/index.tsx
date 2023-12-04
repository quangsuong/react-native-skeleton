import { Screen, Text } from "@components";
import { APP_SCREEN } from "@navigation/screen-types";
import isEqual from "react-fast-compare";
import { memo } from "react";

const HomeComponent = () => {
  return(<Screen name={APP_SCREEN.LOGIN}>
    <Text>'Login</Text>
  </Screen>)
}
const Home = memo(HomeComponent, isEqual)
export default Home;
