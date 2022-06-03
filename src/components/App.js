import { useEffect, useState } from 'react';
import { CopyTwoTone, PlusCircleFilled, ClearOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Layout, message, Popconfirm, Row, Switch } from 'antd';

import useInterval from '../hooks/interval';
import useLocalStorage from '../hooks/local';
import { copyTextToClipboard } from '../utils/clipboard';
import { configFromLink } from '../utils/configFromLink';
import { defaultTimer } from '../utils/timerTemplate';
import { updateTimers } from '../utils/updateTimers';

import Timers from './Timers';

const { Footer } = Layout;

function App() {
  const [browserNotifications, setNotifications] = useLocalStorage("notifications", false); // доступны ли нативные уведомления
  const [sound, setSound] = useLocalStorage("sound", true); // включен ли звук
  const [timers, setTimers] = useLocalStorage("timers", configFromLink()); // хранилище таймеров
  const [url, setUrl] = useState(""); // генерируемая ссылка на кофигурацию

  // Действия при открытии приложения:
  // 1. Инициализация конфигурации из адреса
  // 2. Запрос разрешений на уведомления
  useEffect(() => {
    if (window.location.hash !== "") {
      setTimers(configFromLink());
      window.location.hash = "";
    }
    Notification.requestPermission().then((result) => {
      if (result === 'granted') {
        setNotifications(true);
      } else {
        setNotifications(false);
      }
    });
    // eslint-disable-next-line
  }, []);

  // Формирование ссылки на конфигурацию при обновлении таймеров
  useEffect(() => {
    const d = timers.map(t => [t.name, t.initialTime]);
    setUrl(btoa(unescape(encodeURIComponent(JSON.stringify(d)))));
  }, [timers]);

  // Обновление таймеров
  useInterval(updateTimers.bind(this, timers, setTimers, sound, browserNotifications), 100, true); // интервал опроса таймеров - 100мс потому что если вкладка с таймерами в фоне, браузер начинает заметлять работу js

  return <Layout>
    <Row>
      <Col xs={24} sm={12} md={12} lg={8} xl={6}>
        <Card
          title={<strong><img alt="Мультитаймер" src="/logo192.png" style={{ height: 32, width: 32 }} />&nbsp;Мультитаймер</strong>}
          bodyStyle={{ padding: 4 }}
          style={{ padding: 4, margin: 4 }}
        >
          <Form layout='vertical'>
            <Form.Item>
              <Button type={'primary'} block onClick={() => setTimers([...timers, { ...defaultTimer }])} icon={<PlusCircleFilled />}>Добавить таймер</Button>
            </Form.Item>
            <Form.Item label="Звук таймера">
              <Switch checkedChildren="Включен" unCheckedChildren="Отключен" checked={sound} onChange={x => setSound(x)} />
            </Form.Item>
            <Form.Item label="Ссылка на конфигурацию">
              <Input
                readOnly
                value={`https://timer.neonxp.dev/#${url}`}
                addonAfter={<CopyTwoTone onClick={() => {
                  copyTextToClipboard(`https://timer.neonxp.dev/#${url}`)
                  message.success("Скопировано в буфер обмена")
                }} />}
              />
            </Form.Item>
            <Form.Item>
              <Popconfirm
                title="Очистить таймеры?"
                onConfirm={() => setTimers([])}
                okText="Да"
                cancelText="Нет">
                <Button type={'ghost'} block icon={<ClearOutlined />}>Очистить</Button>
              </Popconfirm>
            </Form.Item>
          </Form>
        </Card>
      </Col>
      <Timers
        items={timers}
        setTimers={setTimers}
      />
    </Row>
    <Footer>
      Сделал в 2022г <a href="https://neonxp.dev/">Александр NeonXP Кирюхин</a>.
    </Footer>
  </Layout>;
}

export default App;
