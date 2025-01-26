'use client'
import styles from "./option-buttons.module.scss"
import React from "react";
import ConfirmDialog from "@/app/(detail)/components/confirm-dialog";
import {getPoint} from "@/app/server-actions/userinfo-actions";
import {useTranslations} from "next-intl";

interface OptionButtonProps {
    points: number

}

const OptionButtons: React.FC<OptionButtonProps> = ({points }) => {
    const t =  useTranslations("OptionButtons")

    return <div className={styles.options_line}>
        <ConfirmDialog
            onCancel={() => {
            }}
            onConfirm={() => {
                // doSave(textAreaRef.current?.value ?? "")
            }}
            title={t("save_title")}
            content={t("save_content")}
        >
            <div className={styles.save_button}>Save</div>
        </ConfirmDialog>
        <ConfirmDialog
            onCancel={() => {

            }}
            onConfirm={() => {
            }}
            title={points > 0 ? t("submit_title") : t("insufficient_point_title")}
            content={points > 0 ? t("submit_content", {points: points}) : t("insufficient_point_content")}
        >
            <div className={styles.submit_button}>Submit: {points}</div>
        </ConfirmDialog>

    </div>
}

export default OptionButtons;