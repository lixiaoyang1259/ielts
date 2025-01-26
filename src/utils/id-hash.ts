import Sqids from "sqids";

declare global {
    var sqids : Sqids
}
if(!global.sqids){
    global.sqids = new Sqids({
        alphabet: '8DwaU04XM1kBN6cuht9fHQrqSVKdpsAvTzimLGIJOgb5ZEFxnjW3Co7l2RePyY',
    });
}

const sqids = global.sqids;

export default sqids
export function toUniqueId  (data: number){
    return sqids.encode([97, 33, data, 14])
}

export function toNumberId (saltedArray : string){
    const decodeIds = sqids.decode(saltedArray)
    if(decodeIds.length != 4){
        return -1
    }
    return decodeIds[2]
}
