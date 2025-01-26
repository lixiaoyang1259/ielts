'use client'
import styles from "./new-question-area.module.scss"
import React, {Fragment, useCallback, useEffect, useRef, useState} from "react";
import {Carousel, Image} from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";

interface ImageItem {
    itemImageSrc: string,
    thumbnailImageSrc: string,
    alt: string,
    title: string
}

export interface QuestionAreaProps {
    images?: string[]
    content : string
}

const NewQuestionArea: React.FC<QuestionAreaProps> = ({images, content}) => {
    const [showPreview, setShowPreview] = useState(false)

    return <div className={styles.main_container}>
        <div className={styles.question_title}>Question</div>
        <div className={styles.question_content}>{content}</div>

        {
            images && (<Fragment>
                    <Carousel
                        className={styles.gallery}
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
        {/*<Image.PreviewGroup*/}
        {/*    visible={showPreview}*/}
        {/*    onVisibleChange={setShowPreview}*/}
        {/*    srcList={images}*/}
        {/*/>*/}
    </div>
}

export default NewQuestionArea