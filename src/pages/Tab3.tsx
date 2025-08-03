import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonButton,
  IonText,
} from '@ionic/react';
import { useState } from 'react';
import './Tab3.css';

const Tab3: React.FC = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, text: '✅ Tu reserva en habitación 105 ha sido confirmada.', read: false },
    { id: 2, text: '🔔 Promoción: 15% de descuento en reservas esta semana.', read: false },
    { id: 3, text: '🧹 Limpieza diaria programada para habitación 103.', read: true },
    { id: 4, text: '📅 Recordatorio: Tu check-in es mañana a las 14h00.', read: false },
    { id: 5, text: '📢 Nueva política de cancelación disponible en el sitio web.', read: true },
    { id: 6, text: '💳 Tu pago ha sido procesado correctamente.', read: false },
    { id: 7, text: '🥐 Desayuno incluido estará disponible de 7h00 a 10h00.', read: false },
    { id: 8, text: '📍 Visita turística gratuita disponible este viernes.', read: true },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Notificaciones</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonButton expand="block" color="medium" onClick={markAllAsRead}>
          Marcar todo como leído
        </IonButton>

        <IonList>
          {notifications.map((n) => (
            <IonItem key={n.id}>
              <IonLabel>
                <IonText color={n.read ? 'medium' : 'primary'}>
                  <p>{n.text}</p>
                </IonText>
              </IonLabel>
              {!n.read && <IonBadge color="danger">Nuevo</IonBadge>}
            </IonItem>
          ))}
        </IonList>

        {unreadCount === 0 && (
          <IonText color="success">
            <p style={{ textAlign: 'center', marginTop: '16px' }}>
              🎉 No tienes notificaciones pendientes
            </p>
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
