let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function renderizar() {
  let lista = document.getElementById("lista");
  lista.innerHTML = "";

  tarefas.forEach((tarefa, index) => {
    let li = document.createElement("li");
    li.classList.add(tarefa.prioridade);

    let span = document.createElement("span");
    span.textContent = tarefa.texto;

    if (tarefa.concluida) {
      span.classList.add("concluida");
    }

    span.onclick = function() {
      tarefas[index].concluida = !tarefas[index].concluida;
      salvarTarefas();
      renderizar();
    };

    // botão editar
    let editar = document.createElement("button");
    editar.textContent = "✏️";
    editar.classList.add("editar");

    editar.onclick = function() {
      let novoTexto = prompt("Editar tarefa:", tarefa.texto);
      if (novoTexto) {
        tarefas[index].texto = novoTexto;
        salvarTarefas();
        renderizar();
      }
    };

    // botão apagar
    let apagar = document.createElement("button");
    apagar.textContent = "🗑";
    apagar.classList.add("apagar");

    apagar.onclick = function() {
      tarefas.splice(index, 1);
      salvarTarefas();
      renderizar();
    };

    li.appendChild(span);
    li.appendChild(editar);
    li.appendChild(apagar);

    lista.appendChild(li);
  });
}

function adicionarTarefa() {
  let input = document.getElementById("tarefa");
  let prioridade = document.getElementById("prioridade").value;

  if (input.value === "") {
    alert("Digite uma tarefa!");
    return;
  }

  tarefas.push({
    texto: input.value,
    prioridade: prioridade,
    concluida: false
  });

  salvarTarefas();
  renderizar();

  input.value = "";
}

// carrega ao abrir
renderizar();