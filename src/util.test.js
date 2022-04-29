import {numberWithCommas, numberWithoutCommas, checkMinMax, removePostfix, removePrefix} from './util'

describe("numberWithCommas", ()=>{
    it("empty or undefined or non-digit input", ()=>{
        expect(numberWithCommas(undefined)).toBe('')
        expect(numberWithCommas("")).toBe('')
        expect(numberWithCommas("adfedfsdf")).toBe('')
    })

    it("valid inputs", ()=>{
        expect(numberWithCommas(-1000)).toBe('-1,000')
        expect(numberWithCommas("-1000")).toBe('-1,000')
        expect(numberWithCommas(-1000.123)).toBe('-1,000.123')
        expect(numberWithCommas("-1000.123")).toBe('-1,000.123')

        expect(numberWithCommas(-10)).toBe('-10')
        expect(numberWithCommas("-10")).toBe('-10')

        expect(numberWithCommas(0)).toBe('0')
        expect(numberWithCommas("0")).toBe('0')
        expect(numberWithCommas(0.123)).toBe('0.123')
        expect(numberWithCommas("0.123")).toBe('0.123')
        
        expect(numberWithCommas(100)).toBe('100')
        expect(numberWithCommas("100")).toBe('100')
        expect(numberWithCommas(100.123)).toBe('100.123')
        expect(numberWithCommas("100.123")).toBe('100.123')

        expect(numberWithCommas(123223)).toBe('123,223')
        expect(numberWithCommas(123223.123)).toBe('123,223.123')
        expect(numberWithCommas("123223")).toBe('123,223')
        expect(numberWithCommas("123223.123")).toBe('123,223.123')
    })
})


describe("numberWithoutCommas", ()=>{
    it("empty or undefined or invalid inputs", ()=>{
        expect(numberWithoutCommas(undefined)).toBe('0')
        expect(numberWithoutCommas("")).toBe('0')
        expect(numberWithoutCommas("adfds")).toBe('adfds')
        expect(numberWithoutCommas("ad,fds")).toBe('ad,fds')
        expect(numberWithoutCommas("199,32,2.12.23")).toBe('199,32,2.12.23')
    })

    it("valid inputs", ()=>{
        expect(numberWithoutCommas("100")).toBe('100')
        expect(numberWithoutCommas("100.123")).toBe('100.123')
        expect(numberWithoutCommas("1,000")).toBe('1000')
        expect(numberWithoutCommas("1,000.123")).toBe('1000.123')
        expect(numberWithoutCommas("100,000,000")).toBe('100000000')
        expect(numberWithoutCommas("100,000,000.123")).toBe('100000000.123')
        expect(numberWithoutCommas("-100")).toBe('-100')
        expect(numberWithoutCommas("-100.123")).toBe('-100.123')
        expect(numberWithoutCommas("-1,000")).toBe('-1000')
        expect(numberWithoutCommas("-1,000.123")).toBe('-1000.123')
        expect(numberWithoutCommas("-100,000,000")).toBe('-100000000')
        expect(numberWithoutCommas("-100,000,000.123")).toBe('-100000000.123')
        expect(numberWithoutCommas("199,32,2.1223")).toBe('199322.1223')
    })
})

describe("checkMinMax", ()=>{
    it("min / max are undefined", ()=>{
        expect(checkMinMax(5)).toBe(5)
    })

    it("only min is defined", ()=>{
        expect(checkMinMax(5, 23)).toBe(23)
        expect(checkMinMax(23, 23)).toBe(23)
        expect(checkMinMax(24, 23)).toBe(24)
    })

    it("only max is defined", ()=>{
        expect(checkMinMax(5, undefined, 100)).toBe(5)
        expect(checkMinMax(100, undefined, 100)).toBe(100)
        expect(checkMinMax(100.1, undefined, 100)).toBe(100)
    })

    it("min/max are defined", ()=>{
        expect(checkMinMax(5, 0, 100)).toBe(5)
        expect(checkMinMax(100, 0, 100)).toBe(100)
        expect(checkMinMax(100.1, 0, 100)).toBe(100)
        expect(checkMinMax(1000, 0, 100)).toBe(100)
        expect(checkMinMax(-0.12, 0, 100)).toBe(0)
        expect(checkMinMax(-199, 0, 100)).toBe(0)
    })
})

describe("removePrefix", ()=>{
    it("undefined params passed", ()=>{
        expect(removePrefix(undefined, undefined)).toBe(undefined)
        expect(removePrefix("test", undefined)).toBe("test")
    })

    it('valid params passed', ()=>{
        expect(removePrefix("test", "")).toBe("test")
        expect(removePrefix("test", "test")).toBe("")
        expect(removePrefix("test", "t")).toBe("est")
        expect(removePrefix("test", "te")).toBe("st")
    })
})

describe("removePostfix", ()=>{
    it("undefined params passed", ()=>{
        expect(removePostfix(undefined, undefined)).toBe(undefined)
        expect(removePostfix("test", undefined)).toBe("test")
    })

    it('valid params passed', ()=>{
        expect(removePostfix("test", "")).toBe("test")
        expect(removePostfix("test", "test")).toBe("")
        expect(removePostfix("test", "t")).toBe("tes")
        expect(removePostfix("test", "st")).toBe("te")
    })
})