import React, {memo, useState} from 'react'
import spacef from './spacef'
import './App.css';

function App() {
  const [value , setValue] = useState("0");
  const [memory, setMemory] = useState(null);
  const [operator, setOperator] = useState(null);
  const [mem , setMem] = useState(null);
  const [second, setSecond] = useState(true);
  const [lastoper, setLastoper] = useState(null)

  let mrStyle = {}
  if(mem !== null){
    mrStyle = {
      backgroundColor: "#666666"
    }
  }
  let seStyle = {}
  if(!second){
    seStyle = {
      backgroundColor: "#666666"
    }
  }
 
  const handleButtonPress = (carrier) => {

    if(carrier === "mr"){
      if(mem !== null){
        setValue((mem).toString())
        return;
      }
    }
    if(carrier === "AC"){
      setValue("0");
      setMemory(null);
      setOperator(null);
      return;
    }

    if (carrier === ".") {
      if (value.includes(".")) return;
      setValue(value + ".");
      return;
    }

    if (carrier === "+" || carrier === "−" || carrier === "x" || carrier === "÷" || carrier === "xy"  || carrier === "sqrX" ||
        carrier === "EE" || carrier === "yx" || carrier === "logy") {
      if (operator !== null) {
        if (operator === "+") {
          setMemory(memory + parseFloat(value));
        } else if (operator === "−") {
          setMemory(memory - parseFloat(value));
        } else if (operator === "x") {
          setMemory(memory * parseFloat(value));
        } else if (operator === "÷") {
          setMemory(memory / parseFloat(value));
        } else if (operator === "xy"){
          setMemory(memory ** parseFloat(value));
        } else if (operator === "yx"){
          setMemory(parseFloat(value) ** memory)
        } else if (operator === "sqrX"){
          setMemory(memory ** (1 / parseFloat(value)));
        } else if (operator === "EE"){
          setMemory(memory * (10 ** parseFloat(value)));
        } else if(operator === "m+"){
          setMem(mem + parseFloat(value));setValue('0');
        } else if(operator === "m-"){
          setMem(mem - parseFloat(value).toString())
        } else if(operator === "logy"){
          setMemory(memory / Math.log10(parseFloat(value)))
        }
      } else {
        setMemory(parseFloat(value));
        setValue("0");
      }
      
      setOperator(carrier);
      return;
    }

    if (carrier === "=") {
      if (!operator) return;
      if (operator === "+") {
        setValue((memory + parseFloat(value)).toString());
      } else if (operator === "−") {
        setValue((memory - parseFloat(value)).toString());
      } else if (operator === "x") {
        setValue((memory * parseFloat(value)).toString());
      } else if (operator === "÷") {
        setValue((memory / parseFloat(value)).toString());
      } else if(operator === "xy"){
        setValue((memory ** parseFloat(value)).toString())
      } else if(operator === "yx"){
        setValue((parseFloat(value) ** memory).toString())
      } else if(operator === "sqrX"){
        setValue((Math.pow(memory, (1/parseFloat(value))).toString()))
      } else if(operator === "EE"){
        setValue((memory * (10 ** parseFloat(value))).toString())
      } else if(operator === "logy"){
        setValue((Math.log10(memory) / Math.log10(parseFloat(value))).toString())
      }else 
      setMemory(null);
      setOperator(null);
      return;
    }
    
    if (value[value.length - 1] === ".") {
      setValue(value + carrier);
    } else if(value?.includes('.')){
      setValue((value + carrier).toString())
    }else{
      setValue(parseFloat(value + carrier).toString());
    }
    if(carrier === "")return;
    }

  return (
    <div className="App">
      <h3 className="head">It's not completed yet...</h3>
      <div className="calcultor">
        <div className="number">
          <p>{spacef(value)}</p>
        </div>
        <div className="numbers">

          <div  className="line">
          <button className="gray2Color" >(</button>    
          <button className="gray2Color" >)</button>    
          <button className="gray2Color" onClick={() => {setValue('0');setMem(null)}}>mc</button>     
          <button className="gray2Color" onClick={() => {setMem(mem + Number(value));setValue('0')}}>m+</button>       
          <button className="gray2Color" onClick={() => {setMem(mem - Number(value));setValue('0')}}>m-</button>     
          <button className="gray2Color" style={mrStyle} onClick={() => handleButtonPress('mr')}>mr</button>    
          <button className="grayColor" onClick={() => handleButtonPress('AC')}>AC</button>                           
          <button className="grayColor" onClick={() => setValue((parseFloat(value) * -1).toString())}>±</button>      
          <button className="grayColor" onClick={() => setValue((parseFloat(value) / 100).toString())}>%</button>     
          <button className="yellowColor" onClick={() => handleButtonPress('÷')}>÷</button>                           
          </div>

          <div className="line">
          <button className="gray2Color" style={seStyle} onClick={() => setSecond(!second)}>2<sup>nd</sup></button>                                                    
          <button className="gray2Color" onClick={() => setValue(value ** 2)}>x<sup>2</sup></button>  
          <button className="gray2Color" onClick={() => setValue(value ** 3)}>x<sup>3</sup></button>  
          <button className="gray2Color" onClick={() => handleButtonPress('xy')}>x<sup>y</sup></button>      
            {
              second 
              ? (<button className="gray2Color" onClick={() => setValue(Math.exp(value))}>e<sup>x</sup></button>  )
              : (<button className="gray2Color" onClick={() => handleButtonPress('yx')}>y<sup>x</sup></button>  ) 
            }
            {
              second 
              ? <button className="gray2Color" onClick={() => setValue(10 ** value)}>10<sup>x</sup></button>
              : <button className="gray2Color" onClick={() => setValue(2 ** value)}>2<sup>x</sup></button>  
            }
          
          <button className="gray1Color" onClick={() => handleButtonPress('7')}>7</button>            
          <button className="gray1Color" onClick={() => handleButtonPress('8')}>8</button>            
          <button className="gray1Color" onClick={() => handleButtonPress('9')}>9</button>            
          <button className="yellowColor" onClick={() => handleButtonPress('x')}>x</button>           
          </div>

          <div className="line">
          <button className="gray2Color" onClick={() => setValue(1 / value)}>1/x</button>             
          <button className="gray2Color" onClick={() => setValue(Math.sqrt(value))}><sup>2</sup> &radic;<span style={{textDecoration: "overline"}}>x</span></button>
          <button className="gray2Color" onClick={() => setValue(Math.cbrt(value))}><sup>3</sup> &radic;<span style={{textDecoration: "overline"}}>x</span></button>
          <button className="gray2Color" onClick={() => handleButtonPress('sqrX')}><sup>y</sup> &radic;<span style={{textDecoration: "overline"}}>x</span></button>
          {
            second 
            ? <button className="gray2Color" onClick={() => setValue(Math.log(value))}>In</button>  
            : <button className="gray2Color" onClick={() => handleButtonPress('logy')}>log<sub>y</sub></button>    
          }
          {
            second 
            ? <button className="gray2Color" onClick={() => setValue(Math.log10(value))}>Iog<sub>10</sub></button>  
            : <button className="gray2Color" onClick={() => setValue(Math.log2(value))}>Iog<sub>2</sub></button>    
          }
          <button className="gray1Color" onClick={() => handleButtonPress('4')}>4</button>            
          <button className="gray1Color" onClick={() => handleButtonPress('5')}>5</button>            
          <button className="gray1Color" onClick={() => handleButtonPress('6')}>6</button>            
          <button className="yellowColor" onClick={() => handleButtonPress('−')}>−</button>           
          </div>
          <div className="line">
          <button className="gray2Color">x!</button>        
          {
            second 
            ? <button className="gray2Color" onClick={() => setValue(Math.sin(value))}>sin</button>   
            : <button className="gray2Color" onClick={() => setValue((Math.asin(value) * ( 180 / Math.PI)))}>sin<sup>-1</sup></button> 
          }
          {
            second 
            ? <button className="gray2Color" onClick={() => setValue(Math.cos(value))}>cos</button>   
            : <button className="gray2Color" onClick={() => setValue((Math.acos(value) * ( 180 / Math.PI)))}>cos<sup>-1</sup></button> 
          }
          {
            second 
            ? <button className="gray2Color" onClick={() => setValue(Math.tan(value))}>tan</button>   
            : <button className="gray2Color" onClick={() => setValue((Math.atan(value) * ( 180 / Math.PI)))}>tan<sup>-1</sup></button> 
          }                  
          <button className="gray2Color" onClick={() => setValue(Math.E)}>e</button>                  
          <button className="gray2Color" onClick={() => handleButtonPress('EE')}>EE</button>          
          <button className="gray1Color" onClick={() => handleButtonPress('1')}>1</button>            
          <button className="gray1Color" onClick={() => handleButtonPress('2')}>2</button>            
          <button className="gray1Color" onClick={() => handleButtonPress('3')}>3</button>            
          <button className="yellowColor" onClick={() => handleButtonPress('+')}>+</button>           
          </div>

          <div className="line">
          <button className="gray2Color">Rad</button>
          {
            second 
            ? <button className="gray2Color" onClick={() => setValue(Math.sinh(value))}>sinh</button>   
            : <button className="gray2Color" onClick={() => setValue((Math.asinh(value)))}>sinh<sup>-1</sup></button>     
          }
          {
            second 
            ? <button className="gray2Color" onClick={() => setValue(Math.cosh(value))}>cosh</button>   
            : <button className="gray2Color" onClick={() => setValue((Math.acosh(value)))}>cosh<sup>-1</sup></button>     
          }
          {
            second 
            ? <button className="gray2Color" onClick={() => setValue(Math.tanh(value))}>tanh</button>   
            : <button className="gray2Color" onClick={() => setValue(Math.atanh(value))}>tanh<sup>-1</sup></button>     
          }     
          <button className="gray2Color" onClick={() => setValue(Math.PI)}>&pi;</button>              
          <button className="gray2Color" onClick={() => setValue(Math.random())}>Rand</button>        
          <button className="gray1Color zero" onClick={() => handleButtonPress('0')}>0</button>       
          <button className="gray1Color" onClick={() => handleButtonPress('.')}>.</button>            
          <button className="yellowColor" onClick={() => handleButtonPress('=')}>=</button>           
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
