'use client'
import React, {ChangeEvent, useContext, useEffect, useRef, useState} from "react";
import styles from "./page.module.scss"
import {useRouter} from "next/navigation";
import {Cascader} from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";
import {saveCustomRecordAction, submitCustomRecordAction} from "@/app/server-actions/custom-actions";
import {ToastContext} from "@/app/componments/toast-provider";
import {getPoint} from "@/app/server-actions/userinfo-actions";
import {useTranslations} from "next-intl";
import SaveButton from "@/app/(detail)/components/save-button";
import SubmitButton from "@/app/(detail)/components/submit-button";
import OCRButton from "@/app/(detail)/components/ocr-button";

const options = [
    {
        value: 'cefr',
        label: 'CEFR',
        children: [
            {
                value: 'A1',
                label: 'A1',
            },
            {
                value: 'A2',
                label: 'A2',
            },
            {
                value: 'B1',
                label: 'B1',
            },
            {
                value: 'B2',
                label: 'B2',
            },
            {
                value: 'C1',
                label: 'C1',
            },
            {
                value: 'C2',
                label: 'C2',
            },
        ],
    },
    {
        value: 'CET',
        label: '大学英语等级CET',
        children: [
            {
                value: 'band4',
                label: '4级',
            },
            {
                value: 'band6',
                label: '6级',
            },
            {
                value: 'band8',
                label: '8级',
            },
        ],
    },
    {
        value: '実用英語技能検定',
        label: '実用英語技能検定(EIKEN)',
        children: [
            {
                value: '5級',
                label: '5級',
            },
            {
                value: '4級',
                label: '4級',
            },
            {
                value: '3級',
                label: '3級',
            },
            {
                value: '準2級',
                label: '準2級',
            },
            {
                value: '準2級プラス',
                label: '準2級プラス',
            },
            {
                value: '2級',
                label: '2級',
            },
            {
                value: '準1級',
                label: '準1級',
            },
            {
                value: '1級',
                label: '1級',
            },
        ],
    },
    {
        value: '全民英檢',
        label: '全民英檢(GEPT)',
        children: [
            {
                value: '初級',
                label: '初級',
            },
            {
                value: '中級',
                label: '中級',
            },
            {
                value: '中高級',
                label: '中高級',
            },
            {
                value: '高級',
                label: '高級',
            },
            {
                value: '優級',
                label: '優級',
            },
        ],

    },
    {
        value: 'ielts',
        label: 'IELTS',
    },
    {
        value: 'TOEFL',
        label: 'TOEFL',
    },
];

const Page: React.FC = () => {
    const [count, setCount] = useState(0)
    const router = useRouter()
    const [selectedOptions, setSelectedOptions] = useState<(string | string[])[]>([]);
    const tips = useContext(ToastContext)
    const [points, setPoints] = useState(0)
    const t = useTranslations("CustomPage")
    const formRef = useRef<HTMLFormElement>(null)
    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value.trim().split(/\s+/);
        const wordCount = text.filter((w) => w.length > 0).length
        setCount(wordCount)
    }

    useEffect(() => {
        (async () => {
            const pointsRes = await getPoint()
            if (pointsRes.code === 0 && pointsRes.data) {
                setPoints((pointsRes.data as { point: number }).point);
            }
        })()
    }, []);

    const doSave = () => {
        if (!formRef.current) return;
        const formData = new FormData(formRef.current);
        const answer = formData.get("answer")?.toString().trim() ?? ""
        const question = formData.get("question")?.toString().trim() ?? ""
        if (selectedOptions.length <= 0 || selectedOptions.length > 2 || typeof selectedOptions[0] !== 'string') {
            tips.show(t("select_level"))
            return;
        }
        return saveCustomRecordAction(selectedOptions as [string, string | null], question, answer)
    }

    const doSubmit = () => {
        if (!formRef.current) return;
        const formData = new FormData(formRef.current);
        const answer = formData.get("answer")?.toString().trim() ?? ""
        const question = formData.get("question")?.toString().trim() ?? ""
        if (selectedOptions.length <= 0 || selectedOptions.length > 2 || typeof selectedOptions[0] !== 'string') {
            tips.show(t("select_level"))
            return;
        }
        return submitCustomRecordAction(selectedOptions as [string, string | null], question, answer)
    }

    function handleSelect(value: (string | string[])[]) {
        setSelectedOptions(value);
    }

    return <form className={styles.main_container} ref={formRef}>
        <div className={styles.question_area}>
            <div className={styles.level_group}>
                <div className={styles.level_question_literal}>Question</div>
                <Cascader
                    className={styles.level_options}
                    placeholder='select a new level'
                    expandTrigger='hover'
                    size={"large"}
                    onChange={handleSelect}
                    // value={selectedOptions}
                    options={options}
                />
            </div>
            <textarea className={styles.question_input}
                      name={"question"}
                      placeholder={"enter your question here"}
                      required>

            </textarea>
        </div>
        <div className={styles.answer_area}>
            <div className={styles.answer_border}>
            <textarea
                ref={textAreaRef}
                required name={"answer"} className={styles.answer}
                placeholder={"enter your answer here"}
                onChange={onChange}
            ></textarea>
                <div className={styles.word_counter}>Words : {count}</div>
            </div>
            <div className={styles.options_line}>
                <OCRButton onSuccess={(content => {
                    if (textAreaRef.current) {
                        textAreaRef.current.value = content
                    }
                })}
                           points={points}
                ></OCRButton>
                <SaveButton
                    saveAction={doSave}
                    onSuccess={(data) => {
                        router.push("/custom-review?id=" + data)
                    }}></SaveButton>
                <SubmitButton
                    points={points}
                    submitAction={doSubmit}
                    onSuccess={(id: string) => {
                        router.push("/custom-review?id=" + id)
                    }}
                >

                </SubmitButton>
            </div>
        </div>
    </form>
}

export default Page;