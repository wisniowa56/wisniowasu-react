import React from 'react';

class FooterComponent extends React.Component   // DOKUMENTACJA
{
    render()
    {
        return (
            <footer>
                <p class="poweredby">powered by</p>
                <a href="/" class="logo"></a>
                <div class="icons">
                    <a class="facebook" title="Facebook WiśniowaSU" href="https://facebook.wisniowasu.pl" target="_blank"></a>
                    <a class="instagram" title="Instagram WiśniowaSU" href="https://instagram.wisniowasu.pl" target="_blank"></a>
                    <a class="youtube" title="YouTube WiśniowaSU" href="https://youtube.wisniowasu.pl" target="_blank"></a>
                    <a class="discord" title="Discord WiśniowaSU" href="https://discord.wisniowasu.pl" target="_blank"></a>
                    <a class="status" title="Status usług WiśniowaSU" href="https://status.wisniowasu.pl" target="_blank"></a>
                </div>
                <p>Made by <a target="_blank" href="https://github.com/fastfend">Piotr Stadnicki</a> | Source code on <a target="_blank" href="https://github.com/fastfend/homepage-wisniowasu">GitHub</a></p>
                <p>Ikony wykorzystane z <a target="_blank" rel="noopener" href="https://icons8.com">Icons8</a></p>
                <p>wersja { this.props.version }</p>
            </footer>
        );
    }
};