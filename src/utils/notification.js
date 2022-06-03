import { Button, notification } from "antd";

const audio = new Audio('alarm.mp3');
audio.preload = "auto";

export const timerComplete = (sound, browserNotifications, timer) => {
    timer.started = false; // останавливаем
    timer.time = 0;

    if (sound) {
        audio.currentTime = 0;
        audio.play();
    }

    // уведомление
    if (browserNotifications) {
        const notif = new Notification("Мультитаймер", {
            body: `Сработал ${timer.name}`,
            icon: "/logo192.png",
        });
        notif.onclick = () => {
            audio.pause();
        };
    } else {
        notification.open({
            message: `Сработал ${timer.name}`,
            description: (sound && (<Button type="primary" onClick={() => audio.pause()}>Звук выкл.</Button>)),
            duration: 12,
            onClose: () => {
                audio.pause();
            },
        });
    }
}
