// src/components/Footer.js
import React, { useContext } from 'react';
import {AppContext} from "../context/AppContext";
// import { AppContext } from '../AppContext'; // Adjust path

function Footer() {
    // Consume shapeCounts from context
    const { shapeCounts } = useContext(AppContext);

    return (
        <footer className="app-footer">
            <span>Circle: {shapeCounts.circle}</span>
            <span>Square: {shapeCounts.square}</span>
            <span>Triangle: {shapeCounts.triangle}</span>
        </footer>
    );
}

export default Footer;