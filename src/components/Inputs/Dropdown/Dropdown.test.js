import React from 'react';
import { render, fireEvent, within } from '@testing-library/react';
import Dropdown from './Dropdown'

describe("Rendering Dropdown Component", ()=>{


    const AMORTIZATION_PERIOD = [
        {
          value: 5,
          label: "5 years",
        },
        {
          value: 10,
          label: "10 years",
        },
        {
          value: 15,
          label: "15 years",
        },
        {
          value: 20,
          label: "20 years",
        },
        {
          value: 25,
          label: "25 years",
        },
        {
          value: 30,
          label: "30 years",
        },
    ];
    const onChangeEvent = jest.fn()

    const setup = (props) => {
        const { getByTestId } = render(<Dropdown options={AMORTIZATION_PERIOD} {...props}/>);
        return getByTestId('component_inputs_dropdown')
    }

    describe("render without error", ()=>{
        it("render with correct options", ()=>{
            let dropdown = setup()
            let options = within(dropdown).getAllByTestId('component_inputs_dropdown_option')
    
            expect(dropdown).toBeInTheDocument();
            expect(options.length).toBe(AMORTIZATION_PERIOD.length)
            expect(options[0]).toHaveTextContent(AMORTIZATION_PERIOD[0].label)
            expect(options[AMORTIZATION_PERIOD.length-1]).toHaveTextContent(AMORTIZATION_PERIOD[AMORTIZATION_PERIOD.length-1].label)
        })

        it("render disabled dropdown", ()=>{
            let dropdown = setup({disabled:true})
            expect(dropdown).toBeInTheDocument();
            expect(dropdown.disabled).toBe(true)
        })
    })

    it ("onChange triggered", ()=>{
        let dropdown = setup({disabled:true, onChange:onChangeEvent})
        fireEvent.change(dropdown, { target: { value: 5 } })
        fireEvent.change(dropdown, { target: { value: 10 } })
        let options = within(dropdown).getAllByTestId('component_inputs_dropdown_option')
        expect(options[0].selected).toBeFalsy();
        expect(options[1].selected).toBeTruthy();
        expect(onChangeEvent).toHaveBeenCalledTimes(2);
    })


})