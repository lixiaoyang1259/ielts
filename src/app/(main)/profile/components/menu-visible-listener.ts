
let _map:{[key:string]: (visible:boolean)=>void} = {}

export const menuVisibleListener = {
    register(name : string, callback:(visible:boolean)=>void){
        _map[name] =  callback
    },

    unRegister(name : string){
        delete _map[name]
    },

    unMount(){
        _map = {}
    },

    onVisibleChange(name:string, visible: boolean){
        const callback = _map[name]
        if(callback){
            callback(visible)
        }
    }

}