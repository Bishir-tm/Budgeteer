class UI {
    constructor(){
        this.totalBudgetFeedBack = document.getElementById('totalBudgetFeedBack');
        this.totalExpenseFeedBack = document.getElementById('totalExpenseFeedBack');
        this.totalBalanceFeedBack = document.getElementById('totalBalanceFeedBack');
        
        this.budgetInputField = document.getElementById('budgetInputField');
        this.expenseItemField = document.getElementById('expenseItemField');
        this.expenseAmountField = document.getElementById('expenseAmountField');
        
        this.expenseTable = document.getElementById('expenseTable')
        this.expenseItems = document.getElementById('expenseItems')

        // this.budgetInputButton = document.getElementById('budgetInputButton');
        // this.expenseInputButton = document.getElementById('expenseInputButton');
        
        this.expenseItem = document.getElementById('expenseItem');
        this.expenseItemAmount = document.getElementById('expenseItemAmount');

        this.budgetErrorMsg = document.getElementById('budgetErrorMsg');
        this.expenseErrorMsg = document.getElementById('expenseErrorMsg');
        this.itemsList = [];  
        this.itemId = 1;
            
    }
  
    submitBudgetForm(){
        const value = Number(this.budgetInputField.value);
        if (value === '') {
            this.budgetErrorMsg.classList.remove('d-none');
            this.budgetErrorMsg.innerHTML = '<p>Budget Value cannot be empty</p>';
            setTimeout(function(){this.budgetErrorMsg.classList.add('d-none');}, 3000);
            
        } else if(value < 1 ){
            this.budgetErrorMsg.classList.remove('d-none');
            this.budgetErrorMsg.innerHTML = '<p>Budget value must be a positive number </p>';
            setTimeout(function(){this.budgetErrorMsg.classList.add('d-none')}, 3000);
        } else {
            this.totalBudgetFeedBack.textContent = value ;
            this.budgetInputField.value = "";
            this.showBalance(); 
        }    
    }
    
    submitExpenseForm(){
        const item = this.expenseItemField.value;
        const amount = this.expenseAmountField.value; 
        if (item === '' || amount === '') {
            this.expenseErrorMsg.classList.remove('d-none');
            this.expenseErrorMsg.innerHTML = '<p>Please fill in all the values first!</p>';
            setTimeout(function(){this.expenseErrorMsg.classList.add('d-none');}, 3000);
            
        } else if(amount < 0){
            this.expenseErrorMsg.classList.remove('d-none');
            this.expenseErrorMsg.innerHTML = '<p>Expense amount must be a positive number </p>';
            setTimeout(function(){this.expenseErrorMsg.classList.add('d-none')}, 3000);
        } else {
            let value = Number(amount) ;
            this.expenseItemField.value = "";
            this.expenseAmountField.value = "";
            // this.showBalance(); 

            let expense = {
                id:this.itemId,
                title:item,
                value:value
            };
            
            this.itemId++;
            this.itemsList.push(expense);
            this.addExpense(expense);  
            this.showBalance(); 

        }    
    }    
    // Adds expense to list
    addExpense(expense){
         const tr = document.createElement('tr');
         tr.innerHTML = `
                         <td>
                            
                         </td>
                         <td>
                            - ${expense.title}
                         </td>
                         <td>
                            ${expense.value}
                         </td>
                         <td>
                            <a href="" class="editBtn me-3" data-id="${expense.id}" >
                                <img src="./assets/pen.svg" >
                            </a> 
                            <a href="" class="deleteBtn" data-id="${expense.id}">
                                <img src="./assets/trash.svg" alt="">
                            </a>
                        </td>`;

                        this.expenseItems.appendChild(tr);
                    }
                    
    totalExpense(){
        let total  = 0;
        if (this.itemsList.length > 0) {
            total = this.itemsList.reduce((totalVal,curr) => {
                totalVal +=curr.value; 
                return totalVal;
            }, 0)
        } 
        this.totalExpenseFeedBack.textContent = total
        return total;
    }
    
    
    showBalance(){
        const expense = this.totalExpense() ;
        const total = Number(this.totalBudgetFeedBack.textContent) - expense;
        this.totalBalanceFeedBack.textContent = total;

        if (total < 0) {
            this.totalBalanceFeedBack.classList.remove('text-secondary', 'text-success')
            this.totalBalanceFeedBack.classList.add('text-danger')
        } else if (total === 0) {
            this.totalBalanceFeedBack.classList.remove('text-danger', 'text-success')
            this.totalBalanceFeedBack.classList.add('text-secondary')
        } else {
            this.totalBalanceFeedBack.classList.remove('text-secondary', 'text-danger')
            this.totalBalanceFeedBack.classList.add('text-success')
        }

    }
    
    editExpenseItem(btn){ 
        let id = parseInt(btn.dataset.id) ;
        let item = btn.parentElement.parentElement;
        // remove item from list
        this.expenseItems.removeChild(item);
        
        let expense = this.itemsList.filter(function(item) {
            
            return item.id === id;
        }); 

        this.expenseItemField.value = expense[0].title;
        this.expenseAmountField.value = expense[0].value;
             
        
        let templist = this.itemsList.filter(function(item) {
            return item.id !==id;
        })
        this.itemsList = templist;
        this.showBalance();
    }
    
    deleteExpenseItem(btn){
        let id = parseInt(btn.dataset.id) ;
        let item = btn.parentElement.parentElement;

        // remove item from list
        this.expenseItems.removeChild(item);
             
        let templist = this.itemsList.filter(function(item) {
            return item.id !==id;
        })
        this.itemsList = templist;
        this.showBalance();
    }
    
    
}

function eventListeners() {
    const budgetForm = document.getElementById('budgetForm');
    const expenseForm = document.getElementById('expenseForm');
    
    const ui = new UI();
    
    // budget form submit 
    budgetForm.addEventListener('submit', function (event){
        event.preventDefault();
        ui.submitBudgetForm();
    });

    // expense form submit 
    expenseForm.addEventListener('submit', (event) => {
        event.preventDefault();
        ui.submitExpenseForm();
    });

    // when click expense list edit or delete icon
    expenseTable.addEventListener('click', (event) => {
        event.preventDefault();
        clickedBtn = event.target.parentElement;
        if (clickedBtn.classList.contains('editBtn')) {
            ui.editExpenseItem(clickedBtn)

        } else if(clickedBtn.classList.contains('deleteBtn')){
            ui.deleteExpenseItem(clickedBtn)
        }
    } )

}

document.addEventListener('DOMContentLoaded', function(){
    eventListeners();
})