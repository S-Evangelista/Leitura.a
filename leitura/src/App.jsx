import React, { useState, useEffect } from 'react';
import './App.css'

function ListaDeItens() {
  const [itens, setItens] = useState([]);
  const [textoDeEntrada, setTextoDeEntrada] = useState('');
  const [edicaoDetalhes, setEdicaoDetalhes] = useState({ indice: null });

  // Carregar dados salvos do localStorage ao iniciar
  useEffect(() => {
    const savedItens = JSON.parse(localStorage.getItem('itens'));
    if (savedItens) {
      setItens(savedItens);
    }
  }, []);

  const salvarDetalhesNoLocalStorage = (itensAtualizados) => {
    localStorage.setItem('itens', JSON.stringify(itensAtualizados));
  };

  const adicionarItem = () => {
    if (textoDeEntrada.trim() !== '') {
      const novoItem = {
        titulo: textoDeEntrada,
        status: '',
        resumo: '',
        autor: '',
        classificacao: 0,
      };
      setItens([...itens, novoItem]);
      setTextoDeEntrada('');
      salvarDetalhesNoLocalStorage([...itens, novoItem]);
    }
  };

  const alternarStatusParaLido = (indice) => {
    const itensAtualizados = [...itens];
    itensAtualizados[indice].status = '*';
    setItens(itensAtualizados);
    salvarDetalhesNoLocalStorage(itensAtualizados);
  };

  const alternarDetalhes = (indice) => {
    const itensAtualizados = [...itens];
    itensAtualizados[indice].detalhesVisiveis = !itensAtualizados[indice].detalhesVisiveis;
    setItens(itensAtualizados);
  };

  const iniciarEdicaoDetalhes = (indice) => {
    setEdicaoDetalhes({ indice });
  };

  const salvarEdicaoDetalhes = (indice) => {
    const itensAtualizados = [...itens];
    setEdicaoDetalhes({ indice: null });
    setItens(itensAtualizados);
    salvarDetalhesNoLocalStorage(itensAtualizados);
  };

  const fecharDetalhes = (indice) => {
    const itensAtualizados = [...itens];
    itensAtualizados[indice].detalhesVisiveis = false;
    setItens(itensAtualizados);
    setEdicaoDetalhes({ indice: null });
  };

  const excluirItem = (indice) => {
    const itensAtualizados = [...itens];
    itensAtualizados.splice(indice, 1);
    setItens(itensAtualizados);
    salvarDetalhesNoLocalStorage(itensAtualizados);
  };

  const limparItens = () => {
    setItens([]); // Limpa a lista de itens
    localStorage.removeItem('itens'); // Remove os itens do localStorage
  };

  // Contador para itens na lista
  const contadorItensNaLista = itens.length;

  // Contador para itens marcados como Lidos
  const contadorItensLidos = itens.filter((item) => item.status === 'Lido').length;

  return (
    <div>
      <h2 className='titulo1'>~ Acervo ~</h2>
      <div className='subtitulo'>
        <p className='titulos'>Títulos: {contadorItensNaLista}</p>
        <p className='titulos'>Lidos: {contadorItensLidos}</p>
      </div>
      <ul>
        {itens.map((item, indice) => (
          <li className='item' key={indice}>
            {item.titulo} - {item.status}
            {item.status === 'Para Ler' && (
              <button className='marcarLido' onClick={() => alternarStatusParaLido(indice)}>Marcar como Lido</button>
            )}
            
            <button className='marcarLido' onClick={() => alternarDetalhes(indice)}>Detalhes</button>
            <button className='marcarLido' onClick={() => excluirItem(indice)}>Excluir título</button>
            
            {item.detalhesVisiveis && (
              <div>
                {edicaoDetalhes.indice === indice ? (
                  <div>
                    <input 
                      type="text"
                      placeholder="Resumo"
                      value={item.resumo}
                      onChange={(e) => {
                        const itensAtualizados = [...itens];
                        itensAtualizados[indice].resumo = e.target.value;
                        setItens(itensAtualizados);
                      }}
                    />

                    <input
                      type="text"
                      placeholder="Autor"
                      value={item.autor}
                      onChange={(e) => {
                        const itensAtualizados = [...itens];
                        itensAtualizados[indice].autor = e.target.value;
                        setItens(itensAtualizados);
                      }}
                    />

                    <div className='classi'>
                      Classificação:
                      <select className='selcionar'
                        value={item.classificacao}
                        onChange={(e) => {
                          const itensAtualizados = [...itens];
                          itensAtualizados[indice].classificacao = parseInt(e.target.value);
                          setItens(itensAtualizados);
                        }}
                      >
                        <option className='selecione' value="0">Selecione</option>
                        <option value="1">⭐</option>
                        <option value="2">⭐⭐</option>
                        <option value="3">⭐⭐⭐</option>
                        <option value="4">⭐⭐⭐⭐</option>
                        <option value="5">⭐⭐⭐⭐⭐</option>
                      </select>
                    </div>
                    <button className='btSalvar' onClick={() => salvarEdicaoDetalhes(indice)}>Salvar</button>
                  </div>
                ) : (
                  <div className='txDetalhes'>
                    <p className='detalhe'>Resumo: {item.resumo}</p>
                    <p className='detalhe'>Autor: {item.autor}</p>
                    <p className='detalhe'>Classificação: {item.classificacao}</p>
                    <button className='marcarLido' onClick={() => iniciarEdicaoDetalhes(indice)}>Editar</button>
                    <button className='marcarLido' onClick={() => fecharDetalhes(indice)}>Ver menos</button>
                  </div>
                )}

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
        <button className='btAdicionar' onClick={adicionarItem}>Adicionar título</button>
        <button className='btAdicionar' onClick={limparItens}>Limpar acervo</button>
      </div>
    </div>
  );
}

export default ListaDeItens;
