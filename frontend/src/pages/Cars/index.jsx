import { useEffect, useState } from 'react'
import { api } from '../../api/client'
import './styles.css'

const vazio = { marca: '', ano: '' }

function Cars() {
  const [carros, setCarros] = useState([])
  const [form, setForm] = useState(vazio)
  const [editando, setEditando] = useState(null)
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  async function carregar() {
    try { const resposta = await api.listarCarros(); setCarros(resposta.mensagem || []) } catch (error) { setErro(error.message) }
  }
  useEffect(() => {
    api.listarCarros().then((resposta) => setCarros(resposta.mensagem || [])).catch((error) => setErro(error.message))
  }, [])
  function mudarCampo(event) { setForm({ ...form, [event.target.name]: event.target.value }) }
  async function salvar(event) {
    event.preventDefault(); setErro(''); setMensagem('')
    try {
      const dados = { marca: form.marca, ano: Number(form.ano) }
      if (editando) await api.alterarCarro(editando.id, dados); else await api.criarCarro(dados)
      setMensagem(editando ? 'Carro atualizado.' : 'Carro cadastrado.'); setForm(vazio); setEditando(null); carregar()
    } catch (error) { setErro(error.message) }
  }
  async function excluir(id) {
    if (!window.confirm('Excluir este carro?')) return
    try { await api.deletarCarro(id); setMensagem('Carro excluído.'); carregar() } catch (error) { setErro(error.message) }
  }
  function editar(carro) { setEditando(carro); setForm({ marca: carro.marca, ano: carro.ano }) }

  return <section className="page"><div className="page-title"><p className="eyebrow">CRUD de carros</p><h1>Carros</h1><p>Esta tela demonstra formulário, lista e ações da API.</p></div>{erro && <p className="alert alert-error">{erro}</p>}{mensagem && <p className="alert alert-success">{mensagem}</p>}<div className="cars-layout"><form className="card form" onSubmit={salvar}><h2>{editando ? 'Editar carro' : 'Cadastrar carro'}</h2><label>Marca<input name="marca" value={form.marca} onChange={mudarCampo} required /></label><label>Ano<input name="ano" type="number" min="1900" max="2100" value={form.ano} onChange={mudarCampo} required /></label><div className="actions"><button className="button button-primary">{editando ? 'Salvar' : 'Cadastrar'}</button>{editando && <button type="button" className="button" onClick={() => { setEditando(null); setForm(vazio) }}>Cancelar</button>}</div></form><section className="card"><h2>Lista ({carros.length})</h2>{carros.length === 0 ? <p className="muted">Nenhum carro cadastrado.</p> : <div className="car-list">{carros.map((carro) => <article className="car-item" key={carro.id}><div><strong>{carro.marca}</strong><span>Ano {carro.ano}</span></div><div className="actions"><button className="button" onClick={() => editar(carro)}>Editar</button><button className="button button-danger" onClick={() => excluir(carro.id)}>Excluir</button></div></article>)}</div>}</section></div></section>
}

export default Cars
