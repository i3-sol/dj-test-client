import React from "react";
import { styled } from "@mui/material/styles";
import { Stack } from "@mui/material";
import Header from "./header";

const Layout = ({ children }: {children: React.ReactNode}) => {
    return (
        <LayoutWrapper>
            <Header />
            <div>
            {children}
            </div>
        </LayoutWrapper>
    )
}

const LayoutWrapper = styled(Stack)(({theme}) => ({
    backgroundColor: theme.palette.common.baseBg,
    minHeight: "100vh",
    width: "100%",
    display: "flex",
	flexDirection: "column",
}))

export default Layout