'use client';

import React, { useState } from 'react';
import styles from './ControlPanel.module.scss';

interface ControlPanelProps {
  onAddVehicle: (spotNumber: number, plate: string) => void;
  onRemoveVehicle: (spotNumber: number) => void;
  availableSpots: number[];
  occupiedSpots: number[];
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  onAddVehicle,
  onRemoveVehicle,
  availableSpots,
  occupiedSpots
}) => {
  const [activeTab, setActiveTab] = useState<'add' | 'remove' | 'search'>('add');
  const [selectedSpot, setSelectedSpot] = useState<string>('');
  const [vehiclePlate, setVehiclePlate] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSpot && vehiclePlate.trim()) {
      onAddVehicle(parseInt(selectedSpot), vehiclePlate.trim().toUpperCase());
      setSelectedSpot('');
      setVehiclePlate('');

      const wave =  {
      id: 'spot-1',
      spotNumber: selectedSpot,
      status: 'occupied',
      vehicleInfo: {
        plate: vehiclePlate,
        entryTime: new Date().toLocaleTimeString()
      }
      };

      console.log(wave); // Log para depuração  
    }
  };

  const handleRemoveVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSpot) {
      onRemoveVehicle(parseInt(selectedSpot));
      setSelectedSpot('');
    }
  };

  const filteredOccupiedSpots = occupiedSpots.filter(spot => 
    spot.toString().includes(searchTerm) || 
    searchTerm === ''
  );

  return (
    <div className={styles.controlPanel}>
      <div className={styles.header}>
        <h2 className={styles.title}>Painel de Controle</h2>
      </div>

      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'add' ? styles.active : ''}`}
          onClick={() => setActiveTab('add')}
        >
          ➕ Adicionar Veículo
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'remove' ? styles.active : ''}`}
          onClick={() => setActiveTab('remove')}setVehiclePlate
        >
          ➖ Remover Veículo
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'search' ? styles.active : ''}`}
          onClick={() => setActiveTab('search')}
        >
          🔍 Buscar
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'add' && (
          <form onSubmit={handleAddVehicle} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="spot-select">Vaga Disponível:</label>
              <select 
                id="spot-select"
                value={selectedSpot} 
                onChange={(e) => setSelectedSpot(e.target.value)}
                required
              >
                <option value="">Selecione uma vaga</option>
                {availableSpots.map(spot => (
                  <option key={spot} value={spot}>Vaga {spot}</option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="plate-input">Placa do Veículo:</label>
              <input
                id="plate-input"
                type="text"
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
                placeholder="ABC-1234"
                maxLength={8}
                required
              />
            </div>
            <button type="submit" className={styles.submitBtn}>
              Adicionar Veículo
            </button>
          </form>
        )}

        {activeTab === 'remove' && (
          <form onSubmit={handleRemoveVehicle} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="occupied-spot-select">Vaga Ocupada:</label>
              <select 
                id="occupied-spot-select"
                value={selectedSpot} 
                onChange={(e) => setSelectedSpot(e.target.value)}
                required
              >
                <option value="">Selecione uma vaga</option>
                {occupiedSpots.map(spot => (
                  <option key={spot} value={spot}>Vaga {spot}</option>
                ))}
              </select>
            </div>
            <button type="submit" className={styles.submitBtn}>
              Remover Veículo
            </button>
          </form>
        )}

        {activeTab === 'search' && (
          <div className={styles.searchSection}>
            <div className={styles.formGroup}>
              <label htmlFor="search-input">Buscar Vaga:</label>
              <input
                id="search-input"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Digite o número da vaga"
              />
            </div>
            <div className={styles.searchResults}>
              <h3>Vagas Ocupadas:</h3>
              {filteredOccupiedSpots.length > 0 ? (
                <div className={styles.spotList}>
                  {filteredOccupiedSpots.map(spot => (
                    <div key={spot} className={styles.spotItem}>
                      <span>Vaga {spot}</span>
                      <button 
                        onClick={() => onRemoveVehicle(spot)}
                        className={styles.removeBtn}
                      >
                        Liberar
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.noResults}>Nenhuma vaga encontrada</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlPanel;

