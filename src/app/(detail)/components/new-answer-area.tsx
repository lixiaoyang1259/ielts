'use client'
import styles from './new-answer-area.module.scss';
import React, {
    ChangeEvent,
    ChangeEventHandler,
    MouseEventHandler,
    MutableRefObject, useCallback, useContext,
    useEffect, useLayoutEffect,
    useRef,
    useState
} from "react";
import CountDown, {CountdownEventHandler} from "@/app/(detail)/task-detail/components/count-down";
import {Task} from "@/app/(detail)/task-detail/page";
import {useTranslations} from "next-intl";
import commitAndAssess, {saveAnswerToDB} from "@/app/server-actions/commit-actions";
import {useRouter} from "next/navigation";
import {LoadingDialogContext} from "@/app/componments/loading-dialog-provider";
import {ToastContext} from "@/app/componments/toast-provider";
import SubmitButton from "@/app/(detail)/components/submit-button";
import SaveButton from "@/app/(detail)/components/save-button";
import OCRButton from "@/app/(detail)/components/ocr-button";

interface NewAnswerAreaProps {
    points: number
    task: Task
}

const NewAnswerArea: React.FC<NewAnswerAreaProps> = ({points, task}) => {
    const [started, setStarted] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [count, setCount] = useState(0);
    const countDownRef = useRef<CountdownEventHandler>(null);
    const t = useTranslations("TaskDetail")
    const router = useRouter()
    const [hideHint, setHideHint] = useState(false);
    const loadingDlg = useContext(LoadingDialogContext)
    const tipsDlg = useContext(ToastContext)

    const onStartClick: MouseEventHandler<HTMLDivElement> = (e) => {
        setStarted(true)
        // if (countDownRef.current) {
        //     countDownRef.current.start();
        // }
    }

    const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        const text = e.target.value.trim().split(/\s+/);
        const wordCount = text.filter((w) => w.length > 0).length
        setCount(wordCount)
    }

    const doSave = () => {
        return saveAnswerToDB(task.id, textAreaRef.current?.value ?? "")
    }
    const doSubmit = () => {
        const answer = textAreaRef.current?.value ?? ""
        return commitAndAssess(task, answer)
    }


    const mainStyle = [styles.main_container, started ? styles.main_container_started_background : ""].join(" ")
    return <div className={mainStyle}>
        <div className={styles.title_line}>
            <div className={styles.answer_title}>Answer</div>
            {started && <CountDown timeInMinutes={task.time} ref={countDownRef}></CountDown>}
        </div>
        {
            !started ? <div className={styles.start_button} onClick={onStartClick}>{t("start")}</div>
                : <div className={styles.answer_area}>
                    <div hidden={hideHint} style={{color: "#BABEC6"}}>{t("input_hint", {words: task.words})}</div>
                    <textarea
                        className={styles.input_area}
                        onChange={onChange}
                        spellCheck={false}
                        ref={textAreaRef}
                        onFocus={() => {
                            setHideHint(true)
                        }}
                        onBlur={() => {
                            if (textAreaRef.current && textAreaRef.current.value.length <= 0) {
                                setHideHint(false)
                            }
                        }}
                    >
                    </textarea>
                    <div className={styles.word_counter}>words : {count}</div>
                </div>
        }
        {
            started && <div className={styles.options_line}>
            <OCRButton onSuccess={(content=>{
                if(textAreaRef.current){
                    textAreaRef.current.value = content
                    setHideHint(true)
                }
            })}
                       points={points}
            ></OCRButton>
                <SaveButton
                    onSuccess={(data: string) => {
                        router.push(`/task-review?record_id=${data}`, {})
                    }}
                    saveAction={doSave}
                >
                </SaveButton>
                <SubmitButton
                    onSuccess={(data: string) => {
                        router.push(`/task-review?record_id=${data}`, {})
                    }}
                    points={points}
                    submitAction={doSubmit}>
                </SubmitButton>
            </div>
        }
    </div>
}

export default NewAnswerArea;