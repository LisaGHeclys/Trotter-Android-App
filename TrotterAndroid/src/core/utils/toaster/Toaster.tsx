import Toast, {ToastType} from "react-native-toast-message";
import {useTranslation} from "react-i18next";

type ToasterType = {
  type: ToastType,
  title: string,
  text?: string,
}

const Toaster = ({type, title, text = ""}: ToasterType) => {
  const {t} = useTranslation();

  Toast.show({
    type: type,
    text1: t(title),
    text2: t(text),
  });
}

export default Toaster;