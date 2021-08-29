'use strict';
{
  const token = document.querySelector('main').dataset.token;
  const input = document.querySelector('[name="title"]');

  input.focus();

  function addTodo(id) {
    // <li data-id="">
    //   <input type="checkbox">
    //     <span></span>
    //     <span class="delete">×</span>
    // </li>

    const li = document.createElement('li');
    li.dataset.id = id;
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const title = document.createElement('span');
    title.textContent = input.value;
    const deleteSpan = document.createElement('span');
    deleteSpan.textContent = 'X';
    deleteSpan.classList.add('delete');

    li.appendChild(checkbox);
    li.appendChild(title);
    li.appendChild(deleteSpan);

    const ul = document.querySelector('ul');
    ul.insertBefore(li, ul.firstChild);
  }

  document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();

    fetch('?action=add', {
      method: 'POST',
      body: new URLSearchParams({
        title: input.value,
        token: token,
      }),
    })
      .then(response => response.json())
      .then(json => {
        addTodo(json.id);
      });

    input.value = '';
    input.focus();
  });

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      fetch('?action=toggle', {
        method: 'POST',
        body: new URLSearchParams({
          id: checkbox.parentNode.dataset.id,
          token: token,
        }),
      });
    });
  });

  const deletes = document.querySelectorAll('.delete');
  deletes.forEach(span => {
    span.addEventListener('click', () => {
      if (!confirm('Are you sure?')) {
        return;
      }
      fetch('?action=delete', {
        method: 'POST',
        body: new URLSearchParams({
          id: span.parentNode.dataset.id,
          token: token,
        }),
      });
      span.parentNode.remove();
    });
  });

  const purge = document.querySelector('.purge');
  purge.addEventListener('click', () => {
    if (!confirm('Are you sure?')) {
      return;
    }
    fetch('?action=purge', {
      method: 'POST',
      body: new URLSearchParams({
        token: token,
      }),
    });

    const lis = document.querySelectorAll('li');
    lis.forEach(li => {
      if (li.children[0].checked) {
        li.remove()
      }
    });
  });
}
