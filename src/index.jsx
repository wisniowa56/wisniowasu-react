import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './main.scss'
import './slide.css'
import { FooterComponent } from './components/reusables/FooterComponent/FooterComponent';
import { MenuComponent } from './components/reusables/MenuComponent/MenuComponent';

import { ContactComponent } from './components/layouts/ContactComponent/ContactComponent';
import { ForStudentComponent } from './components/layouts/ForStudentComponent/ForStudentComponent'
import { HomeComponent } from './components/layouts/HomeComponent/HomeComponent';
import { ProjectsComponent } from './components/layouts/ProjectsComponent/ProjectsComponent';
import { TeamComponent } from './components/layouts/TeamComponent/TeamComponent';
import { WiFIComponent } from './components/layouts/WiFIComponent/WiFIComponent';
import { DocumentsComponent } from './components/layouts/DocumentsComponent/DocumentsComponent';

export const title = 'Wiśniowa SU - Samorząd Uczniowski'

const App = () =>
{
    return (
        <div id="app">
            <MenuComponent active={useLocation().pathname.split('/')[1]} />
            <Routes>
                <Route path="/" element={<HomeComponent/>}/>
                <Route path="/team/*" element={<TeamComponent/>}/>
                <Route path="/forstudent" element={<ForStudentComponent/>}/>
                <Route path="/projects" element={<ProjectsComponent/>}/>
                <Route path="/wifi/*" element={<WiFIComponent/>}/>
                <Route path="/documents/*" element={<DocumentsComponent/>}/>
                <Route path="/contact" element={<ContactComponent/>}/>
            </Routes>
            <FooterComponent/>
        </div>
    );
}

export default App;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>
);

window.addEventListener('scroll', () => {
    var scrollPosition = document.scrollingElement.scrollTop;
    var body = document.body;
  
    if (scrollPosition > 170) {
        body.classList.add('nav-bg');
    } 
    else {
        if (body.classList.contains('nav-bg')) {
            body.classList.remove('nav-bg');
        }
    }
})

document.title = title