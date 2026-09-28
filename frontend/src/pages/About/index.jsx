import { useState } from 'react'
import './styles.css'

function About() {
  const [primeiro, setPrimeiro] = useState('')
  const [segundo, setSegundo] = useState('')
  const [resultado, setResultado] = useState('')
  function calcular(operacao) { const a = Number(primeiro); const b = Number(segundo); const valores = { somar: a + b, subtrair: a - b, multiplicar: a * b, dividir: b === 0 ? 'Não é possível dividir por zero.' : a / b }; setResultado(valores[operacao]) }

  return <section className="page"><div className="page-title"><p className="eyebrow">Exemplo de aula</p><h1>Calculadora React</h1><p>Uma tela pequena para observar estados, eventos e funções.</p></div><div className="card calculator"><div className="calculator-fields"><label>Primeiro número<input type="number" value={primeiro} onChange={(event) => setPrimeiro(event.target.value)} /></label><label>Segundo número<input type="number" value={segundo} onChange={(event) => setSegundo(event.target.value)} /></label></div><div className="actions"><button className="button" onClick={() => calcular('somar')}>Somar</button><button className="button" onClick={() => calcular('subtrair')}>Subtrair</button><button className="button" onClick={() => calcular('multiplicar')}>Multiplicar</button><button className="button" onClick={() => calcular('dividir')}>Dividir</button></div><p className="result">Resultado: <strong>{resultado || 'ainda vazio'}</strong></p></div></section>
}

export default About
