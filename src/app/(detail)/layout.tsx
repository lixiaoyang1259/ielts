import React from "react";
import HeaderBar from "@/app/(detail)/components/header-bar";

const Layout :React.FC<Readonly<{ children: React.ReactNode; }>> = async (props )=>{
    return <div >
        <HeaderBar></HeaderBar>
        {props.children}
    </div>
}

export default Layout