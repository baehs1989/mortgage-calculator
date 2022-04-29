import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Button from './Button'

describe("Rendering Button Component", ()=>{

    const onClickEvent = jest.fn()
    const setup = () => {
        const { getByTestId } = render(<Button onClick={onClickEvent}>TEST</Button>);
        return getByTestId('component_button')
    }

    it("render without error", ()=>{
        let button = setup()

        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent("TEST")
    })
    
    it("onClick triggered after click event", ()=>{
        let button = setup()

        expect(onClickEvent).toHaveBeenCalledTimes(0);
        fireEvent.click(button)
        expect(onClickEvent).toHaveBeenCalledTimes(1);
        fireEvent.click(button)
        expect(onClickEvent).toHaveBeenCalledTimes(2);
    })

})