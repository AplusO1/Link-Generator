//Заглушка OUTLOOK
import { useEffect } from "react";

interface OutlookMockProps {
  isSimulation: boolean;
}

const OutlookMock = ({ isSimulation }: OutlookMockProps) => {
  useEffect(() => {
    const fakeMeetingItem = { description: "Описание встречи" };
    // Отправка сообщения, когда приходит запрос на описание встречи
    const handleMessage = (event: MessageEvent) => {
      if (event.data === "getMeetingDescription" && isSimulation) {
        console.log("Имитация: отправка описания встречи.");
        window.postMessage({ description: fakeMeetingItem.description }, "*");
      } else if (event.data === "getMeetingDescription" && !isSimulation) {
        console.log("Симуляция выключена: не отправляем описание.");
      }
    };

    window.addEventListener("message", handleMessage);

    // Очищаем при размонтирование
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [isSimulation]);

  return <div style={{ display: "none" }}>Mock Outlook</div>;
};

export default OutlookMock;
