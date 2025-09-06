//todo Funções auxiliares
const isNonEmptyArray = (arrayElement) => {
  return Array.isArray(arrayElement) && arrayElement.length > 0;
};

//todo Função para criação de tabelas
export const createTable = (columnsArray, dataArray, tableId) => {
  if (
    !isNonEmptyArray(columnsArray) ||
    !isNonEmptyArray(dataArray) ||
    !tableId
  ) {
    throw new Error(
      "Para a correta execução, precivamso de um array com as colunas, outro com as imformações das linhas "
    );
  }

  const tableElemente = document.getElementById(tableId);
  if (!tableElemente || tableElemente.nodeName !== "TABLE") {
    throw new Error("Id informado não corresponde a nemhum elemento 'table'");
  }

  createTableHeader(tableElemente, columnsArray);
  createTableBody(tableElemente, dataArray, columnsArray);
};

//todo Função para criação do cabeçalho da tabela
function createTableHeader(tableReference, columnsArray) {
  //todo função interna dque cria um cabeçalho na tabela
  function createTheadElement(tableReference) {
    const thead = document.createElement("thead");
    tableReference.appendChild(thead);
    return thead;
  }
  //* Verifica se existe um cabeçalho, caso nao exista cria o cabeçalho na tabela
  const tableHearderReference =
    tableReference.querySelector("thead") ?? createTheadElement(tableReference);

  const headerRow = document.createElement("tr");

  for (const tableColumnusObject of columnsArray) {
    const headerElement = /*html*/ `<th class="text-center">${tableColumnusObject.columnsLabel}</th>`;
    headerRow.innerHTML += headerElement;
  }
  tableHearderReference.appendChild(headerRow);
}

//todo Função para criação do corpo da tabela
function formatCurrency(value) {
  return value.toFixed(2);
}

function createTableBody(tableReference, tableItens, columnsArray) {
  //todo função interna dque cria um corpo na tabela
  function createTbodyElement(tableReference) {
    const tbody = document.createElement("tbody");
    tableReference.appendChild(tbody);
    return tbody;
  }
  //* Verifica se existe um corpo, caso nao exista cria o corpo na tabela
  const tableBodyReference =
    tableReference.querySelector("tbody") ?? createTbodyElement(tableReference);

  for (const [itensIndex, tableItem] of tableItens.entries()) {
    const tableRow = document.createElement("tr");

    for (const tableColumn of columnsArray) {
      tableRow.innerHTML += /*html*/ `<td class="text-center">${formatCurrency(
        tableItem[tableColumn.accessor]
      )}</td>`;
    }
    tableBodyReference.appendChild(tableRow);
  }
}
