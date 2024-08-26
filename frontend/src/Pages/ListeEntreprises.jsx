import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListeEntreprises.css';
import DashboardHeader from '../Components/DashboardHeader';
import Footer from '../Components/Footer';

const ListeEntreprises = () => {
    const [enterprises, setEnterprises] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSector, setSelectedSector] = useState('');
    const [sectors, setSectors] = useState([]);

    useEffect(() => {
        getEnterprises();
    }, []);

    const getEnterprises = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/entreprises/', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = response.data;
            setEnterprises(data);

            const uniqueSectors = [...new Set(data.map((enterprise) => enterprise.secteur))];
            setSectors(uniqueSectors);
        } catch (error) {
            console.error('Error fetching enterprises:', error);
        }
    };

    const filteredEnterprises = enterprises.filter((enterprise) => {
        const matchesSearch = enterprise.nom.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSector = selectedSector ? enterprise.secteur === selectedSector : true;
        return matchesSearch && matchesSector;
    });

    return (
        <div>
            <DashboardHeader />
            <div className="page-container">
                <div className="content-section">
                    <h2>Liste des Entreprises</h2>
                    <p>Explorez et gérez votre liste d'entreprises</p>
                </div>
                
                <div className="stats-section">
                    <div className="stat-card">
                        <h3>{enterprises.length}</h3>
                        <p>Entreprises Total</p>
                    </div>
                    <div className="stat-card">
                        <h3>{sectors.length}</h3>
                        <p>Secteurs Uniques</p>
                    </div>
                    <div className="stat-card">
                        <h3>{filteredEnterprises.length}</h3>
                        <p>Résultats Filtrés</p>
                    </div>
                </div>

                <div className="filters">
                    <div className="filter-container">
                        <input
                            type="text"
                            placeholder="Rechercher par nom"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-bar"
                        />
                    </div>
                    <div className="filter-container sector-filter-container">
                        <label htmlFor="sector-filter">Secteur</label>
                        <select
                            id="sector-filter"
                            value={selectedSector}
                            onChange={(e) => setSelectedSector(e.target.value)}
                            className="sector-filter"
                        >
                            <option value="">Tous les secteurs</option>
                            {sectors.map((sector, index) => (
                                <option key={index} value={sector}>
                                    {sector}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="divider"></div>

                <ul className="enterprise-list">
                    {filteredEnterprises.map((enterprise, index) => (
                        <li key={enterprise._id} className="enterprise-item">
                            <span className="enterprise-number">{index + 1}</span>
                            <span className="enterprise-name">{enterprise.nom}</span>
                            <span className="enterprise-sector">{enterprise.secteur}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <Footer />
        </div>
    );
};

export default ListeEntreprises;