// src/components/Footer.js
import React from 'react';

function Footer({ shapeCounts }) {
    return (
        <footer className="app-footer">
            <span>Circle: {shapeCounts.circle}</span>
            <span>Square: {shapeCounts.square}</span>
            <span>Triangle: {shapeCounts.triangle}</span>
        </footer>
    );
}

export default Footer;