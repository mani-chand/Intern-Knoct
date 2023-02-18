import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Index from './Pages/Index.js'
import Details from './Pages/Details.js'
export default function Home() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/details" element = {<Details/>}/>
          <Route path="/" element= {<Index/>}/>
        </Routes>
    </Router>
    </div>
  );
}
