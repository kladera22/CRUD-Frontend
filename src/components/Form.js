// import React, { useState } from "react";
// import { useAddUserMutation, useUpdateUserMutation } from "../services/apiSlice";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormLabel from "@mui/material/FormLabel";
// import Swal from "sweetalert2";
// import "../app.css";

// const ShowPopup = ({ content, data, handleClose }) => {
//     const [isOpen] = useState(true);
//     const [addUser] = useAddUserMutation();
//     const [updateUser] = useUpdateUserMutation();

//     const [firstName, setFirstName] = useState("");
//     const [lastName, setLastName] = useState("");
//     const [userName, setUserName] = useState("");
//     const [password, setPassword] = useState("");
//     const [email, setEmail] = useState("");
//     const [gender, setGender] = useState("");
//     const [admin, setAdmin] = useState();
//     const [age, setAge] = useState("");

// const handleSubmit = (e) => {
//     e.preventDefault();

//     addUser({
//         userId: 1,
//         firstName: firstName,
//         lastName: lastName,
//         userName: userName,
//         age: age,
//         email: email,
//         password: password,
//         admin: admin,
//         gender: gender,
//         completed: false,
//     });

//     // Show SweetAlert success message
//     Swal.fire({
//         icon: "success",
//         title: "Success",
//         text: "User has been added!",
//     }).then(() => {
//         setFirstName("");
//         setLastName("");
//         setUserName("");
//         setAge("");
//         setEmail("");
//         setPassword("");
//         setAdmin("");
//         setGender("");
//     });
//     handleClose();
// };

//     const handleSubmitUpdate = async (e) => {
//         e.preventDefault();
//         const updatedUser = {
//             _id: data.id,
//             firstName: e.target.firstName ? e.target.firstName.value : "",
//             lastName: e.target.lastName ? e.target.lastName.value : "",
//             userName: e.target.userName ? e.target.userName.value : "",
//             age: e.target.age ? e.target.age.value : "",
//             email: e.target.email ? e.target.email.value : "",
//             password: e.target.password ? e.target.password.value : "",
//             admin: e.target.admin ? e.target.admin.value : "",
//             gender: e.target.gender ? e.target.gender.value : "",
//         };

//         // console.log("Role:", admin);
//         // console.log("Gender:", gender);

//         console.log(e.target, "user update");
//         console.log(updatedUser, "user updated");

//         try {
//             await updateUser(updatedUser);
//             // Show SweetAlert success message
//             Swal.fire({
//                 icon: "success",
//                 title: "Success",
//                 text: "User has been updated!",
//             });
//         } catch (error) {
//             // Handle any errors that occur during the update, e.g., display an error message
//             console.error("Error updating user:", error);
//             // You can also show an error SweetAlert here if needed
//         }

//         handleClose();
//     };

//     return (
//         <>
//             {content === "edit" ? (
//                 <Dialog open={isOpen} onClose={handleClose}>
//                     <form onSubmit={handleSubmitUpdate}>
//                         <DialogTitle>Edit User</DialogTitle>

//                         <DialogContent>
//                             <div className="split-maincontainer">
//                                 <div className="split-container">
//                                     <TextField id="firstName" label="First Name" defaultValue={data.firstName} variant="filled" />
//                                     <TextField id="age" label="Age" type="number" defaultValue={data.age} variant="filled" />
//                                     <TextField
//                                         id="email"
//                                         label="Email"
//                                         type="email"
//                                         defaultValue={data.email}
//                                         InputProps={{
//                                             readOnly: true,
//                                         }}
//                                         helperText="* supportzebra approved email"
//                                         variant="filled"
//                                     />
//                                     <FormLabel>Role</FormLabel>
//                                     <RadioGroup
//                                         aria-labelledby="demo-radio-buttons-group-label"
//                                         name="admin"
//                                         id="admin"
//                                         defaultValue={data.admin}
//                                     >
//                                         <FormControlLabel value="false" control={<Radio />} label="Member" />
//                                         <FormControlLabel value="true" control={<Radio />} label="Admin" />
//                                     </RadioGroup>
//                                 </div>

