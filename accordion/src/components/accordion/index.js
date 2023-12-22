import { useState } from "react"
import data from "./data";
import "./style.css";


export default function Accordion(){

    const [selected, setSelected] = useState(null);
    const [enableMutliSelect, setEnableMutliSelect] = useState(false);
    const [multiple, setMultiple]= useState([])

   function handleSingleSelection (getCurrentId){
    setSelected(getCurrentId === selected 
        ?
        null
        : 
        getCurrentId
        );
   }

   function handleMultiSelection (getCurrentId){

    let cpyMultiple = [...multiple];
    const findIndexOfCureentId = cpyMultiple.indexOf(getCurrentId)

    console.log(findIndexOfCureentId);
    if (findIndexOfCureentId === -1) cpyMultiple.push(getCurrentId)
    else cpyMultiple.splice(findIndexOfCureentId, 1)

    setMultiple(cpyMultiple)
   }

   console.log(selected, multiple);
    return <div className="wrapper">
        <button onClick={
            ()=> setEnableMutliSelect(!enableMutliSelect)}>
                Enable Multi select accordion</button>
        <div className="accordion">
            {
                data && data.length > 0 ?
                data.map(dataItem=> <div className="item">
                    
                <div onClick={ 
                    enableMutliSelect
                     ? ()=> handleMultiSelection(dataItem.id)
                     : ()=> handleSingleSelection(dataItem.id)
                     }
                    className="title"
                    >
                    <h3>{dataItem.question}</h3>
                    <span>  + </span> </div>

                    {
                    enableMutliSelect ?
                    multiple.indexOf(dataItem.id) !== -1 && (
                        <div className="content"> {dataItem.answer}</div>
                    )
                    :
                    selected === dataItem.id && (
                        <div className="content"> {dataItem.answer}</div>
                    )}
                     </div>
                )
                :(
                <div> No Data found !</div>
            
            )}
        </div>
    </div>
}