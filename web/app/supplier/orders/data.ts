export type OrderStatus = 'all' | 'pending' | 'completed' | 'cancelled' | 'refunded';

export type OrderItem = {
  name: string;
  sku: string;
  quantity: number;
  price: number;
  image: string;
};

export type Order = {
  id: string;
  status: OrderStatus;
  date: string; // ISO date string
  time: string; // display time
  items: number;
  total: number;
  customerName: string;
  customerEmail: string;
  customerAvatar: string;
  address: {
    line1: string;
    city: string;
    state: string;
    postalCode: string;
  };
  phone: string;
  ipAddress: string;
  trackingNumber: string;
  carrier: string;
  deliveryMethod: string;
  paymentBrand: string;
  paymentLast4: string;
  itemsDetail: OrderItem[];
  shipping: number;
  discount: number;
  tax: number;
  subtotal: number;
  history: Array<{
    label: string;
    datetime: string;
    status?: 'success' | 'in-progress' | 'pending';
  }>;
};

export const orders: Order[] = [
  {
    id: '6010',
    status: 'refunded',
    date: '2025-12-11',
    time: '1:49 pm',
    items: 6,
    total: 484.15,
    customerName: 'Jayvion Simon',
    customerEmail: 'nannie.abernathy70@yahoo.com',
    customerAvatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Jayvion',
    address: {
      line1: '19034 Verna Unions Apt. 164',
      city: 'Honolulu',
      state: 'RI',
      postalCode: '87535',
    },
    phone: '365-374-4961',
    ipAddress: '192.158.1.38',
    trackingNumber: 'SPX037739199373',
    carrier: 'DHL',
    deliveryMethod: 'Standard',
    paymentBrand: 'Mastercard',
    paymentLast4: '5678',
    itemsDetail: [
      {
        name: 'Urban Explorer Sneakers',
        sku: '16H9UR0',
        quantity: 1,
        price: 83.74,
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=160&h=160&fit=crop&auto=format',
      },
    ],
    shipping: 10,
    discount: 10,
    tax: 10,
    subtotal: 83.74,
    history: [
      { label: 'Delivery successful', datetime: '2025-12-10T12:49:00', status: 'success' },
      { label: 'Transporting to [2]', datetime: '2025-12-09T11:49:00', status: 'in-progress' },
      { label: 'Transporting to [1]', datetime: '2025-12-08T10:49:00', status: 'in-progress' },
      { label: 'Shipping unit has picked up the goods', datetime: '2025-12-07T09:49:00', status: 'in-progress' },
      { label: 'Order has been created', datetime: '2025-12-07T09:19:00', status: 'pending' },
    ],
  },
  {
    id: '6011',
    status: 'completed',
    date: '2025-12-10',
    time: '12:49 pm',
    items: 1,
    total: 83.74,
    customerName: 'Lucian Obrien',
    customerEmail: 'ashlynn.ohara62@gmail.com',
    customerAvatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Lucian',
    address: {
      line1: '19034 Verna Unions Apt. 164',
      city: 'Honolulu',
      state: 'RI',
      postalCode: '87535',
    },
    phone: '365-374-4961',
    ipAddress: '192.158.1.38',
    trackingNumber: 'SPX037739199373',
    carrier: 'DHL',
    deliveryMethod: 'Standard',
    paymentBrand: 'Mastercard',
    paymentLast4: '5678',
    itemsDetail: [
      {
        name: 'Urban Explorer Sneakers',
        sku: '16H9UR0',
        quantity: 1,
        price: 83.74,
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=160&h=160&fit=crop&auto=format',
      },
    ],
    shipping: 10,
    discount: 10,
    tax: 10,
    subtotal: 83.74,
    history: [
      { label: 'Delivery successful', datetime: '2025-12-10T12:49:00', status: 'success' },
      { label: 'Transporting to [2]', datetime: '2025-12-09T11:49:00', status: 'in-progress' },
      { label: 'Transporting to [1]', datetime: '2025-12-08T10:49:00', status: 'in-progress' },
      { label: 'Shipping unit has picked up the goods', datetime: '2025-12-07T09:49:00', status: 'in-progress' },
      { label: 'Order has been created', datetime: '2025-12-07T09:19:00', status: 'pending' },
    ],
  },
  {
    id: '6012',
    status: 'pending',
    date: '2025-12-01',
    time: '3:49 am',
    items: 5,
    total: 400.41,
    customerName: 'Soren Durham',
    customerEmail: 'vergie.block82@hotmail.com',
    customerAvatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Soren',
    address: {
      line1: '44 West Court',
      city: 'Dallas',
      state: 'TX',
      postalCode: '75001',
    },
    phone: '202-555-0165',
    ipAddress: '10.0.0.14',
    trackingNumber: 'SPX037739199374',
    carrier: 'FedEx',
    deliveryMethod: 'Express',
    paymentBrand: 'Visa',
    paymentLast4: '4211',
    itemsDetail: [
      {
        name: 'Modular Concrete Tiles',
        sku: 'TILE-220',
        quantity: 5,
        price: 80.08,
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=160&h=160&fit=crop&auto=format',
      },
    ],
    shipping: 25,
    discount: 0,
    tax: 12,
    subtotal: 400.41,
    history: [
      { label: 'Order placed', datetime: '2025-12-01T03:49:00', status: 'pending' },
    ],
  },
  {
    id: '6013',
    status: 'completed',
    date: '2025-12-09',
    time: '4:19 pm',
    items: 3,
    total: 220.55,
    customerName: 'Cortez Herring',
    customerEmail: 'vito.hudson@hotmail.com',
    customerAvatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Cortez',
    address: {
      line1: '92 North Street',
      city: 'Denver',
      state: 'CO',
      postalCode: '80014',
    },
    phone: '202-555-0178',
    ipAddress: '10.0.0.24',
    trackingNumber: 'SPX037739199375',
    carrier: 'UPS',
    deliveryMethod: 'Express',
    paymentBrand: 'Visa',
    paymentLast4: '9801',
    itemsDetail: [
      {
        name: 'Paver Blocks',
        sku: 'PVR-321',
        quantity: 3,
        price: 73.52,
        image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=160&h=160&fit=crop&auto=format',
      },
    ],
    shipping: 16,
    discount: 5,
    tax: 14,
    subtotal: 220.55,
    history: [
      { label: 'Delivery successful', datetime: '2025-12-09T10:00:00', status: 'success' },
    ],
  },
  {
    id: '6014',
    status: 'pending',
    date: '2025-12-06',
    time: '11:49 pm',
    items: 4,
    total: 310.12,
    customerName: 'Brycen Jimenez',
    customerEmail: 'tyrel.greenholt@gmail.com',
    customerAvatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Brycen',
    address: {
      line1: '884 Highland Ave',
      city: 'Seattle',
      state: 'WA',
      postalCode: '98101',
    },
    phone: '202-555-0199',
    ipAddress: '10.0.0.36',
    trackingNumber: 'SPX037739199376',
    carrier: 'DHL',
    deliveryMethod: 'Standard',
    paymentBrand: 'Amex',
    paymentLast4: '1023',
    itemsDetail: [
      {
        name: 'Outdoor Stair Treads',
        sku: 'TRD-118',
        quantity: 4,
        price: 77.53,
        image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=160&h=160&fit=crop&auto=format',
      },
    ],
    shipping: 22,
    discount: 12,
    tax: 9,
    subtotal: 310.12,
    history: [
      { label: 'Order placed', datetime: '2025-12-06T23:49:00', status: 'pending' },
    ],
  },
  {
    id: '6015',
    status: 'cancelled',
    date: '2025-12-04',
    time: '9:10 am',
    items: 2,
    total: 120.25,
    customerName: 'Rowan Cross',
    customerEmail: 'rowan.cross@gmail.com',
    customerAvatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Rowan',
    address: {
      line1: '17 Westwood Road',
      city: 'Phoenix',
      state: 'AZ',
      postalCode: '85001',
    },
    phone: '202-555-0133',
    ipAddress: '10.0.0.55',
    trackingNumber: 'SPX037739199377',
    carrier: 'UPS',
    deliveryMethod: 'Standard',
    paymentBrand: 'Visa',
    paymentLast4: '6677',
    itemsDetail: [
      {
        name: 'Concrete Pillars',
        sku: 'PLR-441',
        quantity: 2,
        price: 60.13,
        image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=160&h=160&fit=crop&auto=format',
      },
    ],
    shipping: 18,
    discount: 0,
    tax: 6,
    subtotal: 120.25,
    history: [
      { label: 'Order cancelled', datetime: '2025-12-04T09:10:00', status: 'pending' },
    ],
  },
  {
    id: '6016',
    status: 'pending',
    date: '2025-12-03',
    time: '5:30 pm',
    items: 2,
    total: 140.55,
    customerName: 'Amari Tran',
    customerEmail: 'amari.tran@gmail.com',
    customerAvatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Amari',
    address: {
      line1: '91 North Shore',
      city: 'Portland',
      state: 'OR',
      postalCode: '97201',
    },
    phone: '202-555-0172',
    ipAddress: '10.0.0.45',
    trackingNumber: 'SPX037739199378',
    carrier: 'DHL',
    deliveryMethod: 'Express',
    paymentBrand: 'Visa',
    paymentLast4: '2214',
    itemsDetail: [
      {
        name: 'Wall Panels',
        sku: 'WLP-984',
        quantity: 2,
        price: 70.27,
        image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=160&h=160&fit=crop&auto=format',
      },
    ],
    shipping: 20,
    discount: 0,
    tax: 7,
    subtotal: 140.55,
    history: [
      { label: 'Order placed', datetime: '2025-12-03T17:30:00', status: 'pending' },
    ],
  },
  {
    id: '6017',
    status: 'completed',
    date: '2025-12-02',
    time: '8:00 am',
    items: 1,
    total: 99.99,
    customerName: 'Sasha Patel',
    customerEmail: 'sasha.patel@gmail.com',
    customerAvatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Sasha',
    address: {
      line1: '811 Silver Drive',
      city: 'Austin',
      state: 'TX',
      postalCode: '73301',
    },
    phone: '202-555-0121',
    ipAddress: '10.0.0.61',
    trackingNumber: 'SPX037739199379',
    carrier: 'UPS',
    deliveryMethod: 'Express',
    paymentBrand: 'Visa',
    paymentLast4: '3322',
    itemsDetail: [
      {
        name: 'Concrete Mix Pack',
        sku: 'MIX-110',
        quantity: 1,
        price: 99.99,
        image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=160&h=160&fit=crop&auto=format',
      },
    ],
    shipping: 10,
    discount: 5,
    tax: 8,
    subtotal: 99.99,
    history: [
      { label: 'Delivery successful', datetime: '2025-12-02T11:00:00', status: 'success' },
    ],
  },
  {
    id: '6018',
    status: 'refunded',
    date: '2025-12-02',
    time: '2:30 pm',
    items: 2,
    total: 180.2,
    customerName: 'Shiloh Eaton',
    customerEmail: 'shiloh.eaton@gmail.com',
    customerAvatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Shiloh',
    address: {
      line1: '11 Meadow Lane',
      city: 'Atlanta',
      state: 'GA',
      postalCode: '30301',
    },
    phone: '202-555-0195',
    ipAddress: '10.0.0.71',
    trackingNumber: 'SPX037739199380',
    carrier: 'FedEx',
    deliveryMethod: 'Standard',
    paymentBrand: 'Visa',
    paymentLast4: '5521',
    itemsDetail: [
      {
        name: 'Garden Edge Blocks',
        sku: 'EDG-501',
        quantity: 2,
        price: 90.1,
        image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=160&h=160&fit=crop&auto=format',
      },
    ],
    shipping: 12,
    discount: 0,
    tax: 7,
    subtotal: 180.2,
    history: [
      { label: 'Refund completed', datetime: '2025-12-03T10:00:00', status: 'success' },
    ],
  },
  {
    id: '6019',
    status: 'completed',
    date: '2025-12-01',
    time: '9:10 am',
    items: 2,
    total: 210.88,
    customerName: 'Brooklyn Reese',
    customerEmail: 'brooklyn.reese@gmail.com',
    customerAvatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Brooklyn',
    address: {
      line1: '44 Lake View',
      city: 'Miami',
      state: 'FL',
      postalCode: '33010',
    },
    phone: '202-555-0193',
    ipAddress: '10.0.0.77',
    trackingNumber: 'SPX037739199381',
    carrier: 'UPS',
    deliveryMethod: 'Standard',
    paymentBrand: 'Visa',
    paymentLast4: '7811',
    itemsDetail: [
      {
        name: 'Interlocking Pavers',
        sku: 'PVR-110',
        quantity: 2,
        price: 105.44,
        image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=160&h=160&fit=crop&auto=format',
      },
    ],
    shipping: 16,
    discount: 6,
    tax: 11,
    subtotal: 210.88,
    history: [
      { label: 'Delivery successful', datetime: '2025-12-02T10:00:00', status: 'success' },
    ],
  },
  {
    id: '6020',
    status: 'pending',
    date: '2025-11-30',
    time: '10:00 am',
    items: 3,
    total: 155.5,
    customerName: 'Aspen Schmitt',
    customerEmail: 'mireya13@hotmail.com',
    customerAvatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Aspen',
    address: {
      line1: '22 Lake Shore',
      city: 'Chicago',
      state: 'IL',
      postalCode: '60007',
    },
    phone: '202-555-0112',
    ipAddress: '10.0.0.88',
    trackingNumber: 'SPX037739199382',
    carrier: 'DHL',
    deliveryMethod: 'Express',
    paymentBrand: 'Visa',
    paymentLast4: '9902',
    itemsDetail: [
      {
        name: 'Ready-mix Packs',
        sku: 'RMP-001',
        quantity: 3,
        price: 51.83,
        image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=160&h=160&fit=crop&auto=format',
      },
    ],
    shipping: 14,
    discount: 0,
    tax: 10,
    subtotal: 155.5,
    history: [
      { label: 'Order placed', datetime: '2025-11-30T10:00:00', status: 'pending' },
    ],
  },
  {
    id: '6021',
    status: 'pending',
    date: '2025-11-29',
    time: '1:49 am',
    items: 6,
    total: 484.15,
    customerName: 'Brycen Jimenez',
    customerEmail: 'tyrel.greenholt@gmail.com',
    customerAvatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=BrycenJ',
    address: {
      line1: '884 Highland Ave',
      city: 'Seattle',
      state: 'WA',
      postalCode: '98101',
    },
    phone: '202-555-0199',
    ipAddress: '10.0.0.36',
    trackingNumber: 'SPX037739199383',
    carrier: 'DHL',
    deliveryMethod: 'Standard',
    paymentBrand: 'Visa',
    paymentLast4: '4555',
    itemsDetail: [
      {
        name: 'Industrial Paver Set',
        sku: 'IND-881',
        quantity: 6,
        price: 80.69,
        image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=160&h=160&fit=crop&auto=format',
      },
    ],
    shipping: 28,
    discount: 0,
    tax: 18,
    subtotal: 484.15,
    history: [
      { label: 'Order placed', datetime: '2025-11-29T01:49:00', status: 'pending' },
    ],
  },
];

export const statusMeta: Record<Exclude<OrderStatus, 'all'>, { label: string; color: string; bg: string }> = {
  pending: { label: 'Pending', color: '#B54708', bg: '#FEF4E6' },
  completed: { label: 'Completed', color: '#067647', bg: '#E6F4EF' },
  cancelled: { label: 'Cancelled', color: '#B42318', bg: '#FEECEB' },
  refunded: { label: 'Refunded', color: '#475467', bg: '#E6E8EC' },
};

export const orderCounts = orders.reduce(
  (acc, order) => {
    if (acc[order.status]) {
      acc[order.status as Exclude<OrderStatus, 'all'>] += 1;
    }
    acc.all += 1;
    return acc;
  },
  { all: 0, pending: 0, completed: 0, cancelled: 0, refunded: 0 } as Record<OrderStatus, number>
);

export function getOrderById(id: string) {
  return orders.find((order) => order.id === id);
}
