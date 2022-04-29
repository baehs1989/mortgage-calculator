import React from 'react';
import { render } from '@testing-library/react';

import Icon from './Icon'

describe("Rendering Ico  Component", ()=>{

    const setup = () => {
        const { getByTestId } = render(<Icon>TEST</Icon>);
        return getByTestId('component_icon')
    }

    it("render without error", ()=>{
        let icon = setup()

        expect(icon).toBeInTheDocument();
        expect(icon).toHaveTextContent("TEST")
    })

})