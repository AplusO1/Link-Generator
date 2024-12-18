import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, Typography } from "@mui/material";
import { useAddLinkDialogReducer } from "../state/useAddLinkDialogReducer";

interface TransitionProps {
  children: React.ReactElement;
}

interface AddLinkDialogProps {
  isSimulation: boolean;
  setIsSimulation: (isSimulation: boolean) => void;
}

const Transition = React.forwardRef((props: TransitionProps, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));


const AddLinkDialog = ({ isSimulation, setIsSimulation }: AddLinkDialogProps) => {
  const { state, dispatch, handleOpenDialogAndGenerateLink } = useAddLinkDialogReducer();

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => handleOpenDialogAndGenerateLink(isSimulation)}>
        Добавить ссылку на ВКС
      </Button>

      <Button
        variant="contained"
        color={isSimulation ? "secondary" : "primary"}
        onClick={() => setIsSimulation(!isSimulation)}
        style={{ marginLeft: "10px" }}
      >
        {isSimulation ? "Отключить симуляцию" : "Включить симуляцию"}
      </Button>

      <Dialog open={state.open} onClose={() => dispatch({ type: "CLOSE_DIALOG" })} TransitionComponent={Transition}>
        <DialogTitle>Результат добавления ссылки</DialogTitle>
        <DialogContent>
          <Typography>{state.message}</Typography>
          {state.link && isSimulation && (
            <Typography style={{ marginTop: "10px" }}>
              <strong>Ссылка: </strong>
              <a href={state.link} target="_blank" rel="noopener noreferrer">
                {state.link}
              </a>
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dispatch({ type: "CLOSE_DIALOG" })} color="primary">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddLinkDialog;
