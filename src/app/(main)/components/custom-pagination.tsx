'use client'
import React from "react";
import {useRouter} from "next/navigation";
import {Pagination} from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";

interface CustomPaginationProps {
    total: number;
    onPageChange?: (page: number) => void;
    baseUrl : string
}

const CustomPagination:React.FC<CustomPaginationProps> = ({total, baseUrl,onPageChange}) => {
    const router = useRouter()

    const onChange = (page:number)=>{
        if(onPageChange){
            onPageChange(page)
        }else{
            router.push(baseUrl + `&page=${page-1}`)
        }
    }

    return <Pagination total={total} onChange={onChange} pageSize={5} style={{marginBottom:"16px"}} />;
}

export default CustomPagination;