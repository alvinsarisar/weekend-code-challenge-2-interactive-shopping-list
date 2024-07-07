document.addEventListener('DOMContentLoaded', () => {
  // 1.Selecting  the input field, add button, list container  and clear button from the html file
  const itemInput = document.getElementById('itemInput');
  const addButton = document.getElementById('addButton');
  const shoppingList = document.getElementById('shoppingList');
  const clearButton = document.getElementById('clearButton');

  // 2.Retrieving the shopping list items from local storage by initializing  an empty array .
  let items = JSON.parse(localStorage.getItem('shoppingList')) || [];

  //3. Function to save the current list of items to local storage once the user enters the item
  const saveItems = () => {
    localStorage.setItem('shoppingList', JSON.stringify(items));
  };

  // 4.Function to render the list of items in the html file
  const renderItems = () => {
    // 5.Clearing  the current list of items
    shoppingList.innerHTML = '';

    // 6.Iterating over the items array and creating list elements for each item
    items.forEach((item, index) => {
      const li = document.createElement('li');
      li.textContent = item.text;

      //7. Adding or removing the 'purchased' class based on the item's purchased status
      li.classList.toggle('purchased', item.purchased);

      //8. Adding event listener to mark item as purchased on  one click
      li.addEventListener('click', () => {
        items[index].purchased = !items[index].purchased;
        saveItems();
        renderItems();
      });

      // 9.Adding event listener to edit item text on double click
      li.addEventListener('dblclick', () => {
        const newText = prompt('Edit item:', item.text);
        if (newText !== null) {
          items[index].text = newText;
          saveItems();
          renderItems();
        }
      });

      // 10.Appending the list item to the shopping list container
      shoppingList.appendChild(li);
    });
  };

  // 11.adding Event listener for the "Add" button to add a new item to the list
  addButton.addEventListener('click', () => {
    const itemText = itemInput.value.trim();
    if (itemText !== '') {
      items.push({ text: itemText, purchased: false });
      itemInput.value = ''; // Clears the input field
      saveItems(); // Saves the updated list to local storage
      renderItems(); // Re-renders the list in the html file
    }
  });

  // 12.Adding Event listener for the "Clear List" button to remove all items from the list
  clearButton.addEventListener('click', () => {
    items = []; // Clears the items array
    saveItems(); // Saves the empty list to local storage
    renderItems(); // Re-render the list in the Html file
  });

  // 13.Initial rendering of the list when the page loads
  renderItems();
});