//                                 <div className="split-container">
//                                     <TextField id="lastName" label="Last Name" defaultValue={data.lastName} variant="filled" />
//                                     <TextField id="userName" label="Username" defaultValue={data.userName} variant="filled" />
//                                     <TextField
//                                         id="password"
//                                         label="Password"
//                                         type="password"
//                                         defaultValue={data.password}
//                                         InputProps={{
//                                             readOnly: true,
//                                         }}
//                                         helperText="* only user can view and edit"
//                                         variant="filled"
//                                     />
//                                     <FormLabel>Gender</FormLabel>
//                                     <RadioGroup
//                                         aria-labelledby="demo-radio-buttons-group-label"
//                                         defaultValue={data.gender}
//                                         name="gender"
//                                         id="gender"
//                                     >
//                                         <FormControlLabel value="Female" control={<Radio />} label="Female" />
//                                         <FormControlLabel value="Male" control={<Radio />} label="Male" />
//                                     </RadioGroup>
//                                 </div>
//                             </div>
//                         </DialogContent>

//                         <DialogActions>
//                             <Button onClick={handleClose}>Cancel</Button>
//                             <Button type="submit">Save</Button>
//                         </DialogActions>
//                     </form>
//                 </Dialog>
//             ) : content === "adduser" ? (
//                 <Dialog open={isOpen} onClose={handleClose}>
//                     <form onSubmit={handleSubmit}>
//                         <DialogTitle>Add User</DialogTitle>

//                         <DialogContent>
//                             <div className="split-maincontainer">
//                                 <div className="split-container">
//                                     <TextField
//                                         id="firstName"
//                                         label="First Name"
//                                         variant="filled"
//                                         value={firstName}
//                                         onChange={(e) => setFirstName(e.target.value)}
//                                     />
//                                     <TextField
//                                         id="age"
//                                         label="Age"
//                                         type="number"
//                                         variant="filled"
//                                         value={age}
//                                         onChange={(e) => setAge(e.target.value)}
//                                     />
//                                     <TextField
//                                         id="email"
//                                         label="Email"
//                                         type="email"
//                                         helperText="* supportzebra approved email"
//                                         variant="filled"
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                     />
//                                     <FormLabel>Role</FormLabel>
//                                     <RadioGroup
//                                         aria-labelledby="demo-radio-buttons-group-label"
//                                         name="radio-buttons-group"
//                                         id="admin"
//                                         value={admin}
//                                         onChange={(e) => setAdmin(e.target.value)}
//                                     >
//                                         <FormControlLabel value="false" control={<Radio />} label="Member" />
//                                         <FormControlLabel value="true" control={<Radio />} label="Admin" />
//                                     </RadioGroup>
//                                 </div>

//                                 <div className="split-container">
//                                     <TextField
//                                         id="lastName"
//                                         label="Last Name"
//                                         variant="filled"
//                                         value={lastName}
//                                         onChange={(e) => setLastName(e.target.value)}
//                                     />
//                                     <TextField
//                                         id="userName"
//                                         label="Username"
//                                         variant="filled"
//                                         value={userName}
//                                         onChange={(e) => setUserName(e.target.value)}
//                                     />
//                                     <TextField
//                                         id="password"
//                                         label="Password"
//                                         type="password"
//                                         helperText="* inform user to update password"
//                                         variant="filled"
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                     />
//                                     <FormLabel>Gender</FormLabel>
//                                     <RadioGroup
//                                         aria-labelledby="demo-radio-buttons-group-label"
//                                         name="radio-buttons-group"
//                                         id="gender"
//                                         value={gender}
//                                         onChange={(e) => setGender(e.target.value)}
//                                     >
//                                         <FormControlLabel value="Female" control={<Radio />} label="Female" />
//                                         <FormControlLabel value="Male" control={<Radio />} label="Male" />
//                                     </RadioGroup>
//                                 </div>
//                             </div>
//                         </DialogContent>

//                         <DialogActions>
//                             <Button onClick={handleClose}>Cancel</Button>
//                             <Button type="submit">Submit</Button>
//                         </DialogActions>
//                     </form>
//                 </Dialog>
//             ) : (
//                 <div>{content}</div>
//             )}
//         </>
//     );
// };

// export default ShowPopup;
