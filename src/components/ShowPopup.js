import React, { useState, useEffect } from "react";
import { useAddUserMutation, useUpdateUserMutation } from "../services/apiSlice";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Swal from "sweetalert2";
import "../app.css";

import { useForm, Controller } from "react-hook-form";

const ShowPopup = ({ content, data, handleClose }) => {
    const [isOpen] = useState(true);
    const [addUser] = useAddUserMutation();
    const [updateUser] = useUpdateUserMutation();

    // const [confirm, setConfirm] = useState(false);
    // const [formData, setFormData] = useState(data);

    const { control, handleSubmit, reset } = useForm();

    const onSubmit = async (formData) => {
        try {
            if (content === "adduser") {
                if (
                    !formData.firstName ||
                    !formData.lastName ||
                    !formData.userName ||
                    !formData.password ||
                    !formData.email ||
                    !formData.gender ||
                    !formData.admin ||
                    !formData.age
                ) {
                    const confirmResult = await Swal.fire({
                        icon: "warning",
                        title: "Warning",
                        text: "Some required fields are missing. Do you want to continue?",
                        showCancelButton: true,
                        confirmButtonText: "Yes",
                        cancelButtonText: "No",
                    });

                    if (confirmResult.isConfirmed) {
                        Swal.close();
                    } else {
                        Swal.close();
                        handleClose();
                    }
                } else {
                    await addUser(formData);
                    handleClose();
                }
            } else if (content === "edit") {
                await updateUser({
                    _id: data.id,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    userName: formData.userName,
                    age: formData.age,
                    email: formData.email,
                    password: formData.password,
                    admin: formData.admin,
                    gender: formData.gender,
                });

                console.log("details:", formData);

                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "User has been updated!",
                });

                reset();
                handleClose();
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            <Dialog open={isOpen} onClose={handleClose} sx={{ zIndex: 0 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle>{content === "edit" ? "Edit User" : "Add User"}</DialogTitle>

                    <DialogContent>
                        <div className="split-maincontainer">
                            <div className="split-container">
                                <Controller
                                    name="firstName"
                                    control={control}
                                    defaultValue={content === "edit" ? data.firstName : ""}
                                    render={({ field }) => <TextField {...field} id="firstName" label="First Name" variant="filled" />}
                                />
                                <Controller
                                    name="age"
                                    control={control}
                                    defaultValue={content === "edit" ? data.age : ""}
                                    render={({ field }) => <TextField {...field} id="age" label="Age" type="number" variant="filled" />}
                                />
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue={content === "edit" ? data.email : ""}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            id="email"
                                            label="Email"
                                            type="email"
                                            helperText="* supportzebra approved email"
                                            variant="filled"
                                        />
                                    )}
                                />
                                <Controller
                                    name="admin"
                                    control={control}
                                    defaultValue={content === "edit" ? data.admin : ""}
                                    render={({ field }) => (
                                        <>
                                            <FormLabel>Role</FormLabel>
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                {...field}
                                                id="admin"
                                                name="admin"
                                                // value={admin}
                                                // onChange={(e) => field.onChange(e.target.value)}
                                            >
                                                <FormControlLabel value="false" control={<Radio />} label="Member" />
                                                <FormControlLabel value="true" control={<Radio />} label="Admin" />
                                            </RadioGroup>
                                        </>
                                    )}
                                />
                            </div>

                            <div className="split-container">
                                <Controller
                                    name="lastName"
                                    control={control}
                                    defaultValue={content === "edit" ? data.lastName : ""}
                                    render={({ field }) => <TextField {...field} id="lastName" label="Last Name" variant="filled" />}
                                />
                                <Controller
                                    name="userName"
                                    control={control}
                                    defaultValue={content === "edit" ? data.userName : ""}
                                    render={({ field }) => <TextField {...field} id="userName" label="Username" variant="filled" />}
                                />
                                <Controller
                                    name="password"
                                    control={control}
                                    defaultValue={content === "edit" ? data.password : ""}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            id="password"
                                            label="Password"
                                            type="password"
                                            helperText="* inform user to update password"
                                            variant="filled"
                                        />
                                    )}
                                />
                                <Controller
                                    name="gender"
                                    control={control}
                                    defaultValue={content === "edit" ? data.gender : ""}
                                    render={({ field }) => (
                                        <>
                                            <FormLabel>Gender</FormLabel>
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                {...field}
                                                id="gender"
                                                name="gender"
                                                // value={admin}
                                                // onChange={(e) => field.onChange(e.target.value)}
                                            >
                                                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                            </RadioGroup>
                                        </>
                                    )}
                                />
                            </div>
                        </div>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Submit</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default ShowPopup;
