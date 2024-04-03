import NotificationService from './notificationsService';
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

const randomMessages = [
    "notifications.ComeBack",
];

const selectRandomMessage = () => {
    return randomMessages[Math.floor(Math.random() * randomMessages.length)];
}

export const addRandomNotification = () => {
    NotificationService.getScheduledLocalNotifications((notifications) => {
        if (notifications.length === 0) {
            const date = new Date();
            date.setSeconds(date.getSeconds() + 10);
            NotificationService.scheduleNotification(date, 'Trotter', t(selectRandomMessage()), t(selectRandomMessage() + "Long"));
        }
    });
}

export const addNotificationUnsavedTrip = (city: string) => {
    const date = new Date();
    date.setSeconds(date.getSeconds() + 10);
    NotificationService.scheduleNotification(date, 'Trotter', t("notifications.UrTrip") + ` ${city}`, t("notifications.DontForget") + ` ${city}`);
}