import { useEffect, useRef, useState } from "react";
import '../assets/styles/ClientFilter.css'
import Client from "./Client";

function ClientsFilter() {
    const [clients, setClients] = useState([
        { name: "mohamad", isSelected: false },
        { name: "amazon", isSelected: false },
        { name: "google", isSelected: false },
        { name: "khaled", isSelected: false },
        { name: "kholod", isSelected: false }
    ])
    const [searchedClients, setSearchedClients] = useState([])
    const searchWord = useRef();

    useEffect(() => {
        setSearchedClients(clients.filter(client => !client.isSelected));
    }, [clients]);

    const updateClientSelection = (name, isSelected) => {
        setClients(clients.map(client =>
            client.name === name ? { ...client, isSelected } : client
        ));
    };

    const searchClients = () => {
        const lowerCase = searchWord.current.value.toLowerCase();
        setSearchedClients(clients.filter(client => 
            client.name.toLowerCase().startsWith(lowerCase)
        ))
    }

    return (
        <div className="clientFilter">
            <div className="clientFilterInfo">
                <p>Clients</p>
                <div className="checkbox">
                    <input type="checkbox" id="discardClientsFilter" className="filterCheckBox" />
                    <label htmlFor='discardClientsFilter'>Discard</label>
                </div>
            </div>
            <div className="clientFilterList">
                <div className="clientsList">
                    <div className="searchClientDiv">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 256 256">
                            <g
                                fillOpacity="0.69804"
                                fill="#354052"
                                fillRule="nonzero"
                                stroke="#354052"
                                strokeWidth="1"
                                strokeLinecap="butt"
                                strokeLinejoin="miter"
                                strokeMiterlimit="10"
                                strokeDasharray=""
                                strokeDashoffset="0"
                                fontFamily="none"
                                fontWeight="none"
                                fontSize="none"
                                textAnchor="none"
                                style={{ mixBlendMode: 'normal' }}
                            >
                                <g transform="scale(5.12,5.12)">
                                    <path d="M21,3c-9.39844,0 -17,7.60156 -17,17c0,9.39844 7.60156,17 17,17c3.35547,0 6.46094,-0.98437 9.09375,-2.65625l12.28125,12.28125l4.25,-4.25l-12.125,-12.09375c2.17969,-2.85937 3.5,-6.40234 3.5,-10.28125c0,-9.39844 -7.60156,-17 -17,-17zM21,7c7.19922,0 13,5.80078 13,13c0,7.19922 -5.80078,13 -13,13c-7.19922,0 -13,-5.80078 -13,-13c0,-7.19922 5.80078,-13 13,-13z"></path>
                                </g>
                            </g>
                        </svg>
                        <input type="text" className="searchClient" placeholder="Search" onChange={searchClients} ref={searchWord} />
                    </div>
                    <div className="list">
                        {searchedClients.filter(client => !client.isSelected).map((client, index) => (
                            <Client key={index} client={client} onUpdateClientSelection={updateClientSelection} />
                        ))}
                    </div>
                </div>
                <div className="selectedClients">
                    <div className="selectedClientsUtil">
                        <span>Selected</span>
                        <div className="checkbox">
                            <input type="checkbox" id="allSelectedClientsFilter" className="filterCheckBox" />
                            <label htmlFor='allSelectedClientsFilter'>All</label>
                        </div>
                    </div>
                    <div className="list">
                        {clients.filter(client => client.isSelected).map((client, index) => (
                            <Client key={index} client={client} onUpdateClientSelection={updateClientSelection} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientsFilter;