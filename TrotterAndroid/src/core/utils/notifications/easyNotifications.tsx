import NotifService from './NotificationsService';
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

const randomMessages = [
    "notifications.ComeBack",
];

const SelectRandomMessage = () => {
    return randomMessages[Math.floor(Math.random() * randomMessages.length)];
}

export const AddRandomNotification = () => {
    NotifService.getScheduledLocalNotifications((notifications) => {
        if (notifications.length === 0) {
            const date = new Date();
            date.setSeconds(date.getSeconds() + 10);
            NotifService.scheduleNotification(date, 'Trotter', t(SelectRandomMessage()), t(SelectRandomMessage() + "Long"));
        }
    });
}

export const AddNotificationUnsavedTrip = (city: string) => {
    const date = new Date();
    date.setSeconds(date.getSeconds() + 10);
    NotifService.scheduleNotification(date, 'Trotter', t("notifications.UrTrip") + ` ${city}`, t("notifications.DontForget") + ` ${city}`);
}