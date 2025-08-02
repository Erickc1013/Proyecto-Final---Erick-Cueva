import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonText,
  IonModal,
  useIonRouter,
} from '@ionic/react';
import { useState, useRef } from 'react';
import { addReservation } from '../services/ReservationService';

const Tab1: React.FC = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [checkOutDate, setCheckOutDate] = useState<string>('');
  const [checkInTime, setCheckInTime] = useState('');
  const [roomMessage, setRoomMessage] = useState<string>('');
  const [isRoomAvailable, setIsRoomAvailable] = useState<boolean>(true);

  const router = useIonRouter();
  const checkInModal = useRef<HTMLIonModalElement>(null);
  const checkOutModal = useRef<HTMLIonModalElement>(null);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  // Simulación de reservas existentes (puedes reemplazar por llamadas reales)
  const existingReservations = [
    { room: '101', from: '2025-08-05', to: '2025-08-08' },
    { room: '102', from: '2025-08-10', to: '2025-08-12' },
  ];

  const checkRoomAvailability = (roomId: string) => {
    if (!checkInDate || !checkOutDate) {
      setRoomMessage('Selecciona primero las fechas');
      setIsRoomAvailable(false);
      return;
    }

    const conflict = existingReservations.find((res) => {
      return (
        res.room === roomId &&
        checkInDate <= res.to &&
        checkOutDate >= res.from
      );
    });

    if (conflict) {
      setRoomMessage(`❌ Habitación reservada del ${formatDate(conflict.from)} al ${formatDate(conflict.to)}`);
      setIsRoomAvailable(false);
    } else {
      setRoomMessage('✅ Habitación disponible');
      setIsRoomAvailable(true);
    }
  };

  const handleSubmit = async () => {
    if (!name || !room || !checkInDate || !checkOutDate || !checkInTime) {
      alert('Completa todos los campos');
      return;
    }

    await addReservation({
      name,
      room,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      time: checkInTime,
    });

    alert('¡Reserva guardada!');

    setName('');
    setRoom('');
    setCheckInDate('');
    setCheckOutDate('');
    setCheckInTime('');
    setRoomMessage('');
    setIsRoomAvailable(true);

    router.push('/tab2', 'forward');
  };

  const rooms = ['101', '102', '103'];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Reservar Habitación</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Nombre</IonLabel>
          <IonInput value={name} onIonChange={(e) => setName(e.detail.value!)} />
        </IonItem>

        {/* Fechas */}
        <IonText color="medium">
          <p style={{ fontSize: '14px', marginTop: '16px', marginBottom: '4px' }}>
            Escoge la fecha de check-in y check-out del hotel:
          </p>
        </IonText>

        <IonItem button onClick={() => checkInModal.current?.present()}>
          <IonLabel>Check-in</IonLabel>
          <IonText slot="end">
            {checkInDate ? formatDate(checkInDate) : 'Seleccionar'}
          </IonText>
        </IonItem>

        <IonItem button onClick={() => checkOutModal.current?.present()}>
          <IonLabel>Check-out</IonLabel>
          <IonText slot="end">
            {checkOutDate ? formatDate(checkOutDate) : 'Seleccionar'}
          </IonText>
        </IonItem>

        {/* Selección de habitación */}
        <IonItem>
          <IonLabel position="stacked">Habitación</IonLabel>
          <IonSelect
            value={room}
            onIonChange={(e) => {
              setRoom(e.detail.value!);
              checkRoomAvailability(e.detail.value!);
            }}
            interface="popover"
          >
            {rooms.map((r) => (
              <IonSelectOption key={r} value={r}>
                Habitación {r}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        {/* Mensaje sobre la habitación */}
        {room && (
          <IonText color={isRoomAvailable ? 'success' : 'danger'}>
            <p style={{ fontSize: '14px', marginTop: '4px' }}>{roomMessage}</p>
          </IonText>
        )}

        {/* Texto informativo */}
        <IonText color="medium">
          <p style={{ fontSize: '12px', marginTop: '6px', marginBottom: '16px' }}>
            🕛 El check-in es desde las 12:00 pm y el check-out hasta las 12:00 pm
          </p>
        </IonText>

        {/* Hora de ingreso */}
        <IonItem>
          <IonLabel position="stacked">Hora de ingreso</IonLabel>
          <IonSelect
            value={checkInTime}
            onIonChange={(e) => setCheckInTime(e.detail.value!)}
            interface="popover"
          >
            <IonSelectOption value="12pm a 3pm">12pm a 3pm</IonSelectOption>
            <IonSelectOption value="3pm a 6pm">3pm a 6pm</IonSelectOption>
            <IonSelectOption value="6pm a 9pm">6pm a 9pm</IonSelectOption>
            <IonSelectOption value="9pm a 12am">9pm a 12am</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonButton expand="full" onClick={handleSubmit} disabled={!isRoomAvailable}>
          Guardar Reserva
        </IonButton>

        {/* Modales */}
        <IonModal ref={checkInModal}>
          <IonContent>
            <IonDatetime
              presentation="date"
              onIonChange={(e) => {
                setCheckInDate(e.detail.value as string);
                checkInModal.current?.dismiss();
              }}
            />
            <IonButton expand="full" onClick={() => checkInModal.current?.dismiss()}>
              Cancelar
            </IonButton>
          </IonContent>
        </IonModal>

        <IonModal ref={checkOutModal}>
          <IonContent>
            <IonDatetime
              presentation="date"
              onIonChange={(e) => {
                setCheckOutDate(e.detail.value as string);
                checkOutModal.current?.dismiss();
              }}
            />
            <IonButton expand="full" onClick={() => checkOutModal.current?.dismiss()}>
              Cancelar
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
