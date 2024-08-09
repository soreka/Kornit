import { useState } from "react";

function Client({ client, onUpdateClientSelection }) {
    return (
        <div className="client">
            <input type="checkbox" id={client.name} className="filterCheckBox" checked={client.isSelected} onChange={() => onUpdateClientSelection(client.name, !client.isSelected)} />
            <label htmlFor={client.name}>{client.name}</label>
        </div>
    )
}

export default Client;