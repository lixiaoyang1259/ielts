'use client'

import React from "react";
import Image from "next/image"

export interface IconButtonProps {
   className ?: string | undefined,
   icon : string,
}

const IconButton : React.FC<IconButtonProps> = (props) =>{
   return <div className={props.className}>
      <Image src={props.icon} alt="icon_btn" width={30} height={30}></Image>
   </div>
}

export default IconButton