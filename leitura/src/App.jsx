import React, { useState } from 'react';

function ListaDeItens() {
  const [itens, setItens] = useState([]);
  const [textoDeEntrada, setTextoDeEntrada] = useState('');
  const [indiceItemSelecionado, setIndiceItemSelecionado] = useState(null);
  const [resumo, setResumo] = useState('');
  const [autor, setAutor] = useState('');
  const [classificacao, setClassificacao] = useState(0);

  const adicionarItem = () => {
    if (textoDeEntrada.trim() !== '') {
      setItens([...itens, { titulo: textoDeEntrada, status: 'Para Ler' }]);
      setTextoDeEntrada('');
    }
  };

  const alternarStatus = (indice) => {
    const itensAtualizados = [...itens];
    const statusAtual = itensAtualizados[indice].status;
    if (statusAtual === 'Para Ler') {
      itensAtualizados[indice].status = 'Lendo';
    } else if (statusAtual === 'Lendo') {
      itensAtualizados[indice].status = 'Lido';
    } else {
      itensAtualizados[indice].status = 'Para Ler';
    }
    setItens(itensAtualizados);
  };

  const lidarComCliqueNoItem = (indice) => {
    setIndiceItemSelecionado(indice);
  };

  const salvarDetalhesDoItem = () => {
    if (indiceItemSelecionado !== null) {
      const itensAtualizados = [...itens];
      itensAtualizados[indiceItemSelecionado].resumo = resumo;
      itensAtualizados[indiceItemSelecionado].autor = autor;
      itensAtualizados[indiceItemSelecionado].classificacao = classificacao;
      setItens(itensAtualizados);
      setIndiceItemSelecionado(null);
      setResumo('');
      setAutor('');
      setClassificacao(0);
    }
  };

  return (
    <div>
      <h2>Lista de Itens</h2>
      <ul>
        {itens.map((item, indice) => (
          <li key={indice} onClick={() => lidarComCliqueNoItem(indice)}>
            {item.titulo} - {item.status}
            {indiceItemSelecionado === indice && (
              <div>
                <input
                  type="text"
                  placeholder="Resumo"
                  value={resumo}
                  onChange={(e) => setResumo(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Autor"
                  value={autor}
                  onChange={(e) => setAutor(e.target.value)}
                />
                <div>
                  Classificação:
                  <select value={classificacao} onChange={(e) => setClassificacao(e.target.value)}>
                    <option value="0">Selecione a nota</option>
                    <option value="1">1 estrela</option>
                    <option value="2">2 estrelas</option>
                    <option value="3">3 estrelas</option>
                    <option value="4">4 estrelas</option>
                    <option value="5">5 estrelas</option>
                  </select>
                </div>
                <button onClick={salvarDetalhesDoItem}>Salvar Detalhes</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={textoDeEntrada}
          onChange={(e) => setTextoDeEntrada(e.target.value)}
        />
        <button onClick={adicionarItem}>Adicionar Item</button>
      </div>
    </div>
  );
}

export default ListaDeItens;