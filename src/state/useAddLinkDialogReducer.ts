import { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

interface State {
  open: boolean;
  link: string;
  message: string;
  isResponseReceived: boolean;
}

type Action =
  | { type: "OPEN_DIALOG"; link: string }
  | { type: "CLOSE_DIALOG" }
  | { type: "SET_MESSAGE"; message: string }
  | { type: "SET_RESPONSE_RECEIVED"; received: boolean };

const initialState: State = {
  open: false,
  link: "",
  message: "",
  isResponseReceived: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "OPEN_DIALOG":
      return { ...state, open: true, link: action.link };
    case "CLOSE_DIALOG":
      return { ...state, open: false, message: "", link: "" };
    case "SET_MESSAGE":
      return { ...state, message: action.message };
    case "SET_RESPONSE_RECEIVED":
      return { ...state, isResponseReceived: action.received };
    default:
      return state;
  }
};

export const useAddLinkDialogReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleOpenDialogAndGenerateLink = (isSimulation: boolean) => {
    const newLink = `https://video.example.com/meeting-${uuidv4()}`;
    dispatch({ type: "OPEN_DIALOG", link: newLink });

    console.log("Запрос к OutlookMock для получения описания");
    window.postMessage("getMeetingDescription", "*");

    dispatch({ type: "SET_RESPONSE_RECEIVED", received: false });
    dispatch({ type: "SET_MESSAGE", message: "" });

    const handleMessage = (event: MessageEvent) => {
      const resultMessage = isSimulation
        ? "Симуляция: ссылка сгенерирована!"
        : "Ошибка: не удалось получить данные от Outlook.";

      if (event.data && event.data.description !== undefined) {
        console.log("Получено описание встречи:", event.data.description);
      }

      dispatch({ type: "SET_MESSAGE", message: resultMessage });
      dispatch({ type: "SET_RESPONSE_RECEIVED", received: true });
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  };

  return {
    state,
    dispatch,
    handleOpenDialogAndGenerateLink,
  };
};
