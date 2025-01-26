'use client'
import React, {Fragment, useRef, useState} from "react";
import styles from "./image-gallary.module.scss"
import useEmblaCarousel from "embla-carousel-react";
import {
    NextButton,
    PrevButton,
    useDotButton,
    usePrevNextButtons
} from "@/app/(detail)/components/image-gallery-buttons";
import Image from "next/image"
import {JSX} from "react/jsx-runtime";
import IntrinsicAttributes = JSX.IntrinsicAttributes;
import ModelDialog, {ModelDialogEventHandler} from "@/app/componments/model-dialog";


export interface ImageGalleryProps extends IntrinsicAttributes {
    imageUrls: string[];
    className?: string
}

const ImageGallery: React.FC<ImageGalleryProps> = (props) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({loop: true})

    const {selectedIndex, scrollSnaps} = useDotButton(emblaApi)
    const enableCounter = scrollSnaps.length > 0
    const main_container_classes = `${styles.embla}  ${props.className ? props.className : ''}`

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    const modelDialogRef = useRef<ModelDialogEventHandler>(null)
    const [selectImage, setSelectImage] = useState<string>()

    const showCurrentImage = (e: React.MouseEvent<HTMLDivElement>, item: string) => {
        setSelectImage(item)
        if(modelDialogRef.current){
            modelDialogRef.current.show()
        }
    }

    return <Fragment>
        <div className={main_container_classes} ref={emblaRef}>
            <div className={styles.embla__container}>
                {
                    props.imageUrls?.map((item) => {
                        return <div key={item} className={styles.embla__slide}
                                    onClick={(e) => {
                            showCurrentImage(e, item)
                        }}>
                            <img className={props.className} src={item} alt={"image"} ></img>
                        </div>
                    })
                }
            </div>
            <div className={styles.embla__controls}>
                <div className={styles.embla__buttons}>
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled}/>
                    <div className={styles.total_count}>
                        {enableCounter ? `${selectedIndex + 1}/${scrollSnaps.length}` : ''}
                    </div>
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled}/>
                </div>
            </div>
        </div>
        <ModelDialog
            stopAutoHide={false}
            stopScroll={true}
            backgroundMask={true}
            position={"center"}
            ref={modelDialogRef} >
           <img src={selectImage} alt={"img"}></img>
        </ModelDialog>
    </Fragment>
}

export default ImageGallery