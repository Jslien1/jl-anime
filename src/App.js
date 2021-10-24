import Nav from "./components/Nav";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from "./pages/Home";
import AnimeInfo from "./pages/AnimeInfo";
import Discovery from "./pages/Discovery";
import Footer from "./components/Footer";
import Search from "./pages/Search";


function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Route path="/" exact component={Home} />
        <Route path="/info/:id/:genre?" render={() => <AnimeInfo />} />
        <Route path="/discovery" render={() => <Discovery />} />
        <Route path="/search" render={() => <Search />} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
