import React from 'react';

import './footer.scss'

export class FooterComponent extends React.Component   // DOKUMENTACJA
{
    render()
    {
        return (
            <footer>
                <p className="poweredby">powered by</p>
                <a href="/" className="logo"></a>
                <div className="icons">
                    <a className="facebook" title="Facebook WiśniowaSU" href="https://facebook.wisniowasu.pl" target="_blank"></a>
                    <a className="instagram" title="Instagram WiśniowaSU" href="https://instagram.wisniowasu.pl" target="_blank"></a>
                    <a className="youtube" title="YouTube WiśniowaSU" href="https://youtube.wisniowasu.pl" target="_blank"></a>
                    <a className="discord" title="Discord WiśniowaSU" href="https://discord.wisniowasu.pl" target="_blank"></a>
                    <a className="status" title="Status usług WiśniowaSU" href="https://status.wisniowasu.pl" target="_blank"></a>
                </div>
                <p>Made by <a target="_blank" href="https://github.com/DvEyZ">Szymon Kwiręg</a> & <a href="https://github.com/resultfulness">Alicja Rosiak</a> | Source code on <a target="_blank" href="https://github.com/DvEyZ/homepage-wisniowasu">GitHub</a></p>
                <p>Ikony wykorzystane z <a target="_blank" rel="noopener" href="https://icons8.com">Icons8</a></p>
                <p>wersja 2.1.1</p>
            </footer>
        );
    }
};