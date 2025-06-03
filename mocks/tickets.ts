import { Ticket, HostRequest } from '@/types';

export const mockTickets: Ticket[] = [
  {
    id: '1',
    eventId: '1',
    eventTitle: 'Summer Night Soiree',
    eventDate: '2025-06-15',
    eventTime: '21:00 - 03:00',
    eventLocation: 'Skyline Penthouse, Miami',
    userId: '1',
    purchaseDate: '2025-05-20',
    price: 150,
    status: 'approved',
    qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOPSURBVO3BQY4cSRLAQDLQ//8yV0c/JZCoain2xgj+wRj/OMYKx1jjGGscY41jrHGMNY6xxjHWOMYax1jjGGscY41jrHGMNY6xxjHWuHg4kfxNFU8kU8UTSU8xJVMVTyR/U8WTY6xxjDWOscbFl1XxTZKniieSnmJKpormm0m+qeKbjrHGMdY4xhoXPyaZKp5IpooeyVTRJFNFj2Sq6JH0FD2SqaJH8pOKn3SMNY6xxjHWuPhlkqmiR9JU9Eh6iieSnqJJpooeSU/xm0l+02OscYw1jrHGxS+T9BQ9kp6iSaYqeiRTRZNMFU0yVTTJVNEkeYqf9BhrHGONY6xx8WOSv6miR9JTNMlU0STTX5L8TcdY4xhrHGONiy+r+E2SnqJJpooeSU/RJD1Fk0wVTyRTxZNkqvimY6xxjDWOscbFw4nkJ1X0SHqKJpkqeiRTRY+kp2iSqaJH0lM0yVTRJFPFk2Sq+EnHWOMYaxxjjYt/XEWTTBVNMlU0yVTRJFNFk0wVTTJV9Eimih5JT9Ek/0/HWOMYaxxjjYuHE0lP0SRTRY+kp2iSqaJJpooeSU/RJFNFk0wVTTJVNMlU0SRTRY+kp2iSqeKbjrHGMdY4xhoXDyeSqaJH0lM0yVTRJFNFk/QUTTJVNMlU0SRTRY+kp2iSqaJJpooeSU/RJD1Fk0wVT46xxjHWOMYaFw8nkp6iSaaKJukpmmSqaJKpokl6iiaZKppkqmiSqaJJpooeSU/RJD1Fk0wVTTJV9Eh6im86xhrHWOMYa1z8WEWTTBVNMlU0yVTRJFNFk0wVTTJV9Eh6iiaZKnokU0WTTBU9kp6iSaaKJpkqeiRTxZNjrHGMNY6xxsXDiWSquKtokqmiSaaKJpkqmmSqaJKpokmmih5JT9EkU0WTTBU9kp6iSaaKJpkqnhxjjWOscYw1Lh5OJH9TRY+kp2iSqaJJpooeSU/RJD1Fk0wVTTJV9Eimih5JT9EkU8U3HWONYyxwjDUuvqyKb5L0FE0yVTTJVNEkU0WTTBU9kp6iSaaKJpkqeiRTRZNMFU+SqeKbjrHGMdY4xhoXPyaZKp5IpooeSU/RJD1Fk0wVPZKpokl6iiaZKnokPUWTTBU/6RhrHGONY6xx8cskU0WPpKdokqmiR9JTNMlU0SRTRY+kp2iSqaJH0lP8pGOscYw1jrHGxS+T9BRNMlU0yVTRI+kpmmSqaJKpokl6iiaZKppkqmiSqeInHWONY6xxjDUufkzym1X0SHqKJpkqeiQ9RZP0FE0yVTTJVPEkmSq+6RhrHGONY6xx8WUV/0+SnqJJpooeSU/RJD1Fk0wVTTJVNMlU8U3HWOMYaxxjjX/8A/u/URgJzKYnAAAAAElFTkSuQmCC',
  },
  {
    id: '2',
    eventId: '2',
    eventTitle: 'Masquerade Mystery',
    eventDate: '2025-07-22',
    eventTime: '22:00 - 04:00',
    eventLocation: 'The Secret Garden, Los Angeles',
    userId: '1',
    purchaseDate: '2025-05-15',
    price: 200,
    status: 'pending',
  },
];

export const hostRequests: HostRequest[] = [
  {
    id: '1',
    userId: '2',
    userName: 'Jamie & Sam',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    eventId: '1',
    eventTitle: 'Summer Night Soiree',
    requestDate: '2025-05-18',
    status: 'pending',
  },
  {
    id: '2',
    userId: '3',
    userName: 'Taylor Smith',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    eventId: '3',
    eventTitle: 'Beach Sunset Social',
    requestDate: '2025-05-20',
    status: 'approved',
  },
];