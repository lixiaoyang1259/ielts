'use client'
import React, {useContext} from "react";
import styles from "./save-button.module.scss";
import ConfirmDialog from "@/app/(detail)/components/confirm-dialog";
import {useTranslations} from "next-intl";
import {ToastContext} from "@/app/componments/toast-provider";
import {codeToMessage, NewActionResponse} from "@/app/server-actions/response";

interface SaveButtonProps<T> {
    saveAction: () => Promise<NewActionResponse<T>>|undefined
    onSuccess: (data: T) => void
}

const SaveButton = <T, >({saveAction, onSuccess}:SaveButtonProps<T>) => {
    const t = useTranslations("EssayOptions")
    const tipsDlg = useContext(ToastContext)
    const translate = useTranslations("SubmitOptions")

    return <ConfirmDialog
        onCancel={() => {
        }}
        onConfirm={async () => {
            const response = await saveAction()
            if(!response) {
                return
            }
            if (response.code === 0) {
                onSuccess(response.data)
            } else {
                tipsDlg?.show(codeToMessage(translate, response.code), 3000)
            }
        }}
        title={t("save_title")}
        content={t("save_content")}
    >
        <div className={styles.save_button}>{t("save")}</div>
    </ConfirmDialog>
}

export default SaveButton