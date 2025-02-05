import "./App.css";
import AddTransaction from "./components/AddTransaction";
import Balance from "./components/Balance";
import Header from "./components/Header";
import IncomeExpenses from "./components/IncomeExpenses";
import TransactionList from "./components/TransactionList";
import { GlobalProvider } from "./context/GlobalState";

function App() {
  return (
    <GlobalProvider>
      <Header />
      <div className="container">
        <div className="card">
          <Balance />
          <IncomeExpenses />
        </div>
        <div className="card">
          <TransactionList />
        </div>
        <div className="card">
          <AddTransaction />
        </div>
      </div>
    </GlobalProvider>
  );
}

export default App;
