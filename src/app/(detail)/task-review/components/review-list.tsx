import styles from './review-list.module.scss';
import React from "react";
import {getTranslations} from "next-intl/server";

export interface ReviewDetail {
    score: number
    illegal_answer: boolean;
    illegal_answer_detail: string;
    over_all_comments: string;
    task_achievement: {
        sub_score: number,
        comments: string,
        suggestions: [{
            position: [number, number]
            suggestion: string
        }]
    };
    coherence_and_cohesion: {
        sub_score: number,
        comments: string,
        suggestions: [{
            position: [number, number]
            suggestion: string
        }]
    };
    lexical_resource: {
        sub_score: number,
        comments: string,
        suggestions: [{
            position: [number, number]
            suggestion: string
        }]
    }
    grammatical_range: {
        sub_score: number,
        comments: string,
        suggestions: [{
            position: [number, number]
            suggestion: string
        }]
    }
}

export interface ReviewListProps {
    review: ReviewDetail
}

const ReviewList: React.FC<ReviewListProps> = async (props) => {
    const t = await getTranslations("TaskReview")
    try{
        const overallComment = props.review.illegal_answer ? props.review.illegal_answer_detail : props.review.over_all_comments
        const suggestions = [...props.review.task_achievement.suggestions,
            ...props.review.coherence_and_cohesion.suggestions,
            ...props.review.lexical_resource.suggestions,
            ...props.review.grammatical_range.suggestions]
    
        const legalAnswer = !props.review.illegal_answer
    
        return <div className={styles.suggestion_list}>
            <div className={styles.overall_review}> {overallComment}
                {/*</div>*/}
                {/*<div className={styles.detail_review}>*/}
                {legalAnswer && <p><b>Task
                    Achievement- {props.review.task_achievement.sub_score} : </b>{props.review.task_achievement.comments} </p>}
                {/*</div>*/}
                {/*<div className={styles.detail_review}>*/}
                {legalAnswer && <p><b>Coherence and
                    Cohesion-{props.review.coherence_and_cohesion.sub_score}: </b> {props.review.coherence_and_cohesion.comments}</p>}
                {/*</div>*/}
                {/*<div className={styles.detail_review}>*/}
                {legalAnswer && <p><b>Lexical
                    Resource-{props.review.lexical_resource.sub_score}: </b>{props.review.lexical_resource.comments}</p>}
                {/*</div>*/}
                {/*<div className={styles.detail_review}>*/}
                {legalAnswer && <p><b>Grammatical Range and
                    Accuracy-{props.review.grammatical_range.sub_score}: </b> {props.review.grammatical_range.comments}</p>}
            </div>
            {
                legalAnswer && suggestions.map((suggestion) => {
                    return <div className={styles.detail_review} key={suggestion.suggestion}> {suggestion.suggestion}</div>
                })
            }
    
        </div>
    }catch(e){
        return <div>{t("review_data_error")}</div>
    }

}
export default ReviewList