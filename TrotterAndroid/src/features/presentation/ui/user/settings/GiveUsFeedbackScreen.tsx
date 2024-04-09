import {StyleSheet, useColorScheme, View} from "react-native";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import HeaderSettings from "./components/HeaderSettings.tsx";
import {TicketCategory, TicketCategoryParams} from "../../../../model/TicketsModel.tsx";
import InputComponent from "../../../../../core/component/InputComponent.tsx";
import LoadingComponent from "../../../../../core/component/LoadingComponent.tsx";
import {settingStyle} from "./SettingStyle.tsx";
import ButtonComponent from "../../../../../core/component/ButtonComponent.tsx";
import MultiSelect from "react-native-multiple-select";
import {GlobalColors} from "../../../../../core/utils/style/GlobalStyle.tsx";
import ticketsRepositoryImpl from "../../../../data/TicketsRepositoryImpl.tsx";
import GetToken from "../../../../../core/utils/api/GetToken.tsx";
import {emailRegex} from "../../../../../core/utils/RegexUtils.ts";
import Toaster from "../../../../../core/utils/toaster/Toaster.tsx";

type GiveUsFeedbackProps = {
  isDarkMode: boolean,
}

const GiveUsFeedbackScreen = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<TicketCategoryParams>();
  const [token, setToken] = useState<string>("");
  const {t} = useTranslation();
  const isDarkMode: boolean = useColorScheme() === 'dark';
  const ticketsCategories = [
      {
        name: t("Feedbacks.Type.trips"),
        id: TicketCategory.trips,
      },
      {
        name: t("Feedbacks.Type.event"),
        id: TicketCategory.event,
      },
      {
        name: t("Feedbacks.Type.account"),
        id: TicketCategory.account,
      },
      {
        name: t("Feedbacks.Type.feedback"),
        id: TicketCategory.feedback,
      },
      {
        name: t("Feedbacks.Type.other"),
        id: TicketCategory.other,
      }
  ]

  const handleSubmitTicket = async () => {
    setIsLoading(true);
    try {
      await ticketsRepositoryImpl.createTicket(token, {
        userID: token,
        title: title,
        contactEmail: contactEmail,
        category: category?.id || TicketCategory.other,
        description: description
      }, {
        onSuccess: async (response) => {
          try {
            const resToJSON = await response.json();
            if (response.ok) {
              setTitle("");
              setContactEmail("");
              setCategory(undefined);
              setDescription("");
              Toaster({type: 'success', title: t("Feedbacks.Create.Success")});
            } else {
              throw new Error(resToJSON?.Message || 'Unknown error.');
            }
          } catch (error) {}
        },
        onFailure: (error) => {
          Toaster({type: 'error', title: t("Feedbacks.Create.Fail")});
          console.error('Ticket Submit Failed. Error:', error);
        },
      })
    } catch (error) {
      console.error('Unexpected error during the creation of a ticket:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    GetToken({setIsLoading, setToken});
  }, []);

  return (
    <View>
      <View style={settingStyle({isDarkMode: isDarkMode}).page}>
        <HeaderSettings title={"GiveUsFeedbacks"} navigation={navigation} />
        <View style={styles({isDarkMode: isDarkMode}).ticketContainer}>
          <InputComponent placeholder={t("Feedbacks.Title")} value={title} setValue={setTitle}/>
          <InputComponent placeholder={t("Email")} value={contactEmail} setValue={setContactEmail} />
          <View style={styles({isDarkMode: isDarkMode}).multiSelectContainer}>
            <MultiSelect
              hideTags
              items={ticketsCategories}
              onSelectedItemsChange={(items) => {setCategory(items[0])}}
              uniqueKey={"id"}
              displayKey={"name"}
              selectText={category == null ? t("Feedbacks.Type.Select") : t("Feedbacks.Type." + category)}
              searchInputPlaceholderText={t("Feedbacks.Type.Search")}
              styleDropdownMenu={styles({isDarkMode: isDarkMode}).multiSelectOutside}
              styleDropdownMenuSubsection={styles({isDarkMode: isDarkMode}).multiSelectInside}
              submitButtonText={t("Submit")}
              submitButtonColor={"#6290C3"}
            />
          </View>
          <InputComponent placeholder={t("Feedbacks.Description")} value={description} setValue={setDescription} height={"50%"}/>
          <ButtonComponent title={t("Submit")} width={120} onPress={handleSubmitTicket} disabled={!emailRegex.test(contactEmail) || title === "" || description === "" || category?.id === undefined}/>
        </View>
      </View>
      {isLoading && <LoadingComponent/>}
    </View>
  )
}

const styles = ({isDarkMode}: GiveUsFeedbackProps) => StyleSheet.create({
  ticketContainer: {
    marginTop: 25,
    margin: 10,
    width: "100%",
    height: 500,
    display: "flex",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between"
  },
  multiSelectContainer: {
    width: "80%",
    height: 45,
    display: "flex",
    zIndex: 2,
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#AAA",
    margin: 8,
  },
  multiSelectOutside: {
    paddingLeft: 20,
    paddingRight: 20,
    display: "flex",
    marginBottom: 0,
    padding: 0,
    borderRadius: 10,
  },
  multiSelectInside: {
    backgroundColor: isDarkMode ? GlobalColors.backgroundColor.dark : GlobalColors.backgroundColor.light,
  }
})

export default GiveUsFeedbackScreen;