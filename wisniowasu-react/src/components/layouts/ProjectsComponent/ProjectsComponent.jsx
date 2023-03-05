import React from 'react';
import scrollreveal from 'scrollreveal';
import { ProjectsTimelineCardComponent } from './ProjectsTimelineCardComponent'

import './projects.scss'

export class ProjectsComponent extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            cards: [
                <ProjectsTimelineCardComponent
                    key={1}
                    date="listopad 2020"
                    img="../../../img/projects/wisniowa_cup_2020.jpg"
                    title="Wiśniowa Cup"
                    text="Jako samorząd postanowiliśmy zorganizować coś, co pomoże zająć czas nam, uczniom, w czasach
                    pandemii, w przyjemny sposób zająć sobie wolny czas, a przy okazji pomoże nam się zintegrować. Tak
                    narodził się pomysł WiśniowaCup, czyli turnieju w najpopularniejsze gry, który odbył się na kilka
                    tygodni przed świętami. Uczniowie mogli zmierzyć się w potyczkach w gry takie jak League of Legends,
                    Counter-Strike czy Valorant, które są obecnie wiodącymi grami e-sportowymi. Turniej został
                    przeprowadzony w pełni profesjonalnie, a niektóre z rozgrywek transmitowane były na żywo. W
                    przyszłości planujemy powtórzenie projektu, a być może nawet rozszerzenie go na turniej
                    międzyszkolny. Będziemy starać się popularyzować e-sport i promować go jako obiecującą drogę na
                    przyszłość.."
                />,
                <ProjectsTimelineCardComponent
                    key={2}
                    date="październik - grudzień 2020"
                    img="../../../img/projects/konkurs_artystycznej_2020.jpg"
                    title="Konkurs artystyczny"
                    text="Podczas pandemii, w ramach motywacji dla najkreatywniejszych uczniów, sekcja artystyczna
                    zorganizowała wewnątrzszkolny konkurs. Poprzez uczniowskie glosowanie, zostały wybrane najlepsze
                    prace w kategoriach: muzyka, poezja oraz rysunek. Nagrody zostały sfinansowane dzięki publicznej
                    zrzutce, na którą wpłacali przedstawiciele fundacji EFC, rodzice uczniów oraz każdy, kto chciał
                    okazać wsparcie dla artystów z Wiśniowej."
                />,
                <ProjectsTimelineCardComponent
                    key={3}
                    date="9 styczeń 2020"
                    img="../../../img/projects/webpage.jpg?size=660"
                    title="Strona główna SU"
                    text="Po raz pierwszy od 5 lat strona została wykonana od podstaw z myślą o tym czego tak naprawdę
                    potrzebuje społeczność szkolna. Uruchomienie strony było również początkiem standaryzacji nowego
                    designu Wiśniowa SU. W gruncie rzeczy jest to efekt kompletnej przebudowy samorządu. Stronę jak i
                    odbudowę SU pod względem IT zawdzięczamy ówczesnemu przewodniczącemu sekcji technicznej, Piotrowi
                    Stadnickiemu."
                />,
                <ProjectsTimelineCardComponent
                    key={4}
                    date="grudzień 2019"
                    img="../../../img/projects/szlachetna_paczka.jpg?size=660"
                    title="Szlachetna Paczka"
                    text="W tym roku po raz kolejny nasi uczniowie zbierali produkty na szlachetną paczkę aby wesprzeć jedną z
                    potrzebujących rodzin. Udało nam się zebrać prawie wszystkie produkty z listy."
                />,
                <ProjectsTimelineCardComponent
                    key={5}
                    date="grudzień 2019"
                    img="../../../img/projects/statut.jpg?size=660"
                    title="Statut szkoły"
                    text="W tym okresie razem z dyrekcją pracowaliśmy nad uchwaleniem nowego, skróconego i uproszczonego
                    statutu szkoły. Dodatkowo udało nam się zapisać tam dodatkowe prawa dla uczniów, jak na przykład
                    możliwość korzystania z urządzeń elektronicznych na lekcji w celach dydaktycznych."
                />,
                <ProjectsTimelineCardComponent
                    key={6}
                    date="13 grudnia 2019"
                    img="../../../img/projects/stanwojenny_2019.jpg?size=660"
                    title="Stan wojenny"
                    text="W naszej szkole, ku pamięci i edukacji, organizujemy obchody Rocznicy Wprowadzenia Stanu Wojennego.
                    W tym dniu można
                    spotkać na wejściu legitymujących milicjantów, roznoszących ulotki konspiratorów, a także być
                    świadkami zatrzymań i
                    &quot;pobić&quot;. Wszystko to dzieje się po to, żeby wzbudzić w nas świadomość, że dzisiejszą Polskę
                    zawdzięczamy nie tylko
                    działaniami podczas wojen, ale także tym, którzy walczyli z komunistyczną władzą."
                />,
                <ProjectsTimelineCardComponent
                    key={7}
                    date="9 grudnia 2019"
                    img="../../../img/projects/feedback2.jpg?size=660"
                    title="System feedbacku"
                    text="Do usług które oferujemy dla uczniów szkoły dołączył system feedbacku, na którym mogą dzielić się
                    swoimi opiniami na temat szkoły, czy zgłaszać problemy oraz głosować na to które kwestie powinny
                    zostać poruszone w pierwszej kolejności."
                />
            ],
            loaded: true
        }
    }

    componentDidMount()
    {
        scrollreveal().reveal(this.cards.childNodes, {
            easing: 'ease-in-out',
            distance: '20px',
          });
    }

    render()
    {
        if(this.state.loaded) return (
            <div className="projects">
                <div className="title_box">
                    <h1 className="title_box_text">PROJEKTY</h1>
                </div>
                <div className="pageblock_timeline">
                    <div id="timeline_line"></div>
                    <div id="timeline_container">
                        <div className="timeline_card" ref={node => {this.cards = node}}>
                            { this.state.cards }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}