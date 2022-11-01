import { useState } from "react";
import "./Expenses.css";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart" 

const  Expenses = (props)=> {
   const [filterYear, setFilterYear] = useState('2020')
   const filterChangeHandler = seclectiveYear =>{
      setFilterYear(seclectiveYear)
   }
   const filteredExpense = props.items.filter(expense=> expense.date.getFullYear().toString() === filterYear)
   return (
      <div>
         <Card className="expenses">
            <ExpensesFilter selected={filterYear} onChangeFilter = {filterChangeHandler}/>
            <ExpensesChart expenses = {filteredExpense}></ExpensesChart>
            <ExpensesList items ={filteredExpense}></ExpensesList>
         </Card>
      </div>
   );
}
export default Expenses;
