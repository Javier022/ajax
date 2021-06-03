// control Dom

import { To_do } from "./to-do.js";

// constants
const template_todos = document.getElementById("template-to-dos").content,
  ul = document.getElementById("to-dos"),
  form = document.getElementById("mainForm"),
  fragment = new DocumentFragment();

window.addEventListener("load", (e) => {
  e.preventDefault();
  To_do.all().then((to_dos) => paintAllList(to_dos));
});

const paintAllList = (to_dos) => {
  let todoToEdit = null;

  to_dos.map((todo) => {
    todoToEdit = todo;

    template_todos.querySelector("h1").textContent = todo.title;
    template_todos.querySelector("button").textContent = "x";

    const clone = template_todos.cloneNode(true);

    fragment.prepend(clone);

    // template_todos.querySelector("h1").add(editInPlace(ul));
  });

  ul.prepend(fragment);

  ul.addEventListener("click", (e) => {
    const target = e.target;
    const h1 = Array.from(ul.querySelectorAll("h1"));
    const node = h1.indexOf(target);

    if (node !== -1) {
      editInPlace(h1[node], todoToEdit);
    }

    if (e.target.classList.contains("close")) {
      deleteToDo(e, todoToEdit);
    }

    e.stopPropagation();
  });
};

const editInPlace = (node, todo) => {
  node.addEventListener("click", (e) => {
    // console.log(e.target);

    // remplazar el nodo por un input de texto
    let input = document.createElement("textarea");
    input.value = node.textContent;
    input.autofocus = true;

    node.replaceWith(input);

    // al finalizar la edicion: reemplazar el nodo por un nodo
    input.addEventListener("change", (e) => {
      input.replaceWith(node);
      // el elemento donde se origino el evento, en este caso el evento
      todo.title = e.target.value;

      node.innerHTML = todo.title;

      todo.save().then((res) => {
        console.log(res);
      });
    });

    e.stopPropagation();
  });
};

const deleteToDo = (e, todo) => {
  todo.destroy();

  //second method
  const target = e.target;
  const buttons = Array.from(ul.querySelectorAll("button"));
  const li = Array.from(ul.querySelectorAll("li"));
  const i = buttons.indexOf(target);

  if (i == -1) {
    return;
  }

  console.log(i);
  console.log(li);
  li[i].remove();
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // [type=submit ] par que cuando se envie el formulario se desabilite el boton
  const button = form.querySelector("[type='submit']");
  button.disabled = true;

  const textArea = form.querySelector("textarea");

  let todo = new To_do({
    title: textArea.value,
  });

  todo.save().then(() => {
    textArea.value = "";
    button.disabled = false;

    paintAllList([{ ...todo }]);
  });

  return false;
  // return false than do not send form
});
