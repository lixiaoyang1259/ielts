'use client'
import React, {useCallback, useContext} from "react";
import styles from "./submit-button.module.scss"
import {useTranslations} from "next-intl";
import {LoadingDialogContext} from "@/app/componments/loading-dialog-provider";
import {ToastContext} from "@/app/componments/toast-provider";
import ConfirmDialog from "@/app/(detail)/components/confirm-dialog";
import {codeToMessage, NewActionResponse} from "@/app/server-actions/response";

interface SubmitButtonProps<T> {
    points: number
    submitAction: () => Promise<NewActionResponse<T>> | undefined
    onSuccess: (data:T) => void
}

const SubmitButton = <T,>({points, submitAction, onSuccess}:SubmitButtonProps<T>) => {
    const t = useTranslations("EssayOptions")
    const loadingDlg = useContext(LoadingDialogContext)
    const tipsDlg = useContext(ToastContext)
    const translate = useTranslations("SubmitOptions")

    const doSubmit = useCallback(async () => {
        loadingDlg?.show()
        const response = await submitAction()
        loadingDlg?.hide()
        if(!response){
            return
        }
        if (response.code !== 0 || !response.data) {
            tipsDlg?.show(codeToMessage(translate, response.code), 3000)
        } else {
            onSuccess(response.data)
        }
    }, [submitAction])

    return <div className={styles.main_container}>
        <ConfirmDialog
            onCancel={() => {

            }}
            onConfirm={doSubmit}
            title={points > 0 ? t("submit_title") : t("insufficient_point_title")}
            content={points > 0 ? t("submit_content", {points: points}) : t("insufficient_point_content")}
        >
            <div className={styles.submit_button}>{t("submit")}: {points}</div>
        </ConfirmDialog>
    </div>
}

export default SubmitButton