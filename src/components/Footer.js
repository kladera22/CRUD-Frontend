import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Footer = () => {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            fontFamily: "roboto",
                            fontWeight: 100,
                            letterSpacing: ".1rem",
                            color: "inherit",
                            textDecoration: "none",
                            fontSize: "14px",
                        }}
                    >
                        SupportZebra | Copyright © 2023 SupportZebra. All Rights Reserved.
                    </Typography>
                </Toolbar>
            </Box>
        </>
    );
};

export default Footer;
