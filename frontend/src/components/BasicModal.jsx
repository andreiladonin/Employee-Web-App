import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../api"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);

  const inputFullName = useRef()
  const inputAge = useRef()
  const inputPost = useRef()

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const sendData = async () => {
    props.setLoading(true)
    const [first_name, last_name] = inputFullName.current.value.split(' ')
    const age = +inputAge.current.value
    const post = inputPost.current.value

    try {
        const res = await api.post("/api/employees/", {
            first_name,
            last_name,
            age,
            post
        })
        handleClose()
        props.setLoading(false)
        
    } catch (error) {
        console.log(error)
    }

  }


  return (
    <div>
      <Button onClick={handleOpen}>Add Employee</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography margin={2} id="modal-modal-title" variant="h6" component="h2">
             Add Employee
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Full Name:
          </Typography>
          <TextField inputRef={inputFullName} variant="standard" />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Age
          </Typography>
          <TextField  inputRef={inputAge} variant="standard" />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Post:
          </Typography>
          <TextField inputRef={inputPost} variant="standard" />
          <br />
          <Button onClick={sendData}>Send data</Button>
        </Box>
      </Modal>
    </div>
  );
}