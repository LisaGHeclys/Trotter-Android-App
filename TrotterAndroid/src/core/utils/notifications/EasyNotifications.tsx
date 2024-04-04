import NotifService from './NotificationsService';

export const AddRandomNotification = (title: string, message: string) => {
    NotifService.getScheduledLocalNotifications((notifications) => {
        if (notifications.length === 0) {
            const date = new Date();
            date.setSeconds(date.getSeconds() + 10);
            NotifService.scheduleNotification(date, 'Trotter', title, message);
        }
    });
}

export const AddNotificationUnsavedTrip = (title: string, message: string) => {
    const date = new Date();

    date.setSeconds(date.getSeconds() + 10);
    NotifService.scheduleNotification(date, 'Trotter', title, message);
}