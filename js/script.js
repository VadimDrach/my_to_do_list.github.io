const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const tasksList = document.getElementById('tasksList');

// Функция для добавления задачи
function addTask() {
	const taskText = taskInput.value.trim(); // Получаем и очищаем текст задачи
	if (taskText === '') return; // Если поле пустое, ничего не делаем

	const li = document.createElement('li'); // Создаем элемент списка
	li.className = 'task-item';

	const p = document.createElement('p'); // Создаем элемент p
	p.className = "task__p";
	p.textContent = taskText; // Добавляем текст задачи в p

	const editBtn = document.createElement('button');
	editBtn.className = "block__menu-btn1 fa-solid fa-file-pen";

	const deleteBtn = document.createElement('button');
	deleteBtn.className = 'block__menu-btn4 fa-solid fa-trash-can';

	// Добавляем элементы в li
	li.appendChild(p);
	li.appendChild(editBtn);
	li.appendChild(deleteBtn);
	tasksList.appendChild(li); // Добавляем li в tasksList

	// Очищаем input
	taskInput.value = '';

	// Обработчик для удаления задачи
	deleteBtn.addEventListener('click', function () {
		tasksList.removeChild(li); // Удаляем элемент списка
	});

	// Обработчик для редактирования задачи
	editBtn.addEventListener('click', function () {
		// Проверяем, есть ли в li элемент input (то есть, идет ли редактирование)
		const inputInLi = li.querySelector('input');

		if (inputInLi) {
			// Если input уже существует, то завершаем редактирование
			p.textContent = inputInLi.value.trim(); // Обновляем текст задачи
			li.replaceChild(p, inputInLi); // Заменяем input обратно на p
		} else {
			const currentText = p.textContent; // Текущий текст
			const input = document.createElement('input'); // Создаем input для редактирования
			input.className = 'edit__input';
			input.type = 'text';
			input.value = currentText; // Заполняем input текущим текстом

			li.replaceChild(input, p); // Заменяем p на input

			// Устанавливаем фокус на input и перемещаем курсор в конец текста
			input.focus();
			input.setSelectionRange(input.value.length, input.value.length);

			// Обработчик для завершения редактирования при нажатии Enter
			input.addEventListener('keydown', function (event) {
				if (event.key === 'Enter') {
					p.textContent = input.value.trim(); // Обновляем текст задачи
					li.replaceChild(p, input); // Заменяем input обратно на p
				}
			});
		}
	});


}

// Добавляем задачу при нажатии на кнопку
addTaskBtn.addEventListener('click', addTask);

// Добавляем задачу при нажатии на клавишу Enter в инпуте
taskInput.addEventListener('keydown', function (event) {
	if (event.key === 'Enter') {
		addTask();
	}
});
