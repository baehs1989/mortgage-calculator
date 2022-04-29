import { renderHook } from '@testing-library/react'
import useElementSize from './useElementSize'

describe("useElementSize test",()=>{

    it("Return value for element with width under 300px", ()=>{
        const ref = {
            current: {
                offsetWidth:200
            }
        }
    
        const {result} = renderHook(()=>useElementSize(ref))
        expect(result.current).toBe('s')
    })

    it("Return value for element with width over 600px", ()=>{
        const ref = {
            current: {
                offsetWidth:602
            }
        }
    
        const {result} = renderHook(()=>useElementSize(ref))
        expect(result.current).toBe('l')
    })

    it("Return value for element with width between 300 - 600px", ()=>{
        const ref = {
            current: {
                offsetWidth:450
            }
        }
    
        const {result} = renderHook(()=>useElementSize(ref))
        expect(result.current).toBe('m')
    })

})