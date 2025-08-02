import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonText,
  IonAlert
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { getReservations, deleteReservation, Reservation } from '../services/ReservationService';

const Tab2: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [penaltyType, setPenaltyType] = useState<'con' | 'sin' | null>(null);

  const loadReservations = () => {
    setReservations(getReservations());
  };

  useEffect(() => {
    loadReservations();
  }, []);

  const handleDelete = (index: number, withPenalty: boolean) => {
    setSelectedIndex(index);
    setPenaltyType(withPenalty ? 'con' : 'sin');
    setShowAlert(true);
  };

  const confirmDelete = () => {
    if (selectedIndex !== null) {
      deleteReservation(selectedIndex);
      loadReservations();
      setSelectedIndex(null);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Reservaciones</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {reservations.length === 0 ? (
          <IonText color="medium">No hay reservas registradas.</IonText>
        ) : (
          <IonList>
            {reservations.map((res, idx) => (
              <IonItem key={idx}>
                <IonLabel className="ion-text-wrap">
                  <h2><strong>{res.name}</strong> - Habitación {res.room}</h2>
                  <p>
                    🏨 Check-in: {new Date(res.checkIn).toLocaleDateString()}<br />
                    🚪 Check-out: {new Date(res.checkOut).toLocaleDateString()}<br />
                    🕓 Hora de ingreso: {res.time}
                  </p>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                    <IonButton color="danger" size="small" onClick={() => handleDelete(idx, true)}>
                      Eliminar con penalidad
                    </IonButton>
                    <IonButton color="medium" size="small" onClick={() => handleDelete(idx, false)}>
                      Eliminar sin penalidad
                    </IonButton>
                  </div>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}

        <IonAlert
          isOpen={showAlert}
          header="Confirmar eliminación"
          message={
            penaltyType === 'con'
              ? '¿Estás seguro que deseas eliminar esta reserva con penalidad?'
              : '¿Estás seguro que deseas eliminar esta reserva sin penalidad?'
          }
          buttons={[
            { text: 'Cancelar', role: 'cancel' },
            { text: 'Eliminar', handler: confirmDelete }
          ]}
          onDidDismiss={() => setShowAlert(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
