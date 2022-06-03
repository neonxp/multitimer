import { InputNumber } from "antd";

const TimePicker = ({ setTime, time, disabled }) => {
    const seconds = parseInt(Math.floor(time) % 60);
    const minutes = parseInt(Math.floor(time / 60) % 60);
    const hours  = parseInt(Math.floor(time / 3600));
    const updateHours = (hours) => {
        setTime(parseInt(hours)*3600+parseInt(minutes)*60+parseInt(seconds));
    }
    const updateMinutes = (minutes) => {
        setTime(parseInt(hours)*3600+parseInt(minutes)*60+parseInt(seconds));
    }
    const updateSeconds = (seconds) => {
        setTime(parseInt(hours)*3600+parseInt(minutes)*60+parseInt(seconds));
    }
    return <>
        <InputNumber disabled={disabled} type="number" min={0} max={24} style={{width: '90px'}} value={hours} onChange={x => {updateHours(x)}} addonAfter={`ч`} />
        <InputNumber disabled={disabled} type="number" min={0} max={59} style={{width: '90px'}} value={minutes} onChange={x => {updateMinutes(x)}} addonAfter={`м`} />
        <InputNumber disabled={disabled} type="number" min={0} max={59} style={{width: '90px'}} value={seconds} onChange={x => {updateSeconds(x)}} addonAfter={`с`} />
    </>;
}
export default TimePicker;
