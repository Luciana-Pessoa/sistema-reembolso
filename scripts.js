//seleciona os elementos do formulario.
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const caterory = document.getElementById("category");

//seleciona os elementos do formulario da lista
const expenseList = document.querySelector("ul");
const expensesQuantity = document.querySelector("aside header p span");
const expensesTotal = document.querySelector("aside header h2");

// captura o evento de input no campo de valor e remove todos os caracteres que não são números.
amount.oninput = () => {


  let value = amount.value.replace(/\D/g, "");

  value = Number(value) / 100;

  // atualiza o valor do input com os caracteres removidos.
  amount.value = formatCurrency(value);
};

function formatCurrency(value) {

value = value.toLocaleString("pt-BR", {
  style: "currency",
  currency: "BRL",
})

return value;
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
    created_at: new Date(),

  };



  //chama a função para adicionar a nova despesa.
  expenseAdd(newExpense);
};

//função para adicionar uma nova despesa.
function expenseAdd(newExpense) {
  try {

    //cria o elemento para adicionar na lista de despesas.
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    // cria ícone da categoria da despesa.
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.caterory_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.caterory_name);

    //cria a info da despesa.
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    //cria o nome da despesa.
    const expenseName = document.createElement("strong");
    expenseName.textContent= newExpense.expense;

    //cria a categoria da despesa.
    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.caterory_name;

    //adiciona nome e categoria na div das informacoes da despesa.
    expenseInfo.append(expenseName, expenseCategory);

//cria o valor da despesa.
const expenseAmount = document.createElement("span");
expenseAmount.classList.add("expense-amount");
expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
.toUpperCase()
.replace("R$", "")}`;

//cria o icone de excluir despesa.
    const removeIcon = document.createElement("img");
    removeIcon.classList.add("remove-icon");
    removeIcon.setAttribute("src", "img/remove.svg");
    removeIcon.setAttribute("alt", "Remover");

   //adiciona as informacoes no item
   expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);

   //adiciona o item la lista de despesas
   expenseList.append(expenseItem);

   //limpa os campos do formulario
   formeCLear();
   updateTotals();

  } catch (error) {
    alert("Nao foi possivel atualizar a lista de despesas");
    console.log(error);
  }
}

function updateTotals(){

  try {
  //recupera todos os itens da lista de despesas.
    const items = expenseList.children


    //Atualiza a quantidade de despesas.
    expensesQuantity.textContent = `${items.length} ${
    items.length > 1 ? "despesas" : "despesa"
    }`
    //variavel para incrementar o total de despesas.
   let total = 0;

   //percorre cada item da lista de despesas.
   for(let item = 0; item < items.length; item++){ 
    const itemAmount = items[item].querySelector(".expense-amount")
  
   //remover caracteres nao numerocos e converter para numero.
      let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".");

//convertendo o valor para float.
    value = parseFloat(value);
   
   
    if(isNaN(value)){
     return alert("Nao foi possivel atualizar os totais, o valor nao parece ser um numero");

   }

   total += Number(value);
  }

  const symbolBRL = document.createElement("small");
  symbolBRL.textContent = "R$"

  total = formatCurrency(total).toUpperCase().replace("R$", "");

  expensesTotal.innerHTML = ""
  expensesTotal.append(symbolBRL, total);


  } catch (error) {
 
    
    alert("Nao foi possivel atualizar os totais");
  }
}

//captura o evento de click na lista de despesas.
expenseList.onclick = (event) => {
  //verifica se o elemento clicado é o icone de excluir despesa.
  if (event.target.classList.contains("remove-icon")) {
    //remove o item da lista de despesas.
    event.target.parentElement.remove();
    updateTotals();
  }
};

//função para limpar os campos do formulario.
function formeCLear(){
  expense.value = "";
  amount.value = "";
  caterory.value = "";
 
  //foco no campo de despesa.
  expense.focus();
}