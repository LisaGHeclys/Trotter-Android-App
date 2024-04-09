import Toast, {ToastType} from "react-native-toast-message";
import {useTranslation} from "react-i18next";

type ToasterType = {
  type: ToastType,
  title: string,
  text?: string,
}

const Toaster = ({type, title, text = ""}: ToasterType) => {

  Toast.show({
    type: type,
    text1: title,
    text2: text,
  });
}

export default Toaster;