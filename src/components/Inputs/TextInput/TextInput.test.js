import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import { numberWithCommas } from '../../../util';
import TextInput from './TextInput'

describe("Rendering Dropdown Component", ()=>{

    const onBlurEvent = jest.fn()

    const setup = (props) => {
        const { getByTestId } = render(<TextInput {...props}/>);
        return getByTestId('component_inputs_textinput')
    }

    describe("render without error", ()=>{
        it("render wihtout error", ()=>{
            let textinput = setup({
                onBlur:onBlurEvent,
                initialValue:10000,
            })
            expect(textinput).toBeInTheDocument()
            expect(textinput.value).toBe(numberWithCommas(10000))
        })

        it("render disabled textinput", ()=>{
            let textinput = setup({
                onBlur:onBlurEvent,
                initialValue:10000,
                disabled:true
            })
            expect(textinput).toBeInTheDocument()
            expect(textinput.disabled).toBe(true)

        })

        it("render textinput with decimals prop", ()=>{
            let number = 10000
            let textinput = setup({
                onBlur:onBlurEvent,
                initialValue:number,
                decimals: 2
            })
            expect(textinput).toBeInTheDocument()
            expect(textinput.value).toBe(numberWithCommas(number.toFixed(2)))
        })

        it("render textinput with prefix prop", ()=>{ 
            let prefix = "$ "
            let number = 10000
            let textinput = setup({
                onBlur:onBlurEvent,
                initialValue:number,
                prefix
            })
            expect(textinput).toBeInTheDocument()
            expect(textinput.value).toBe(prefix+numberWithCommas(number))
        })

        it("render textinput with postfix prop", ()=>{
            let postfix = "$ "
            let number = 10000
            let textinput = setup({
                onBlur:onBlurEvent,
                initialValue:number,
                postfix
            })
            expect(textinput).toBeInTheDocument()
            expect(textinput.value).toBe(numberWithCommas(number)+postfix)
        })

        it("render textinput with min/max props", ()=>{
            let textinput = setup({
                onBlur:onBlurEvent,
                initialValue:10000,
                min: 0,
                max: 100
            })
            expect(textinput).toBeInTheDocument()
            expect(textinput.value).toBe("100")

            fireEvent.change(textinput, { target: { value: 50 } })
            fireEvent.blur(textinput)
            expect(textinput.value).toBe("50")

            fireEvent.change(textinput, { target: { value: 200 } })
            fireEvent.blur(textinput)
            expect(textinput.value).toBe("100")

            fireEvent.change(textinput, { target: { value: -4 } })
            fireEvent.blur(textinput)
            expect(textinput.value).toBe("0")
        })
        
    })

    it ("onBlur triggered", ()=>{
        let textinput = setup({
            onBlur:onBlurEvent,
            initialValue:10000,
        })
        expect(textinput).toBeInTheDocument()
 
        fireEvent.change(textinput, { target: { value: 200 } })
        fireEvent.blur(textinput)

        expect(onBlurEvent).toBeCalledTimes(1)
    })

    it ("onFocus Event triggered", ()=>{
        let textinput = setup({
            onBlur:onBlurEvent,
            initialValue:10000,
        })

        userEvent.click(textinput)
        userEvent.type(textinput, '{del}')

        expect(textinput.value).toBe('')
    })

    it ("type invalid value", ()=>{
        let number = 10000
        let textinput = setup({
            onBlur:onBlurEvent,
            initialValue:number,
        })

        fireEvent.change(textinput, { target: { value: "1.23aedf" } })
        fireEvent.blur(textinput)
        expect(textinput.value).toBe(numberWithCommas(number))
    })

})