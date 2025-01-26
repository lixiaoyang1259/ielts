'use client'
import React from "react";
import {useRouter} from "next/navigation";
import {updateRecordCommit} from "@/app/server-actions/commit-actions";
import SubmitButton from "@/app/(detail)/components/submit-button";
import {updateCustomRecordAction} from "@/app/server-actions/custom-actions";

interface AnswerOptionProps {
    recordId: string;
    points: number;
    isCustom ?: boolean
}

const AnswerOption: React.FC<AnswerOptionProps> = ({recordId, points, isCustom}) => {
    const router = useRouter();

    return    <SubmitButton points={points} submitAction={
        ()=>{
            if(isCustom){
               return updateCustomRecordAction(recordId)
            }else{
                return updateRecordCommit(recordId)
            }
        }
    } onSuccess={
        (recordId : string)=>{
            router.refresh()
        }
    }></SubmitButton>
}
export default AnswerOption