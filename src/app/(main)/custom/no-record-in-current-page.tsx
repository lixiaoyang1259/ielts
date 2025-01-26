import styles from "./page.module.scss"
import {getTranslations} from "next-intl/server";

export default async function  NoRecordInCurrentPage(){
    const t = await getTranslations("CustomPage")
    return <div className={styles.no_records}>
        {t("no_record")}
    </div>
}
