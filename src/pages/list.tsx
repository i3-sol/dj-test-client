import React, { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"

import Container from "@mui/material/Container"
import Grid from '@mui/material/Grid';

import { Box, Button, Modal, Paper, Stack } from "@mui/material"
import TextField from "@mui/material/TextField"
import Typography from '@mui/material/Typography';

import CreateIcon from "@mui/icons-material/Add"
import SaveIcon from "@mui/icons-material/Save"

import { useGlobalContext } from "../provider";
import { getRequest, postRequest } from "../services"
import Layout from "../components/layout";
import { showToast } from "../utils";

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 10,
    pt: 5,
    px: 4,
    pb: 3,
};

const List = () => {
    const [state, {dispatch}] = useGlobalContext()
    const navigate = useNavigate()

    const [status, setStatus] = React.useState({
        list: [] as Array<{
            id: number,
            title: string,
            content: string
        }>,
        isCreate: false
    })

    const [inputValue, setInputValue] = React.useState({} as { title: string, content: string })

    const getList = async () => {
        const res = await getRequest('notes');
        setStatus({ ...status, list: res })
    }

    const onAdd = async () => {
        setInputValue({ title: "", content: "" })
        const res = await postRequest("notes", inputValue)
        if (res.status === 201) {
            setStatus({ isCreate: false, list: res })
        } else {
            showToast(res.statusText, "error")
        }
        
    }

    // React.useEffect(() => {
    //     if (!state.isAuth) {
    //         navigate("/login")
    //     }
    // }, [state])

    React.useEffect(() => {
        getList()
    }, [])

    return (
        <Layout>
            <Container>
                <Button
                    variant="outlined"
                    startIcon={<CreateIcon />}
                    onClick={() => setStatus({ ...status, isCreate: !status.isCreate })}
                >
                    Add New
                </Button>

                <Modal open={status.isCreate} onClose={() => setStatus({ ...status, isCreate: false })}>
                    <Box sx={{ ...modalStyle, width: 700 }}>
                        <Typography sx={{ textAlign: "center", pb: 2 }} gutterBottom variant="h5" component="div">Add New Note</Typography>
                        <Stack direction="column" spacing={3}>
                            <TextField
                                variant="outlined"
                                label="Title"
                                value={inputValue.title}
                                onChange={(e: any) => setInputValue({ ...inputValue, title: e.target.value })}
                            />
                            <TextField
                                variant="outlined"
                                label="Content"
                                multiline
                                rows={6}
                                value={inputValue.content}
                                onChange={(e: any) => setInputValue({ ...inputValue, content: e.target.value })}
                            />
                            <Button
                                onClick={onAdd}
                                variant="contained"
                                sx={{ py: 1.5 }}
                                endIcon={<SaveIcon />}
                            >
                                Save
                            </Button>
                        </Stack>
                    </Box>
                </Modal>
                <Grid container spacing={2} alignItems="center">
                    {status.list?.map((i, k) => (

                        <Grid item xs={12} sm={6} key={k}>
                            <Link to={`notes/${i.id}`}>
                                <Paper
                                    elevation={1}
                                    sx={{
                                        borderRadius: "10px",
                                        p: 2,
                                        my: 2
                                    }}
                                >
                                    <Typography gutterBottom variant="h5" component="div">{i.title}</Typography>
                                    <Typography gutterBottom component="div">{i.content}</Typography>
                                </Paper>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Container >
        </Layout>
    )
}

export default List;