import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";

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
            variant="contained"
            size="large"
            fullWidth
            onClick={() => handleConfirm(selectedRow.id)}
            style={{
              backgroundColor: "#56b13d",
              marginRight: "3rem",
              marginTop: "2rem",
              marginBottom: "1rem",
            }}
          >
            Bevestig
          </Button>
          <Button
            onClick={handleClose}
            variant="outlined"
            size="large"
            fullWidth
            style={{
              borderColor: "#ED0034",
              borderWidth: "2px",
              marginTop: "2rem",
              marginBottom: "1rem",
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
