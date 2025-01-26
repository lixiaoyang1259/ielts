import React, {Fragment} from "react";
import {getPoint} from "@/app/server-actions/userinfo-actions";
import styles from "./points-button.module.scss"

const PointsButton: React.FC = async () => {
    const points = await getPoint()
    return  ((points.code === 0 && points.data) && <div className={styles.point_button}>
            <img src={"/points.png"} alt={"point"} className={styles.point_icon}></img>
            <div className={styles.point_count}>{(points.data as {point:number}).point}</div>
        </div>)

}

export default PointsButton;