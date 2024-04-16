import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faBookmark, faGlobe, faHeart, faUser} from "@fortawesome/free-solid-svg-icons";
import UserHomeScreen from "../../features/presentation/ui/user/homescreen/UserHomeScreen.tsx";
import UserSavedTripsScreen from "../../features/presentation/ui/user/UserSavedTripsScreen.tsx";
import UserLikedScreen from "../../features/presentation/ui/user/UserLikedScreen.tsx";
import UserSettingsNavigation from "./UserSettingsNavigation.tsx";

const Tab = createBottomTabNavigator();

const UserBottomBarNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName={"Home"}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={UserHomeScreen}
        options={{
          tabBarLabel: () => { return null },
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faGlobe} size={25} />
            //need to put active and inactive colors
          ),
        }}
      />
      <Tab.Screen
        name="Trips"
        component={UserSavedTripsScreen}
        options={{
          tabBarLabel: () => { return null },
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faBookmark} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Liked ?"
        component={UserLikedScreen}
        options={{
          tabBarLabel: () => { return null },
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faHeart} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="UserSettings"
        component={UserSettingsNavigation}
        options={{
          tabBarLabel: () => { return null },
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faUser} size={25} />
          ),
          tabBarStyle: { display: "none" },
        }}
      />
    </Tab.Navigator>
  );
}

export default UserBottomBarNavigation;
