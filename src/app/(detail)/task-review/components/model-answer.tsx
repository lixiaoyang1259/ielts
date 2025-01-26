'use client'
import React from "react";
import styles from "./model-answer.module.scss";

interface ModelAnswerProps {
    modelAnswer ?: string
}

const ModelAnswer :React.FC<ModelAnswerProps> = (props)=>{

    return <div className={styles.main_container}>
        {props.modelAnswer && <div className={styles.model_answer}><b>Model Answer : </b> <br/><br/>{props.modelAnswer}</div>}
    </div>
}

export default ModelAnswer