import React from "react";
import {ScrollView} from "react-native";
import HeaderSettings from "./components/HeaderSettings.tsx";
import DropdownSettings from "./components/DropdownSettings.tsx";

const PrivacyAndPolicyScreen = ({navigation}: any) => {
  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <HeaderSettings title={"PrivacyAndPolicy"} navigation={navigation} />
      <ScrollView>
        <DropdownSettings title={"PrivacyAndPolicies.Introduction"} text={"PrivacyAndPolicies.IntroductionText"}/>
        <DropdownSettings title={"PrivacyAndPolicies.PurposeOfCollection"} text={"PrivacyAndPolicies.PurposeOfCollectionText"}/>
        <DropdownSettings title={"PrivacyAndPolicies.DataUsage"} text={"PrivacyAndPolicies.DataUsageText"}/>
        <DropdownSettings title={"PrivacyAndPolicies.DataSharing"} text={"PrivacyAndPolicies.DataSharingText"}/>
        <DropdownSettings title={"PrivacyAndPolicies.UserRights"} text={"PrivacyAndPolicies.UserRightsText"}/>
        <DropdownSettings title={"PrivacyAndPolicies.ContactInformation"} text={"PrivacyAndPolicies.ContactInformationText"}/>
      </ScrollView>
    </ScrollView>
  )
}

export default PrivacyAndPolicyScreen;