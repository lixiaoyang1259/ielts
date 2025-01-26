import f from "@/utils/prompt/custom_question_format.json"
import React from "react";
import styles from "./custom-review.module.scss"
import {getTranslations} from "next-intl/server";

const CustomReviewList :React.FC<typeof f> = async (props)=>{
    const t = await getTranslations("CustomReviewPage");
    if(props.illegal_answer){
        return <div className={styles.illegal_answer}>{props.illegal_answer_detail}</div>
    }
    try{
        return <div className={styles.review_container}>
            {/*<div className={styles.score}>{props.score}</div>*/}
            <div className={styles.comment}>{props.over_all_comments}</div>
            {
                props.suggestions.map((suggestion)=>{
                   return<>
                       <div className={styles.suggestion}>{suggestion.suggestion}</div>
                   </>
                })
            }
        </div>


    }catch(e){
        return <div className={styles.illegal_answer}>seems something wrong..</div>
    }
}

export default CustomReviewList