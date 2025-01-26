'use client'
import styles from "./horizontal-question-area.module.scss"
import React, {Fragment, useState} from "react";
import {Carousel, Image} from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";

interface HorizontalQuestionAreaProps{
    images ?: string[]
    title : string
    content : string
}

const HorizontalQuestionArea: React.FC<HorizontalQuestionAreaProps> = ({images, title, content})=>{
    const [showPreview, setShowPreview] = useState(false)
    return <div className={styles.main_container}>
        <div className={styles.question_area}>
            <div className={styles.question_title}>{title}</div>
            <div className={styles.question_content}>{content}</div>
        </div>
        {
            images && (<Fragment>
                <Carousel
                        className={styles.gallery_question}
                        // showArrow={"always"}
                        indicatorType={"line"}
                        indicatorPosition={"outer"}>
                        {
                            images?.map((item, index) => {
                                return <div key={item}>
                                    <img src={item} className={styles.gallery_image} onClick={() => {
                                        setShowPreview(true)
                                    }}>
                                    </img>
                                </div>
                            })
                        }
                    </Carousel>
                    <Image.PreviewGroup
                        visible={showPreview}
                        onVisibleChange={setShowPreview}
                        srcList={images}
                    >
                    </Image.PreviewGroup>
                </Fragment>
            )
        }
    </div>
}

export default HorizontalQuestionArea
