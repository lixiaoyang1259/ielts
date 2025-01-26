'use client'
import React from "react";
import styles from "./main-filter-button.module.scss";
import {useTranslations} from "next-intl";
import {Select} from '@arco-design/web-react';
import "@arco-design/web-react/dist/css/arco.css";
import {OptionInfo} from "@arco-design/web-react/es/Select/interface";
import "./patch-areo.css"

interface FilterButtonProps {
    onOptionChange:(options:string[])=>void
}

const Option = Select.Option;
const options = ['part1', 'part2', 'general', 'academic'];

const MainFilterButton: React.FC<FilterButtonProps> = (props) => {
    const t = useTranslations("TaskFilter")
    const onOptionChange = (value: any, option: OptionInfo | OptionInfo[]) => {
        props.onOptionChange(value)
    }

    return <div className={styles.filter_container}>
        <Select
            mode='multiple'
            style={{width: 385}}
            defaultValue={options}
            size={"large"}
            bordered={true}
            allowClear
            onChange={onOptionChange}
        >
            <Select.OptGroup label={"Part"}>
                <Option value={"part1"}>
                    Part1
                </Option>
                <Option value={"part2"}>
                    Part2
                </Option>
            </Select.OptGroup>
            <Select.OptGroup label={"Type"}>
                <Option value={"academic"}>
                    Academic
                </Option>
                <Option value={"general"}>
                    General
                </Option>
            </Select.OptGroup>
            {options.map((option) => (
                <Option key={option} value={option}>
                    {option}
                </Option>
            ))}
        </Select>
    </div>

}


export default MainFilterButton