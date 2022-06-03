import { DeleteTwoTone, PlayCircleFilled, StopFilled, LeftCircleFilled, RightCircleFilled, DownCircleFilled, UpCircleFilled, EditFilled } from "@ant-design/icons";
import { Button, Card, Col, Input, Progress, Space, Popconfirm, Grid } from "antd";
import ButtonGroup from "antd/lib/button/button-group";
import { useState } from "react";
import TimePicker from "./TimePicker";

const { useBreakpoint } = Grid;

const Timer = ({ name, started, start, stop, setName, initialTime, time, setTime, remove, index, first, last, moveTimer }) => {
    const [edit, setEdit] = useState(false);
    const toggleEdit = () => {
        setEdit(!edit);
    }
    const screens = useBreakpoint();
    let seconds = ("0" + (Math.floor(time) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(time / 60) % 60)).slice(-2);
    let hours = ("0" + Math.floor(time / 3600)).slice(-2);
    return <Col xs={24} sm={12} md={12} lg={8} xl={6}>
        <Card
            index={index}
            title={
                edit
                    ? (<Input value={name} onChange={ev => setName(ev.target.value)} />)
                    : (<div style={{ height: 32, overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>{name}</div>)
            }
            actions={[
                <Button type='primary' block title='Запуск' onClick={start} disabled={started || initialTime === 0} icon={<PlayCircleFilled />}>Запуск</Button>,
                <Button type='danger' block title='Стоп' onClick={stop} disabled={!started} icon={<StopFilled />}>Стоп</Button>,
            ]}
            bodyStyle={{ padding: 4 }}
            style={{ padding: 4, margin: 4 }}
        >
            <Space align="baseline" style={{ justifyContent: "flex-end", display: "flex" }}>
                {edit
                    ? (<ButtonGroup>
                        <Popconfirm
                            title="Удалить таймер?"
                            onConfirm={remove}
                            okText="Да"
                            cancelText="Нет">
                            <Button icon={<DeleteTwoTone />}></Button>
                        </Popconfirm>
                        <Button onClick={toggleEdit} icon={<EditFilled />}></Button>
                    </ButtonGroup>)
                    : (<ButtonGroup>
                        <Button disabled={first} onClick={() => moveTimer(-1)} icon={screens.sm ? <LeftCircleFilled /> : <UpCircleFilled />}></Button>
                        <Button disabled={last} onClick={() => moveTimer(1)} icon={screens.sm ? <RightCircleFilled /> : <DownCircleFilled />}></Button>
                        <Button onClick={toggleEdit} icon={<EditFilled />}></Button>
                    </ButtonGroup>)}
            </Space>
            <Space direction="vertical" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {screens.sm
                    ? (<Progress type="circle" status="active" percent={100 - (time / initialTime * 100)} format={percent => `${hours}:${minutes}:${seconds}`} width={200} />)
                    : (<Progress size="large" status="active" percent={100 - (time / initialTime * 100)} format={percent => `${hours}:${minutes}:${seconds}`} width={200} style={{ width: "200px" }} />)
                }
                <TimePicker disabled={started} time={initialTime} setTime={setTime} />
            </Space>
        </Card>
    </Col>;
}

export default Timer;
