import { useState } from 'react'
import './styles.css'

function About() {
    const [ num1, setNum1 ] = useState()
    const [ num2, setNum2 ] = useState()
    const [ resultado, setResultado ] = useState("AQUI VEM O RESULTADO")

    function somar() {
        setResultado(Number(num1) + Number(num2))
    }
    function sub() {
        setResultado(Number(num1) - Number(num2))
    }
    function mult() {
        setResultado(Number(num1) * Number(num2))
    }
    function div() {
        setResultado(Number(num1) / Number(num2))
    }

    return (
        <>
            <label>Digite um número</label>
            <input
                type="text"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
            />
            
            <label>Digite outro número</label>
            <input
                type="text" 
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
            />

            <button onClick={somar} >Somar</button>
            <button onClick={sub}>Subtrair</button>
            <button onClick={mult}>Multiplicar</button>
            <button onClick={div}>Dividir</button>

            {/* preciso usar a chave */}
            <p>{ resultado }</p>
        </>
    )
}

export default About