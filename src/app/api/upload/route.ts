import 'server-only'

export async function POST(request: Request) {
    return Response.json(`ok`, {status: 200})
    // const data = await request.json() as (ielts_task & {code : string} )
    // if(data.code != "abcdefggggg"){
    //     return Response.json("ok" + data.code, {status: 400})
    // }
    //
    // try{
    //     const task = await createTask(data.title,
    //         data.part, data.type, data.time, data.words, data.image
    //         , data.question,data.model_answer, data.version)
    //     if(task){
    //         return Response.json(`ok`, {status: 200})
    //     }
    //     return Response.json(`task = ${task}`, {status: 400})
    //
    // }catch (e){
    //     return Response.json(`${e}`, {status: 400});
    // }
}