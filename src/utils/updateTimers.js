import { timerComplete } from "./notification";

export const updateTimers = (timers, setTimers, sound, browserNotifications) => {
    const now = (new Date()).getTime() / 1000;
    setTimers(
        timers.map(t => {
            if (!t.started) {
                return t;
            }
            // количество секунд от текущего времени до того времени когда должен сработать таймер
            const nt = Math.max(0, Math.round((t.startedAt / 1000 + t.initialTime) - now));
            // игнорируем повторные срабатывания
            if (t.time !== nt) {
                t.time = nt;
                // таймер должен сработать
                if (t.time <= 0) {
                    timerComplete(sound, browserNotifications, t);
                }
            }
            return t;
        })
    );
}
