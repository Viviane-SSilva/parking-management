'use client';

import React from 'react';
import styles from './ParkingSpot.module.scss';

export type SpotStatus = 'available' | 'occupied' | 'selected' | 'disabled';

interface ParkingSpotProps {
  id: string;
  status: SpotStatus;
  spotNumber: number;
  onClick?: (id: string) => void;
  vehicleInfo?: {
    plate?: string;
    entryTime?: string;
  };
}

const ParkingSpot: React.FC<ParkingSpotProps> = ({
  id,
  status,
  spotNumber,
  onClick,
  vehicleInfo
}) => {
  const handleClick = () => {
    if (status !== 'disabled' && onClick) {
      onClick(id);
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'available':
        return '🚗';
      case 'occupied':
        return '🚙';
      case 'selected':
        return '⭐';
      case 'disabled':
        return '🚫';
      default:
        return '🚗';
    }
  };

  return (
    <div
      className={`${styles.parkingSpot} ${styles[status]}`}
      onClick={handleClick}
      role="button"
      tabIndex={status !== 'disabled' ? 0 : -1}
      aria-label={`Vaga ${spotNumber} - ${status === 'available' ? 'Disponível' : status === 'occupied' ? 'Ocupada' : status === 'selected' ? 'Selecionada' : 'Desabilitada'}`}
    >
      <div className={styles.spotIcon}>
        {getStatusIcon()}
      </div>
      <div className={styles.spotNumber}>
        {spotNumber}
      </div>
      {status === 'occupied' && vehicleInfo && (
        <div className={styles.vehicleInfo}>
          {vehicleInfo.plate && (
            <div className={styles.plate}>{vehicleInfo.plate}</div>
          )}
          {vehicleInfo.entryTime && (
            <div className={styles.entryTime}>{vehicleInfo.entryTime}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ParkingSpot;

