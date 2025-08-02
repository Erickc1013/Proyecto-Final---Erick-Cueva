export interface Reservation {
  name: string;
  room: string;
  checkIn: string;
  checkOut: string;
  time: string;
}

const STORAGE_KEY = 'hotel_reservations';

export const getReservations = (): Reservation[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const addReservation = (reservation: Reservation) => {
  const current = getReservations();
  const updated = [...current, reservation];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const deleteReservation = (index: number) => {
  const current = getReservations();
  current.splice(index, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
};
