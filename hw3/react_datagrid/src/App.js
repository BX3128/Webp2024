import './App.css';
import DataGridComp from './datagrid';
import Header from './header';
function App() {
  return (
    <div className="App">
      <header id="heading">
        <Header />
      </header>
      <DataGridComp />
    </div>
  );
}

export default App;
