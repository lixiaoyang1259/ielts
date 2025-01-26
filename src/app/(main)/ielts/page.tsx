'use client'
import styles from "./main.module.scss"
import TaskItem, {DisplayTask} from "@/app/(main)/components/task-item";
import React, {Fragment, memo, useEffect, useMemo, useState} from "react";
import {getTasks} from "@/app/server-actions/task-actions";
import MainFilterButton from "@/app/(main)/ielts/main-filter-button";
import {Task} from "@/app/(detail)/task-detail/page";
import CustomPagination from "@/app/(main)/components/custom-pagination";
import {useTranslations} from "next-intl";
import {times} from "lodash"
import {Skeleton} from "@arco-design/web-react";

export default function ({searchParams}: { searchParams?: { [key: string]: string | undefined }; }) {
    const t = useTranslations('IeltsPage');
    const convertToDisPlayTask = (task: Task) => {
        const imageUrl = task.image ? task.image.split(";")[0] : "/github.svg"
        const detailProps: DisplayTask = {
            id: task.id,
            date: "/",
            detail: task.question, //TODO: ???
            image: imageUrl,
            score: "/",
            title: task.title ?? `IELTS Writing ${task.type} ${task.part || ""}`,
            type: task.type,
            part: task.part
        }

        return detailProps
    }
    const [tasks, setTasks] = useState<Task[] | null>(null);
    const [filter, setFilter] = useState<string[]>(["part1", "part2", "academic", "general"])
    const [sorts, setSorts] = useState<"desc" | "asc">("desc")
    const [page, setPage] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)
    const [pageCount, setPageCount] = useState<number>(0)

    const refreshTasks = async () => {
        const taskResponse = await getTasks(page, undefined, filter)
        if (taskResponse.code === 0) {
            setTasks(taskResponse.data.tasks)
            setTotal(taskResponse.data.total)
            setPageCount(taskResponse.data.pageCount)
        } else {
            //TODO： No task, should to show a notice to user?
        }
    }

    const onFilterChanged = async (value: string[]) => {
        setFilter(value)
    }


    useEffect(() => {
        refreshTasks().catch((error)=>{

        })
    }, [filter, sorts, page]);


    const displayTask: DisplayTask[] | null = tasks && tasks.map((task) => {
        return convertToDisPlayTask(task)
    })

    const LoadingList = memo(() => {
        return <div className={styles.loading}>
            {times(5).map((n) => {
                return <div className={styles.skeleton_card} key={n}>
                    <Skeleton
                        text={{
                            rows: 3,
                            width: ['100%', 600, 400],
                        }}
                        image
                    ></Skeleton>
                </div>
            })}
        </div>
    })

    // return <LoadingList></LoadingList>
    const NoTask = memo(() => {
        return <div className={styles.no_tasks}>
            {t("no_task")}
        </div>
    })

    return <div className={styles.main_container}>
        <div className={styles.question_list}>
            <div className={styles.recent_list_options}>
                <div className={styles.recent_literal}> {t("tasks")} :
                    <span className={styles.recent_count}>{total}</span>
                </div>
                <div className={styles.average_score}></div>
                <MainFilterButton onOptionChange={onFilterChanged}></MainFilterButton>
            </div>
            {
                !displayTask && <LoadingList />
            }
            {
                (displayTask && displayTask.length > 0) ? <div className={styles.recent_content}>
                    {displayTask && displayTask.map((task) => {
                        return <TaskItem
                            displayType={"task"}
                            key={task.id}
                            displayTask={task}
                        ></TaskItem>
                    })}
                </div> : (displayTask ? <NoTask></NoTask> :<></>)
            }
            {
                pageCount > 1 && <CustomPagination total={total}
                                                   baseUrl={`/ielts?`}
                                                   onPageChange={(newPage) => {
                                                       setPage(newPage - 1)
                                                   }}>

                </CustomPagination>
            }

        </div>

    </div>
}