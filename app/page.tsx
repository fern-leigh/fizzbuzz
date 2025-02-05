'use client';
import Image from "next/image";
import { useState } from "react";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

export default function Home() {
  const [step, setStep] = useState(1);
  const [lowerValue, setLowerValue] = useState(1);
  const [upperValue, setUpperValue] = useState(25);
  const [fizzBuzz, setFizzBuzz] = useState(false );

  const onSliderInput = (element: Array<number>) => {
    setLowerValue(element[0]);
    setUpperValue(element[1]);
  }

  const onStepInput = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event && event.target) { setStep(parseInt(event.target.value)) };
  }

  function fizzBuzzIt(arr: Array<number>) {
    const results: Array<string> = [];
    arr.forEach((i: number) => {
      if (i % 5 == 0 && i % 3 == 0) {
        results.push('FizzBuzz')
      } else if (i % 5 == 0) {
        results.push('Buzz')
      } else if (i % 3 == 0) {
        results.push('Fizz')
      } else {
        results.push(i.toString())
      }
    })
    return results.join(", ")
  }

  function toggleFizzBuzz(){
    switch(fizzBuzz) {
      case false: setFizzBuzz(true);
      break;
      case true: setFizzBuzz(false);
      break;
      default:console.log('FizzBuzz neither true nor false')
    } 
  }

  function resetAll(){
    setFizzBuzz(false);
    setLowerValue(1);
    setUpperValue(25);
    setStep(1);
    
  }

  return (
    <div className="page">
      <header>
        <div className="logo">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/logo2.png`}
            alt="logo that says fizz-buzz in colored letters"
            fill

          />
        </div>
        <div className="instructions">
          <h1>Fizz-Buzz Kata</h1>
          <p>Print the numbers in a selected range (min 1 - max 100) and that increments
            by the given step amount. For multiples of three print “Fizz” instead of the number and for the
            multiples of five print “Buzz”. For numbers which are multiples of both three and
            five print “FizzBuzz “.</p>
        </div>
      </header>

      <main >
        <div>
          <div className="sliderContainer">
            <label id="rs">Select Range:</label>
            <RangeSlider
              id='rs'
              min={1}
              max={100}
              step={step}
              onInput={onSliderInput}
              defaultValue={[1, 25]}
              value={[lowerValue, upperValue]}
            />
          </div>

          <div className="step-container">
            <label id="step">Select Step:</label>
            <select id="step" onChange={onStepInput} value={step}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
            </select>
          </div>
        </div>

        <div className="output-container">
          <label id="output">Output:</label>
          <div className="results">
            <p>
              {!fizzBuzz &&
                Array.from(
                  { length: (upperValue - lowerValue) / step + 1 },
                  (value, index) => lowerValue + index * step
                ).join(", ")
              }
              </p>
              <p>
                {fizzBuzz &&
                  fizzBuzz &&
                  fizzBuzzIt(Array.from(
                    { length: (upperValue - lowerValue) / step + 1 },
                    (value, index) => lowerValue + index * step
                  ))
                }
              </p>
          </div>
        </div>

        <div className="controls-container">
          <button onClick={toggleFizzBuzz}>
            {!fizzBuzz && 'Apply FizzBuzz'
            }
            {fizzBuzz && 'Remove FizzBuzz'}
            </button>
          
          <button onClick={resetAll}>Reset All</button>
        </div>
      </main>

      <footer >
            <p>a kata by fern-leigh.dev</p>
      </footer>
    </div>
  );
}
