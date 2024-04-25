import { useEffect, useRef, useState } from 'react';
import {useNavigate} from "react-router-dom"
import { Typography, Box, TextField, CircularProgress } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import MyContainer from '../components/MyContainer';
import api from '../api';
import BasicModal from '../components/BasicModal';

function Home () {

    const [employees, setEmployees] = useState([])
    const [isLoading, setLoaging] = useState(false);

    useEffect(()=> {
        async function fetchData () {
            try{
                const res = await api.get("api/employees/")
                setEmployees(res.data)
            } catch (e){
                console.log(e)
            }
        }
        fetchData()
    }, [isLoading])

    if(isLoading) {
        return <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
    }  else {

        return <>
            <MyContainer>
                <Typography margin={2} variant='h3'>
                    Employees
                </Typography>
                <BasicModal setLoading={setLoaging}/>          
                {
                    employees?.map(emp => (
                        <Box key={emp.id} margin={3}>
                            <Card  sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                # ID {emp.id}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {emp.first_name + " " + emp.last_name}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Age {emp.age}
                                </Typography>
                                <Typography variant="body2">
                                Post {emp.post}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                            </Card>
                        </Box>
                        
                    ))
                }

                
            </MyContainer>
        </>
    }
}
export default Home