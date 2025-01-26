'use client'
import styles from "./ocr-button.module.scss"
import {submitOCR} from "@/app/server-actions/ocr-actions";
import React, {FormEvent, useContext, useRef, useState} from "react";
import {ToastContext} from "@/app/componments/toast-provider";
import {useTranslations} from "next-intl";
import FileChoose from "@/app/(detail)/components/file-choose";
import {codeToMessage} from "@/app/server-actions/response";
import {LoadingDialogContext} from "@/app/componments/loading-dialog-provider";

interface OCRButtonProps {
    onSuccess: (content: string) => void
    onFail?: (error: string) => void
    points: number
}

export default function OCRButton(props: OCRButtonProps) {
    const t = useTranslations("EssayOptions")
    const tipsDlg = useContext(ToastContext)
    const loadingDlg = useContext(LoadingDialogContext)
    const translate = useTranslations("SubmitOptions")

    async function doSubmit(file: File | null | undefined) {
        if (!file) {
            tipsDlg.show("no_file_select")
            return
        }
        const formData = new FormData()
        formData.append("source", file)
        const answerImage = formData.get("source")
        loadingDlg?.show()
        if (answerImage) {
            const ocrResponse = await submitOCR(formData)
            if (ocrResponse.code === 0) {
                const ocrResult = JSON.parse(ocrResponse.data) as {
                    "content": string,
                    "illegal_content": boolean
                }
                if (ocrResult.illegal_content) {
                    console.log("content error", ocrResult.content)
                    tipsDlg.show(t("ocr_error"), 3000)
                } else {
                    console.log("content = ", ocrResult.content)
                    props.onSuccess(ocrResult.content)
                    //TODO: callback
                }
                //success
            } else {
                tipsDlg.show( codeToMessage(translate, ocrResponse.code), 3000)
            }

        } else {
            tipsDlg.show("illegal image", 3000)
        }
        loadingDlg?.hide()
    }

    return <FileChoose
        title={t("ocr_title")}
        content={t("ocr_content", {points: props.points})}
        onCancel={() => {
        }}
        onFileSelected={doSubmit}>
        <div className={styles.ocr_button}>{t("ocr_button")}: {props.points}</div>
    </FileChoose>
}