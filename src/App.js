import { Route ,Routes } from 'react-router-dom';
import './App.css';
import { Header, MainContainer, CreateContainer } from './component';
import HomeComponent from './component/HomeComponent';
import Menu from './component/Menu';
import AboutComponent from './component/AboutComponent';
import ServicesComponent from './component/ServicesComponent';
// import {HomeComponent} from './component/HomeComponent'


function App() {
  return (
    <div className="w-screen h-auto flex flex-col bg-purple-50">
      <Header/>
      <main className="mt-16 md:mt-24 p-8 w-full">
          <Routes>
            <Route path="/*" element={<MainContainer/> } />
            <Route path="/CreateIteam" element={<CreateContainer/> } />
            <Route path="/Home" element={<HomeComponent/> } />
            <Route path="/Menu" element={<Menu/> } />
            <Route path="/About" element={<AboutComponent/> } />
            <Route path="/Services" element={<ServicesComponent/> } />
            

          </Routes>
        </main>
    </div>
  );
}

export default App;
