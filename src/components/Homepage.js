import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useGetUsersQuery, useDeleteUserMutation } from "../services/apiSlice";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ShowPopup from "./ShowPopup";
import "../app.css";

const Homepage = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [popupContent, setPopupContent] = useState("");
    const [userData, setUserData] = useState();

    const [deleteUser] = useDeleteUserMutation();
    const { data: users } = useGetUsersQuery();

    const role = useSelector((state) => state.adminSlice.admin);

    const handleClose = () => {
        setShowPopup(false);
        setPopupContent("");
    };

    const handleButton = (content, data) => {
        setShowPopup(!showPopup);
        setPopupContent(content);
        setUserData(data);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    deleteUser(id);

                    Swal.fire("Deleted!", "Your file has been deleted.", "success");
                } catch (error) {
                    console.error("Error deleting user:", error);
                    Swal.fire("Error", "An error occurred while deleting the user.", "error");
                }
            }
        });
    };

    const rows =
        users?.map((user) => ({
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            email: user.email,
            gender: user.gender,
            password: user.password,
            age: user.age,
            admin: user.admin,
        })) || [];

    const columns = [
        { field: "firstName", headerName: "First Name", width: 125 },
        { field: "lastName", headerName: "Last Name", width: 125 },
        { field: "userName", headerName: "Username", width: 125 },
        { field: "email", headerName: "Email", width: 200 },
        { field: "gender", headerName: "Gender", width: 125 },
        { field: "age", headerName: "Age", width: 125 },
        {
            field: "admin",
            headerName: "Role",
            width: 125,
            renderCell: (params) => <div>{params.value ? "Admin" : "Member"}</div>,
        },
    ];

    if (role === true) {
        columns.push({
            field: "options",
            headerName: "Options",
            width: 125,
            renderCell: (params) => (
                <div>
                    <>
                        <IconButton onClick={() => handleButton("edit", params.row)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(params.row.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                </div>
            ),
        });
    }

    return (
        <>
            {showPopup && <ShowPopup content={popupContent} data={userData} handleClose={handleClose} />}
            <Container component="main" maxWidth="lg">
                <Box
                    lg={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Stack spacing={2} direction="row">
                        <Button variant="contained" onClick={() => handleButton("adduser")}>
                            Add User
                        </Button>
                    </Stack>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                        }}
                        pageSizeOptions={[10, 15]}
                        checkboxSelection
                    />
                </Box>
            </Container>
        </>
    );
};

export default Homepage;
