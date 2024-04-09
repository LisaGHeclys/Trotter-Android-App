import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import UserSettingsScreen from "../../features/presentation/ui/user/settings/UserSettingsScreen.tsx";
import PersonalInformationScreen from "../../features/presentation/ui/user/settings/PersonalInformationScreen.tsx";
import GeneralSettingsScreen from "../../features/presentation/ui/user/settings/GeneralSettingsScreen.tsx";
import HelpCenterScreen from "../../features/presentation/ui/user/settings/HelpCenterScreen.tsx";
import GiveUsFeedbackScreen from "../../features/presentation/ui/user/settings/GiveUsFeedbackScreen.tsx";
import PrivacyAndPolicyScreen from "../../features/presentation/ui/user/settings/PrivacyAndPolicyScreen.tsx";
import TermsOfUseScreen from "../../features/presentation/ui/user/settings/TermsOfUseScreen.tsx";

const UserSettings = createNativeStackNavigator();

const UserSettingsNavigation = () => {
  return (
    <UserSettings.Navigator
      initialRouteName={"Settings"}
      screenOptions={{
        headerShown: false
      }}
    >
      <UserSettings.Screen name="Settings" component={UserSettingsScreen} />
      <UserSettings.Screen name="PersonalInformation" component={PersonalInformationScreen} />
      <UserSettings.Screen name="GeneralSettings" component={GeneralSettingsScreen} />
      <UserSettings.Screen name="HelpCenter" component={HelpCenterScreen} />
      <UserSettings.Screen name="GiveUsFeedbacks" component={GiveUsFeedbackScreen} />
      <UserSettings.Screen name="TermsOfUse" component={TermsOfUseScreen} />
      <UserSettings.Screen name="PrivacyAndPolicy" component={PrivacyAndPolicyScreen} />
    </UserSettings.Navigator>
  )
}

export default UserSettingsNavigation;
