'use client';

import React, { useState, useEffect } from 'react';
import ParkingSpot, { SpotStatus } from './ParkingSpot';
import ControlPanel from './ControlPanel';
import styles from './ParkingGrid.module.scss';

interface ParkingSpotData {
  id: string;
  spotNumber: number;
  status: SpotStatus;
  vehicleInfo?: {
    plate?: string;
    entryTime?: string;
  };
}

interface ParkingGridProps {
  totalSpots?: number;
}

const ParkingGrid: React.FC<ParkingGridProps> = ({ totalSpots = 50 }) => {
  const [spots, setSpots] = useState<ParkingSpotData[]>([]);


  const exampleSpots: ParkingSpotData[] = [
    {
      id: 'spot-1',
      spotNumber: 1,
      status: 'occupied',
      vehicleInfo: {
        plate: 'ABC-1234',
        entryTime: '10:30'
      }
    },
    {
      id: 'spot-2',
      spotNumber: 2,
      status: 'available'
    }
  ];
     

  useEffect(() => {
    // Inicializar as vagas
    const initialSpots: ParkingSpotData[] = [];
    for (let i = 1; i <= 3; i++) {
      // Simular algumas vagas ocupadas para demonstração
      const isOccupied = Math.random() < 0.3; // 30% das vagas ocupadas

      initialSpots.push({
        id: `spot-${i}`,
        spotNumber: i,
        status: isOccupied ? 'occupied' : 'available',
        vehicleInfo: isOccupied ? {
          plate: `ABC-${Math.floor(Math.random() * 9000) + 1000}`,
          entryTime: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`
        } : undefined
      });
    }
    setSpots(exampleSpots);
  }, [totalSpots]);

  const handleSpotClick = (spotId: string) => {
    setSpots(prevSpots => 
      prevSpots.map(spot => {
        if (spot.id === spotId) {
          if (spot.status === 'available') {
            return { ...spot, status: 'selected' as SpotStatus };
          } else if (spot.status === 'selected') {
            return { ...spot, status: 'available' as SpotStatus };
          } else if (spot.status === 'occupied') {
            // Liberar vaga ocupada
            return { 
              ...spot, 
              status: 'available' as SpotStatus,
              vehicleInfo: undefined
            };
          }
        } else if (spot.status === 'selected') {
          // Desselecionar outras vagas
          return { ...spot, status: 'available' as SpotStatus };
        }
        return spot;
      })
    );
  };

  const handleAddVehicle = (spotNumber: number, plate: string) => {
    setSpots(prevSpots =>
      prevSpots.map(spot => {
        if (spot.spotNumber === spotNumber && spot.status === 'available') {
          return {
            ...spot,
            status: 'occupied' as SpotStatus,
            vehicleInfo: {
              plate: plate,
              entryTime: new Date().toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })
            }
          };
        }
        return spot;
      })
    );
  };

  const handleRemoveVehicle = (spotNumber: number) => {
    setSpots(prevSpots =>
      prevSpots.map(spot => {
        if (spot.spotNumber === spotNumber && spot.status === 'occupied') {
          return {
            ...spot,
            status: 'available' as SpotStatus,
            vehicleInfo: undefined
          };
        }
        return spot;
      })
    );
  };

  const handleToggleSpot = (spotNumber: number) => {
    setSpots(prevSpots =>
      prevSpots.map(spot => {
        if (spot.spotNumber === spotNumber) {
          return {
            ...spot,
            status: spot.status === 'disabled' ? 'available' : 'disabled' as SpotStatus,
            vehicleInfo: spot.status === 'disabled' ? undefined : spot.vehicleInfo
          };
        }
        return spot;
      })
    );
  };

  const getStats = () => {
    const available = spots.filter(spot => spot.status === 'available').length;
    const occupied = spots.filter(spot => spot.status === 'occupied').length;
    const selected = spots.filter(spot => spot.status === 'selected').length;
    
    return { available, occupied, selected, total: spots.length };
  };

  const getAvailableSpots = () => {
    return spots
      .filter(spot => spot.status === 'available')
      .map(spot => spot.spotNumber)
      .sort((a, b) => a - b);
  };

  const getOccupiedSpots = () => {
    return spots
      .filter(spot => spot.status === 'occupied')
      .map(spot => spot.spotNumber)
      .sort((a, b) => a - b);
  };

  const stats = getStats();

  return (
    <div className={styles.parkingContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Gerenciamento de Estacionamento</h1>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{stats.available}</span>
            <span className={styles.statLabel}>Disponíveis</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{stats.occupied}</span>
            <span className={styles.statLabel}>Ocupadas</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{stats.total}</span>
            <span className={styles.statLabel}>Total</span>
          </div>
        </div>
      </div>

      <ControlPanel
        onAddVehicle={handleAddVehicle}
        onRemoveVehicle={handleRemoveVehicle}
        onToggleSpot={handleToggleSpot}
        availableSpots={getAvailableSpots()}
        occupiedSpots={getOccupiedSpots()}
      />

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.legendColor} ${styles.available}`}></div>
          <span>Disponível</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendColor} ${styles.occupied}`}></div>
          <span>Ocupada</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendColor} ${styles.selected}`}></div>
          <span>Selecionada</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendColor} ${styles.disabled}`}></div>
          <span>Desabilitada</span>
        </div>
      </div>

      <div className={styles.parkingGrid}>
        {spots.map((spot) => (
          <ParkingSpot
            key={spot.id}
            id={spot.id}
            status={spot.status}
            spotNumber={spot.spotNumber}
            onClick={handleSpotClick}
            vehicleInfo={spot.vehicleInfo}
          />
        ))}
      </div>
    </div>
  );
};

export default ParkingGrid;

