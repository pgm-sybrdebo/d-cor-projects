import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { Button } from "@mui/material";

interface ConfirmDialogProps {
  selectedRow: any;
  title: string;
  message: string;
  open: boolean;
  handleClose: () => void;
  handleConfirm: (id: number) => void;
}

const ConfirmDialog = ({
  selectedRow,
  title,
  message,
  open,
  handleClose,
  handleConfirm,
}: ConfirmDialogProps) => {
  return (
    <Dialog open={open}>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Typography>{message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            size="large"
            fullWidth
            onClick={() => handleConfirm(selectedRow.id)}
            sx={{
              borderWidth: 2,
              borderColor: "#56B13D",
              backgroundColor: "#56B13D",
              marginRight: "3rem",
              marginTop: "1rem",
              marginBottom: "1rem",
              color: "#FFF",
              ":hover": {
                borderWidth: 2,
                borderColor: "#56B13D",
                bgcolor: "#FFF",
                color: "#56B13D",
              },
            }}
          >
            Bevestig
          </Button>
          <Button
            onClick={handleClose}
            variant="outlined"
            size="large"
            fullWidth
            sx={{
              borderColor: "#ED0034",
              color: "#ED0034",
              borderWidth: 2,
              marginTop: "1rem",
              marginBottom: "1rem",
              ":hover": {
                borderColor: "#ED0034",
                color: "#FFF",
                borderWidth: 2,
                bgcolor: "rgba(238, 0, 52, 0.4)",
              },
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ConfirmDialog;
