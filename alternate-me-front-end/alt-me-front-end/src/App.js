import React, 
{useEffect, 
  useState, 
  useRef,
  Suspense
} from 'react'; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GoogleTrends from './routes/GoogleTrends'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Navigation from './components/Navigation';
import Airdrops from './routes/Airdrops'; 
import NFT from './routes/NFT'; 

const Dashboard = React.lazy(() => import('./routes/Dashboard'))

function App() {
  
  
  return (
    <>
      <Router>
      <Navigation/> 
      <Suspense fallback={
        <div>
          <p>Loading...</p>
        </div>
      }>
      <Routes>
        <Route path="/" element={<Dashboard
        />}/>
        <Route path="/airdrop" element={<Airdrops/>}/>
        <Route path="/nft" element={<NFT/>}/>
        <Route path="/googletrends" element={<GoogleTrends/>}/>
        </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
