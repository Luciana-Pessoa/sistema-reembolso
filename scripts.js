//seleciona os elementos do formulario.
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const caterory = document.getElementById("category");

// captura o evento de input no campo de valor e remove todos os caracteres que não são números.
amount.oninput = () => {
  let value = amount.value.replace(/\D/g, "");

  // atualiza o valor do input com os caracteres removidos.
  amount.value = formatCurrency(value);
};

function formatCurrency(value) {
  // formata o valor para o formato de moeda brasileira.
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value / 100);
}

//captura o evento de submit do formulario, para obter os valores dos campos e criar um novo objeto de despesa.
form.onsubmit = (event) => {
  //previne o comportamento padrão do formulario.
  event.preventDefault();

  //cria um novo objeto de despesa.
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    caterory_id: caterory.value,
    caterory_name: caterory.options[caterory.selectedIndex].text,
    amount: amount.value,
    created_at: new Date().toLocaleDateString("pt-BR"),
  };
};
