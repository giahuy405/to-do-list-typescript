import { debug, log } from "../constant"

export interface ExtraInfoTypes{
    debug:boolean
    log: (value: any) => void
}

export default function connect(Component:any){
    return function (props:any){
        return ( <Component {...props} debug={debug} log={log} /> )
    }
}