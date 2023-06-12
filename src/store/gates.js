import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    gateData :[
        {name:'x',x: 466.9065929751764, y: 102.42320325576769 },
        {name:'x',x: 484.1868850336453, y: 272.91444290660036 },
        {name:'x',x: 541.8887842972197, y: 154.12008560195568 },
        {name:'x',x: 271.53774940964996, y: 531.9851519575209 },
        {name:'x',x: 345.0592044858252, y: 78.04604241673599 },
        {name:'x',x: 475.00449940245727, y: 70.53647756623084 },
        {name:'x',x: 525.6691113014153, y: 439.16902414529136 },
        {name:'x',x: 247.51646497023881, y: 349.52025451396474 },
        {name:'x',x: 459.9352827158698, y: 198.823791829476 },
        {name:'x',x: 192.9196397759271, y: 503.257955788431 },
        {name:'x',x: 312.1395811769596, y: 354.45066232621093 },
        {name:'x',x: 210.37885439766518, y: 47.82323602433111 },
        {name:'x',x: 111.78067067064467, y: 379.7777361654946 },
        {name:'x',x: 311.0496953791672, y: 71.47852226539321 },
        {name:'x',x: 256.57954233247034, y: 319.0050839939429 },
        {name:'x',x: 499.6378764865582, y: 308.23544017199873 },
        {name:'x',x: 84.92439203765625, y: 66.33106835130616 },
        {name:'x',x: 41.47797925164862, y: 356.60655561972925 },
        {name:'x',x: 412.92743405457054, y: 101.86715327712477 },
        {name:'x',x: 375.27194925572786, y: 379.6000162074881 }
      ],
      selGateData:[]
	
}
export const gatesSlice=createSlice({
    name:"gates",
    initialState,
    reducers:{
        add:()=>{},
        setSelGateData:(state,action)=>{
            state.selGateData=action.payload
        },
        dragGate:(state,action)=>{
            let  {index, mouseDownX, mouseDownY }=action.payload
            // state.gateData=state.gateData
            state.gateData[index].x=mouseDownX
            state.gateData[index].y=mouseDownY
    

        }

    }
})