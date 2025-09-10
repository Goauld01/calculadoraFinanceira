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
  //todo Lista de classes para adcionar a tabela
  ["bg-blue-900", "text-slate-200", "sticky", "top-0"].forEach((cssClass) =>
    headerRow.classList.add(cssClass)
  );

  for (const tableColumnusObject of columnsArray) {
    const headerElement = /*html*/ `<th class="text-center">${tableColumnusObject.columnsLabel}</th>`;
    headerRow.innerHTML += headerElement;
  }
  tableHearderReference.appendChild(headerRow);
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

    if (itensIndex % 2 != 0) {
      tableRow.classList.add("bg-blue-200");
    }
    for (const tableColumn of columnsArray) {
      //todo Função para formatar os campos
      const formatFn = tableColumn.format ?? ((info) => info);
      tableRow.innerHTML += /*html*/ `<td class="text-center">${formatFn(
        tableItem[tableColumn.accessor]
      )}</td>`;
    }
    tableBodyReference.appendChild(tableRow);
  }
}
