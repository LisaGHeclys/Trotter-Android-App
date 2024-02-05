import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useTranslation } from "react-i18next";
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';

const LanguageComponent = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(i18next.language);
    const [items, setItems] = useState([
        { label: 'French', value: 'fr' },
        { label: 'English', value: 'en' },
    ]);

    return (
        <View style={styles.container}>
            <Text>{t("Language.Language")}</Text>
            <DropDownPicker
                open={open}
                value={selectedLanguage}
                items={items}
                setOpen={setOpen}
                setValue={setSelectedLanguage}
                setItems={setItems}
                onChangeValue={(value) => {
                    i18next.changeLanguage(value ? value : "en");
                    AsyncStorage.setItem('language', value ? value : "en");
                }}

                //theme="DARK"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom: 10,
        width: "80%",
        display: "flex",
        flexDirection: "column",
    },
});

export default LanguageComponent;