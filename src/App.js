import { useState, useReducer, useEffect, useRef, useCallback } from "react";

import { numberWithCommas } from "./util";
import Icon from "./components/Icon/Icon";
import TextInput from "./components/Inputs/TextInput/TextInput";
import Dropdown from "./components/Inputs/Dropdown/Dropdown";
import Button from "./components/Button/Button";
import styles from "./App.module.css";
import useElementSize from "./hook/useElementSize";

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

const INITIAL_DOWN_PERCENTAGE = 20;

const CURRENCY = "$";

const initialState = {
  disabled: true,
  askingPrice: 0,
  downPercentage: 0,
  downPayment: 0,
  amortization_period: AMORTIZATION_PERIOD[4],
  mortgageRate: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "disabled":
      if (!state.disabled) return state;

      return {
        ...state,
        [action.type]: false,
        downPercentage: INITIAL_DOWN_PERCENTAGE,
        downPayment: state.askingPrice * (INITIAL_DOWN_PERCENTAGE / 100),
        amortization_period: AMORTIZATION_PERIOD[4],
        mortgageRate: 2,
      };

    case "downPercentage":
      return {
        ...state,
        [action.type]: action.value,
        downPayment: (state.askingPrice * action.value) / 100,
      };

    case "downPayment":
      let downPercentage = (action.value / state.askingPrice) * 100
      return {
        ...state,
        [action.type]: action.value,
        downPercentage: downPercentage?downPercentage:0,
      };

    case "askingPrice":
      return {
        ...state,
        [action.type]: action.value,
        downPayment: (action.value * state.downPercentage) / 100,
      };

    default:
      return {
        ...state,
        [action.type]: action.value,
      };
  }
};

function App() {
  const [data, dispatch] = useReducer(reducer, initialState);
  const [mortgageRequired, setMortgageRequired] = useState(0);
  const [montlyPayment, setMonthlyPayment] = useState(0);
  const appRef = useRef();
  const size = useElementSize(appRef);

  useEffect(() => {
    if (!data.disabled) {
      const mortgage_required =
        data.askingPrice - (data.askingPrice * data.downPercentage) / 100;
      const principal = mortgage_required;
      const termOfLoan = data.amortization_period.value;
      const annualInterestRate = data.mortgageRate;
      const percentageRate = annualInterestRate / 1200;
      const lengthOfLoan = 12 * termOfLoan;
      const monthlyPayment =
        (principal * percentageRate) /
        (1 - Math.pow(1 + percentageRate, lengthOfLoan * -1));

      setMortgageRequired(mortgage_required?mortgage_required:0);
      setMonthlyPayment(monthlyPayment?monthlyPayment:0);
    }
  }, [data]);

  const handleFieldUpdate = useCallback((field, value) => {
    dispatch({ type: field, value });
  }, [])

  return (
    <div
      data-testid="app"
      ref={appRef}
      className={styles.OuterDiv + " " + styles[size]}
    >
      <div className={styles.InnerDiv}>
        <div className={styles.App + " " + styles[size]}>
          <div data-testid="asking_price_section">
            <div>Asking Price</div>
            <div>
              <TextInput
                initialValue={data.askingPrice}
                onBlur={(value) =>
                  handleFieldUpdate("askingPrice", parseFloat(value))
                }
                decimals={0}
                min={0}
                prefix={CURRENCY}
              />
            </div>
            <div className={styles.Justify_Center}>
              <Button onClick={() => handleFieldUpdate("disabled")}>GO</Button>
            </div>
          </div>

          <div data-testid="down_payment_section">
            <div>Down Payment</div>
            <div
              className={
                styles.Block_Div +
                " " +
                styles.Flex_Zero +
                " " +
                styles.Icon +
                " " +
                styles[size]
              }
            >
              <div style={{ height: "50%" }}></div>
              <div
                style={{
                  height: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon>-</Icon>
              </div>
            </div>
            <div className={styles.Block_Div}>
              <div className={styles.Color1}>
                <TextInput
                  initialValue={data.downPercentage}
                  disabled={data.disabled}
                  onBlur={(value) =>
                    handleFieldUpdate("downPercentage", parseFloat(value))
                  }
                  decimals={2}
                  min={0}
                  max={100}
                  postfix="%"
                />
              </div>
              <div className={styles.Color2}>
                <TextInput
                  initialValue={data.downPayment}
                  disabled={data.disabled}
                  onBlur={(value) =>
                    handleFieldUpdate("downPayment", parseFloat(value))
                  }
                  min={0}
                  max={data.askingPrice}
                  prefix={CURRENCY}
                />
              </div>
            </div>
          </div>

          <div
            data-testid="total_mortgage_section"
            className={styles.Colored_Section}
          >
            <div>
              <b>Total Mortgage Required</b>
            </div>
            <div
              className={
                styles.Justify_Center +
                " " +
                styles.Flex_Zero +
                " " +
                styles.Icon +
                " " +
                styles[size]
              }
            >
              <Icon>=</Icon>
            </div>
            <div
              data-testid="app_mortgage_required"
              className={styles.Justify_Center}
            >
              <b>{CURRENCY}{numberWithCommas(mortgageRequired.toFixed(0))}</b>
            </div>
          </div>

          <div data-testid="amortization_section">
            <div>Amortization period</div>
            <div>
              <Dropdown
                initialValue={data.amortization_period}
                disabled={data.disabled}
                onChange={(v) => handleFieldUpdate("amortization_period", v)}
                options={AMORTIZATION_PERIOD}
              />
            </div>
          </div>

          <div data-testid="mortage_rate_section">
            <div>Mortgage Rate</div>
            <div>
              <TextInput
                initialValue={data.mortgageRate}
                disabled={data.disabled}
                onBlur={(value) =>
                  handleFieldUpdate("mortgageRate", parseFloat(value))
                }
                decimals={2}
                min={0}
                max={100}
                postfix="%"
              />
            </div>
          </div>

          <div
            data-testid="mortgage_payment_section"
            className={styles.Colored_Section}
          >
            <div className={styles.MortgagePayment}>
              <div>
                <b>Total Mortgage Payment</b>
              </div>
              <div>Monthly</div>
            </div>
            <div
              data-testid="app_mortgage_payment"
              className={styles.Justify_Center}
            >
              <b>{CURRENCY}{numberWithCommas(montlyPayment.toFixed(0))}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
