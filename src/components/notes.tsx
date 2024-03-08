import React from "react"
import { deleteRequest, getRequest, putRequest } from "../services";
import { useLocation, useNavigate } from "react-router-dom";

import Typography from '@mui/material/Typography';
import { Box, Button, Container, Paper, Stack } from "@mui/material";
import TextField from "@mui/material/TextField"

const Notes = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate()
    const [status, setStatus] = React.useState({} as { id: number, title: string, content: string })
    const [isEdit, setIsEdit] = React.useState(false)
    const [editValue, setEditValue] = React.useState({} as { id: number, title: string, content: string })
    const getList = async () => {
        const res = await getRequest('notes');
        const _id = pathname.split("/")[pathname.split("/").length - 1]
        const _note = res.find((i: any) => i.id === Number(_id))
        setStatus(_note)
        setEditValue(_note)
    }

    React.useEffect(() => {
        getList()
    }, [])

    const onSave = async () => {
        const res = await putRequest("notes", editValue.id, editValue)
        if (!!res && res.status === 205) {
            setStatus(editValue)
            setIsEdit(false)
        }
    }

    const onDelete = async () => {
        await deleteRequest("notes", status.id)
        navigate("/")
    }

    return (
        <Container>
            <Paper sx={{ m: 5, p: 5 }}>
                {isEdit ?
                    (<Stack spacing={3}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Title"
                            value={editValue.title}
                            onChange={(e: any) => setEditValue({ ...editValue, title: e.target.value })}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Content"
                            value={editValue.content}
                            multiline
                            minRows={5}
                            maxRows={8}
                            onChange={(e: any) => setEditValue({ ...editValue, content: e.target.value })}
                        />
                    </Stack>)
                    :
                    (<>
                        <Typography gutterBottom variant="h4" component="div">{status.title}</Typography>
                        <Typography gutterBottom variant="h6" component="div">{status.content}</Typography>
                    </>)
                }
                <Stack mt={4} direction="row" justifyContent="start" spacing={2}>
                    <Button variant="outlined" color={!isEdit ? "secondary" : "primary"} onClick={() => setIsEdit(!isEdit)}>{!isEdit ? "Edit" : "Cancel"}</Button>
                    <Button
                        onClick={!isEdit ? onDelete : onSave}
                        variant="outlined"
                        color={!isEdit ? "error" : "success"}
                    >
                        {!isEdit ? "Delete" : "Save"}
                    </Button>
                </Stack>
            </Paper>
        </Container>
    )
}

export default Notes