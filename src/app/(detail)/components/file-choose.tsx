import styles from "./confirm-dialog.module.scss"
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import React, {ReactEventHandler} from "react";
import {useTranslations} from "next-intl";

export interface FileChooseDialogProps {
    children?: React.ReactNode;
    title: string;
    content: string;
    onCancel?: () => void;
    onFileSelected: (file?: File | null) => void;
}


export default function FileChoose(props: FileChooseDialogProps) {
    const t = useTranslations("EssayOptions")

    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        setSelectedFile(file);
    }

    return <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
            {props.children}
            {/*<button className={`${styles.Button} violet`}>Delete account</button>*/}
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
            <AlertDialog.Overlay className={styles.Overlay}/>
            <AlertDialog.Content className={styles.Content}>
                <AlertDialog.Title className={styles.Title}>
                    {props.title}
                </AlertDialog.Title>
                <AlertDialog.Description className={styles.Description}>
                    <input type={"file"} onChange={onChange} accept="image/jpeg,image/png,image/jpg"/>
                    <span className={styles.file_content}>
                        {props.content}
                    </span>
                </AlertDialog.Description>
                <div style={{display: "flex", gap: 25, justifyContent: "flex-end"}}>
                    <AlertDialog.Cancel asChild>
                        <button className={`${styles.cancel_button}`} onClick={() => {
                            props.onCancel?.()
                        }}>{t("select_cancel")}
                        </button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                        <button className={`${styles.confirm_button}`} onClick={() => {
                            props.onFileSelected(selectedFile)
                        }}>
                            {t("select_ok")}
                        </button>
                    </AlertDialog.Action>
                </div>
            </AlertDialog.Content>
        </AlertDialog.Portal>
    </AlertDialog.Root>
}