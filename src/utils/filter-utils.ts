import {compact} from "lodash";
import {$Enums} from "@prisma/client";

const TaskFilterMap: Record<string, number> = {
    "academic": 0b0001,
    "general": 0b0010,
    "part1": 0b0100,
    "part2": 0b1000,
}

const RecordFilterMap :Record<string, number> ={

}

export interface TaskFilterSegmentsTypes {
    type: ($Enums.Type)[],
    part: ($Enums.Part)[]
}

export const combineFilterToNumber = (filters: TaskFilterSegmentsTypes) => {
    return [...filters.type, ...filters.part].reduce((res, current) => {
        const value = TaskFilterMap[current] ? TaskFilterMap[current] : null;
        if (value) {
            return res | value
        }
        return res
    }, 0)
}

export function parseFilterToType(filter?: string): TaskFilterSegmentsTypes | undefined {
    if (!filter) {
        return undefined
    }
    const filterNumber = parseInt(filter)
    if (isNaN(filterNumber)) {
        return undefined
    }

    const max = Math.pow(2, Object.keys(TaskFilterMap).length)
    if (filterNumber < max && filterNumber >= 0) {

        const partParam = compact([filterNumber & TaskFilterMap.part1 ? "part1" : null, filterNumber & TaskFilterMap.part2 ? "part2" : null])
        const typeParam = compact([filterNumber & TaskFilterMap.academic ? "academic" : null, filterNumber & TaskFilterMap.general ? "general" : null])

        return {
            part: partParam,
            type: typeParam,
        }
    }

    return undefined
}