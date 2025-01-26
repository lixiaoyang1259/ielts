'use client'
import styles from './confirm-dialog.module.scss';
import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import {useTranslations} from "next-intl";

export interface ConfirmDialogProps {
    children?: React.ReactNode;
    title: string;
    content: string;
    onCancel: () => void;
    onConfirm: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({children, title, content, onConfirm, onCancel}) => {
    const t = useTranslations("EssayOptions")
    return <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
            {children}
            {/*<button className={`${styles.Button} violet`}>Delete account</button>*/}
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
            <AlertDialog.Overlay className={styles.Overlay}/>
            <AlertDialog.Content className={styles.Content}>
                <AlertDialog.Title className={styles.Title}>
                    {title}
                </AlertDialog.Title>
                <AlertDialog.Description className={styles.Description}>
                    {content}
                </AlertDialog.Description>
                <div style={{display: "flex", gap: 25, justifyContent: "flex-end"}}>
                    <AlertDialog.Cancel asChild>
                        <button className={`${styles.cancel_button}`} onClick={()=>{onCancel()}}>
                            {t("confirm_cancel")}
                        </button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                        <button className={`${styles.confirm_button}`} onClick={()=>onConfirm()}>
                            {t("confirm_ok")}
                        </button>
                    </AlertDialog.Action>
                </div>
            </AlertDialog.Content>
        </AlertDialog.Portal>
    </AlertDialog.Root>
}

export default ConfirmDialog;
