import { useState } from "react";
import { Container, Typography } from "@mui/material";
import AddLinkDialog from "./components/AddLinkDialog";
import OutlookMock from "./components/OutlookMock";

const App = () => {
  const [isSimulation, setIsSimulation] = useState(true); //Состояние Симуляции

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Приложение для добавления ссылки на ВидеоКонференцию
      </Typography>
      <AddLinkDialog isSimulation={isSimulation} setIsSimulation={setIsSimulation} />
      <OutlookMock isSimulation={isSimulation} />
    </Container>
  );
};

export default App;
