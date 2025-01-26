import OpenAI from "openai";
import {custom_gpt, handwritten_prompt, systemPrompt} from "@/utils/const-prompt";
import {ChatCompletionContentPartImage} from "openai/resources/chat/completions";

declare global {
    var aiConnection: OpenAI
}

if (!global.aiConnection) {
    global.aiConnection = new OpenAI({
        apiKey: process.env.OPEN_API_KEY,
        organization: process.env.OPEN_API_ORGANIZATION,
        project: process.env.project,
    })
}

let aiConnection = global.aiConnection

export default aiConnection;

export async function commitToOpenAI(task: string, answer: string, image: string | null, type: string, category?: string) {
    try {
        const result = await doCommit(task, answer, image, type, category)
        return result
    } catch (error) {
        //透传错误类型
        // if(error instanceof Error){
        //
        // }
    }
    return null
}

async function doCommit(task: string, answer: string, images: string | null, part: string, type?: string) {
    const imageContents: ChatCompletionContentPartImage[] = images ? images.split(",").map((image) => {
        return {
            type: "image_url",
            image_url: {
                url: image
            }
        }
    }) : []
    console.log("image = ", `${imageContents}, url = ${images}`)
    const userTextPromot = ` ## 写作类型如下：
* ${type} 为雅思写作的类型(academic或general), ${part}为雅思写作的部分（Part1/Part2）

## 写作题目如下，如果有图片则需要参考图片内容给出评估：
* ${task}

## 题目相关的图片如下: 如果是null代表没有图片，否则是以';'分隔的图片，可能有1-3张。
* ${images} 

## 用户输入答案如下：
* ${answer}
`
    const response = await aiConnection.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user",
                content: [{
                    type: "text",
                    text: userTextPromot
                },
                    ...imageContents]
            },
        ],
        temperature:0.5
    })

    const evaluation = response.choices[0].message.content;

    return evaluation
}

export async function commitCustomToOpenAI(question: string, answer: string, image: string | null, type: string, band?: string) {
    try {
        const result = await doCustomCommit(question, answer, image, type, band)
        //TODO: check
        return result
    } catch (error) {
        //透传错误类型
        // if(error instanceof Error){
        //
        // }
        console.log("who's error = ", error)
    }
    return null
}

async function doCustomCommit(question: string, answer: string, image: string | null, type: string, band?: string) {
    const response = await aiConnection.chat.completions.create({
        messages: [{
            role: "system",
            content: custom_gpt
        },
            {
                role: "user",
                content: `
## 写作类型如下：
*  ${type} (type)+ ${band}(band), 代表了具体的英语等级评估标准(type)和具体的评估等级(band), 注意如IELTS和TOFEL可能只有type没有band

## 写作题目如下，如果有图片则需要参考图片内容给出评估：
'''
* ${question}(question)
'''

## 用户输入答案如下：
'''
* ${answer}(answer)
'''
`
            }
        ],
        model: "gpt-4o",
    })

    const evaluation = response.choices[0].message.content;

    return evaluation
}

export async function ocr(image_url: string) {
    try {
        const ocrResult = await doOcr(image_url)
        return ocrResult.choices[0].message.content

    } catch (e) {
        //DoString?
    }
}

function doOcr(image_url: string) {
    return aiConnection.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "user",
                content: [
                    {
                        type: "image_url",
                        image_url: {
                            url: image_url
                        }
                    },
                    {
                        type: "text",
                        text: handwritten_prompt
                    }

                ]
            }
        ]
    });
}