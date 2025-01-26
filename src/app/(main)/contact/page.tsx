'use client'
import React, {FormEvent, useCallback, useContext} from "react";
import styles from "./page.module.scss"
import Link from "next/link";
import {commitSuggestion} from "@/app/server-actions/commit-suggestion";
import {LoadingDialogContext} from "@/app/componments/loading-dialog-provider";
import {ToastContext} from "@/app/componments/toast-provider";
import {debounce} from "lodash"
import {useTranslations} from "next-intl";

const Contact: React.FC = () => {
    const loadingDlg = useContext(LoadingDialogContext)
    const tipsDlg = useContext(ToastContext)
    const t = useTranslations("ContactPage")

    async function onSubmit(e: FormEvent) {
        e.preventDefault()
        if (loadingDlg) {
            loadingDlg.show("", 3000, () => {
                loadingDlg.hide();
                tipsDlg.show(t("commit_success"), 2000)
            });
        }
        const formData = new FormData(e.target as HTMLFormElement)
        const suggestion = formData.get("suggestions")

        if (suggestion) {
            await commitSuggestion(suggestion as string)
        }
    }

    const submitCallback = useCallback(debounce(onSubmit, 500), [])

    return <div className={styles.main_container}>
        {/*<div className={styles.contact_us}>{t("contact")}</div>*/}
        <div className={styles.notice}>{t("suggest")}</div>
        <form className={styles.suggestions_form} onSubmit={(e) => {
            e.preventDefault()
            submitCallback(e)
        }}>
            <textarea name={"suggestions"} required className={styles.text_area}
                      maxLength={1500}
            />

            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <button type={"submit"} className={styles.send_button}>{t("send")}
                </button>

                <div className={styles.mail_to_us}>
                </div>
            </div>
        </form>
    </div>
}

export default Contact