import Timer from "./Timer";

const Timers = ({ items, setTimers }) => {
    const setTime = (idx, time) => {
        setTimers(items.map((t, id) => id !== idx ? t : { ...t, time: time, initialTime: time }));
    };
    const initialTimer = (idx) => {
        setTimers(items.map((t, id) => id !== idx ? t : { ...t, started: true, time: t.initialTime, startedAt: (new Date()).getTime() }));
    };
    const stopTimer = (idx) => {
        setTimers(items.map((t, id) => id !== idx ? t : { ...t, started: false }));
    };
    const setTimerName = (idx, name) => {
        setTimers(items.map((t, id) => id !== idx ? t : { ...t, name }));
    };
    const deleteTimer = (idx) => {
        setTimers(items.filter((t, id) => id !== idx));
    };
    const moveTimer = (idx, offset) => {
        [items[idx], items[idx + offset]] = [items[idx + offset], items[idx]];
        setTimers(items);
    };
    return items.map((t, idx) => <Timer
        key={`item-${idx}`}
        index={idx}
        first={idx === 0}
        last={idx === (items.length-1)}
        name={t.name}
        started={t.started}
        time={t.time || 0}
        initialTime={t.initialTime || 0}
        setTime={(time) => setTime(idx, time)}
        start={() => initialTimer(idx)}
        stop={() => stopTimer(idx)}
        setName={(name) => setTimerName(idx, name)}
        remove={() => deleteTimer(idx)}
        moveTimer={(offset) => moveTimer(idx, offset)}
    />);
}

export default Timers;
