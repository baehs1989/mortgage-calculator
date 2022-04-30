import React from 'react';
import { render, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import App from './App'

//integration test
describe("Rendering App Component", ()=>{

    const setup = (props) => {
        const { getByTestId } = render(<App {...props}/>);
        const result = {
            app: getByTestId('app'),
            asking_price_section: within(getByTestId('app')).getByTestId("asking_price_section"),
            down_payment_section: within(getByTestId('app')).getByTestId("down_payment_section"),
            total_mortgage_section: within(getByTestId('app')).getByTestId("total_mortgage_section"),
            amortization_section:within(getByTestId('app')).getByTestId("amortization_section"),
            mortage_rate_section:within(getByTestId('app')).getByTestId("mortage_rate_section"),
            mortgage_payment_section:within(getByTestId('app')).getByTestId("mortgage_payment_section"),
        }
        return result
    }

    describe("render without error", ()=>{
        it ('inital rendering', ()=>{
            const app = setup()
            Object.values(app).forEach((section)=>{
                expect(section).toBeInTheDocument()
            })
            const textinputs = within(app.app).getAllByTestId('component_inputs_textinput')
            textinputs.forEach((textinput, index)=>{
                if (index === 0){
                    //first field for asking price should not be disabled
                    expect(textinput.disabled).toBeFalsy()
                }else{
                    expect(textinput.disabled).toBeTruthy()
                }
            })

            const dropdowns = within(app.app).getAllByTestId('component_inputs_dropdown')
            dropdowns.forEach((dropdowns)=>{
                expect(dropdowns.disabled).toBeTruthy()
            })
        })
    })

    describe("user flows", ()=>{
        it("inital calculation starts with 550000",()=>{
            const app = setup();
            const input_asking_price = within(app.asking_price_section).getByTestId('component_inputs_textinput')
            const go_button = within(app.asking_price_section).getByTestId('component_button')
            
            fireEvent.change(input_asking_price, {target:{value:550000}})
            fireEvent.blur(input_asking_price)
            userEvent.click(go_button)

            const down_payment_percentage = within(app.down_payment_section).getAllByTestId("component_inputs_textinput")[0]
            const down_payment = within(app.down_payment_section).getAllByTestId("component_inputs_textinput")[1]
            const mortgage_required = within(app.total_mortgage_section).getByTestId("app_mortgage_required")
            const amortization_period = within(app.amortization_section).getByTestId("component_inputs_dropdown")
            const mortgage_rate = within(app.mortage_rate_section).getByTestId("component_inputs_textinput")
            const mortgage_payment = within(app.mortgage_payment_section).getByTestId("app_mortgage_payment")

            expect(down_payment_percentage.value).toBe("20.00%")
            expect(down_payment.value).toBe("$110,000")
            expect(mortgage_required).toHaveTextContent("$440,000")
            expect(amortization_period.value).toBe("25")
            expect(mortgage_rate.value).toBe("2.00%")
            expect(mortgage_payment).toHaveTextContent("$1,865")  

            //update asking_price value
            fireEvent.change(input_asking_price, {target:{value:400000}})
            fireEvent.blur(input_asking_price)
            expect(down_payment.value).toBe("$80,000")
            expect(mortgage_required).toHaveTextContent("$320,000")
            expect(mortgage_payment).toHaveTextContent("$1,356")

            fireEvent.change(input_asking_price, {target:{value:0}})
            fireEvent.blur(input_asking_price)
            expect(down_payment.value).toBe("$0")
            expect(mortgage_required).toHaveTextContent("$0")
            expect(mortgage_payment).toHaveTextContent("$0") 

            fireEvent.change(input_asking_price, {target:{value:400000}})
            fireEvent.blur(input_asking_price)

            //update asking_price value = 0
            fireEvent.change(input_asking_price, {target:{value:0}})
            fireEvent.blur(input_asking_price)
            expect(down_payment.value).toBe("$0")
            expect(mortgage_required).toHaveTextContent("$0")
            expect(mortgage_payment).toHaveTextContent("$0")
            expect(mortgage_required).toHaveTextContent("$0")

            fireEvent.change(input_asking_price, {target:{value:400000}})
            fireEvent.blur(input_asking_price)

            //update down payment %
            fireEvent.change(down_payment_percentage, {target:{value:'10%'}})
            fireEvent.blur(down_payment_percentage)
            expect(down_payment.value).toBe("$40,000")
            expect(mortgage_required).toHaveTextContent("$360,000")
            expect(mortgage_payment).toHaveTextContent("$1,526")

            //down payment % cannot exeed 100 % or below 0 %
            fireEvent.change(down_payment_percentage, {target:{value:'110%'}})
            fireEvent.blur(down_payment_percentage)
            expect(down_payment_percentage.value).toBe('100.00%');

            fireEvent.change(down_payment_percentage, {target:{value:'-10%'}})
            fireEvent.blur(down_payment_percentage)
            expect(down_payment_percentage.value).toBe('0.00%');

            fireEvent.change(down_payment_percentage, {target:{value:'10%'}})
            fireEvent.blur(down_payment_percentage)

            //update down payment amount
            fireEvent.change(down_payment, {target:{value:'30000'}})
            fireEvent.blur(down_payment)
            expect(down_payment_percentage.value).toBe("7.50%")
            expect(mortgage_required).toHaveTextContent("$370,000")
            expect(mortgage_payment).toHaveTextContent("$1,568") 

            //down payment can not be exceed aksing price
            fireEvent.change(down_payment, {target:{value:'500000'}})
            fireEvent.blur(down_payment)

            expect(down_payment_percentage.value).toBe("100.00%")
            expect(mortgage_required).toHaveTextContent("$0")
            expect(mortgage_payment).toHaveTextContent("$0") 

            fireEvent.change(down_payment, {target:{value:'30000'}})
            fireEvent.blur(down_payment)

            //update Amortization period
            fireEvent.change(amortization_period, {target:{value:30}})
            expect(mortgage_payment).toHaveTextContent("$1,368") 

            //update mortgage rate
            fireEvent.change(mortgage_rate, {target:{value:'3'}})
            fireEvent.blur(mortgage_rate)
            expect(mortgage_payment).toHaveTextContent("$1,560")

            //mortgage rate cannot exeed 100 or below 0
            fireEvent.change(mortgage_rate, {target:{value:'120'}})
            fireEvent.blur(mortgage_rate)
            expect(mortgage_rate.value).toBe("100.00%")

            fireEvent.change(mortgage_rate, {target:{value:'-20'}})
            fireEvent.blur(mortgage_rate)
            expect(mortgage_rate.value).toBe("0.00%")

        })
    })


})