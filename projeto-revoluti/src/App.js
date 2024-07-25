import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';
import api from './services/api';
import axios from 'axios';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});
  const [history, setHistory] = useState([]);

  async function handleSearch() {
    if (input === '') {
      alert('Preencha algum CEP!');
      return;
    }
  
    try {
      const response = await api.get(`${input}/json`);
      const cepData = response.data;
      // Verifique os dados recebidos
      console.log('Dados do CEP recebidos:', cepData);
  
      // Enviar dados para o backend NestJS
      const backendResponse = await axios.post('http://localhost:3000/cep/inserir', cepData);
  
      // Verifique a resposta do backend
      console.log('Resposta do backend:', backendResponse);
  
      setCep(cepData);
      setInput("");
      setHistory(prevHistory => [cepData, ...prevHistory]);
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      alert('Erro ao buscar CEP');
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Procurar Cep</h1>
      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite um Cep valido..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color='#000' />
        </button>
      </div>

      <div className="resultsContainer">
        <h2>Últimos resultados da pesquisa</h2>
        {Object.keys(cep).length > 0 ? (
          <main className='main'>
            <h2>CEP: {cep.cep}</h2>
            <span>Rua: {cep.logradouro}</span>
            <span>Complemento: {cep.complemento}</span>
            <span>Bairro: {cep.bairro}</span>
            <span>Cidade/Estado: {cep.localidade} - {cep.uf}</span>
          </main>
        ) : (
          <p>Nenhum resultado de pesquisa ainda.</p>
        )}
      </div>

      <div className="history">
        <h2>Histórico de busca</h2>
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              <span>{item.cep}</span> - {item.logradouro}, {item.localidade} - {item.uf}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;