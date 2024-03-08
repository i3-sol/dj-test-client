import React from "react"
import { Link } from "react-router-dom"

import Container from "@mui/material/Container"
import Grid from '@mui/material/Grid';

import { Box, Button, Paper } from "@mui/material"
import TextField from "@mui/material/TextField"
import Typography from '@mui/material/Typography';

import CreateIcon from "@mui/icons-material/Add"
import SaveIcon from "@mui/icons-material/Save"
import { getRequest, postRequest } from "../services"

const List = () => {

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
        setStatus({ isCreate: false, list: res })
    }

    React.useEffect(() => {
        getList()
    }, [])

    return (
        <Container>
            <Button
                variant="outlined"
                startIcon={<CreateIcon />}
                onClick={() => setStatus({ ...status, isCreate: !status.isCreate })}
            >
                Add New
            </Button>

            <Box sx={{ mt: 5 }}>
                {!!status.isCreate && (
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Title"
                                value={inputValue.title}
                                onChange={(e: any) => setInputValue({ ...inputValue, title: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={7}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Content"
                                value={inputValue.content}
                                onChange={(e: any) => setInputValue({ ...inputValue, content: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} alignItems="center" sm={6} md={2}>
                            <Button
                                onClick={onAdd}
                                fullWidth
                                variant="contained"
                                sx={{ py: 1.5 }}
                                endIcon={<SaveIcon />}
                            >
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Box>
            <Grid container spacing={2} alignItems="center">
                {status.list?.map((i, k) => (

                    <Grid item xs={12} sm={6}  key={k}>
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
    )
}

export default List;