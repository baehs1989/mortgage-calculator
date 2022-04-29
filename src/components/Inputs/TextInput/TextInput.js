import {useEffect, useState} from 'react'

import { numberWithCommas, numberWithoutCommas, checkMinMax, removePostfix, removePrefix } from '../../../util';
import styles from './TextInput.module.css'

const TextInput = ({onBlur=()=>{}, initialValue=0, decimals=0, min, max, prefix="", postfix="", disabled=false}) => {
    const [value, setValue] = useState('')

    useEffect(()=>{
        let updated_value = checkMinMax(parseFloat(initialValue), min, max).toFixed(decimals)
        setValue(`${prefix}${numberWithCommas(updated_value)}${postfix}`)
    },[initialValue, prefix, postfix, decimals, min, max])

    const onFocus = (e) =>{
        e.target.select();
    }

    const onHandleBlur = () => {
        let updated_value = numberWithoutCommas(removePostfix(removePrefix(value, prefix), postfix))
        if (updated_value.length > 0 && !isNaN(updated_value)){
            updated_value = checkMinMax(parseFloat(updated_value), min, max).toFixed(decimals)
            onBlur(updated_value)
            setValue(`${prefix}${numberWithCommas(updated_value)}${postfix}`)
        }else{
            updated_value = checkMinMax(parseFloat(initialValue), min, max).toFixed(decimals)
            setValue(`${prefix}${numberWithCommas(updated_value)}${postfix}`)
        }
    }

    return (
        <input data-testid="component_inputs_textinput" disabled={disabled} className={styles.TextInput} type="text" value={value} onFocus={onFocus} onChange={(e)=>setValue(e.target.value)} onBlur={onHandleBlur}/>
    );
}
 
export default TextInput;