import { useRef, useState } from 'react';
import {useNavigate} from "react-router-dom"
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {useForm} from "react-hook-form";
import { useFormik } from "formik";
import { Typography, Box, TextField, Button, CircularProgress } from '@mui/material';
import MyContainer from '../components/MyContainer';
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

const schema = yup.object({
    //name is required with minimum length of 8
    username: yup.string()
    .min(3)
    .required(),
    // password is required with minimum length of 8
    password: yup.string()
    .min(8)
    .required()

});
    

function Login () {
    const [isLoading, setLoaging] = useState(false);


    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
          username: "",
          password: "",
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            setLoaging(true)
            try{
                const res = await api.post('api/token/', values); 
                
                const data = await res.data
                localStorage.setItem(ACCESS_TOKEN, data.access)
                localStorage.setItem(REFRESH_TOKEN, data.refresh)
                navigate("/")
            } catch (e){
                alert(e)
            }
            finally {
                setLoaging(false)
            }
        },
      });


    if(isLoading) {
        return <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
    }  else {
    return <>
            <MyContainer>
                <Typography margin={1} variant='h3' align='center' color="#3f51b5">Sign in</Typography>
                <form noValidate onSubmit={formik.handleSubmit} >
                    <Box margin={2} textAlign='center'>
                        <Box marginBottom={2} >
                            <TextField fullWidth={true}  id="username" label="Username" type='text' variant="standard" 
                                        onChange={formik.handleChange}
                                        value={formik.values.username}
                                        helperText={formik.errors.username ? formik.errors.username : ""}/>
                        </Box>
                        <Box marginBottom={2}>
                            <TextField  fullWidth={true} id="password" label="Password" type='password' variant="standard"            
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            helperText={formik.errors.password ? formik.errors.password : ""} />
                        </Box>
                    </Box>
                    <Box textAlign='center'>
                        <Button type='submit'  variant='contained'>
                            Sign in
                        </Button>
                    </Box>
                </form>
            </MyContainer>
        </>
    }    
}

export default Login