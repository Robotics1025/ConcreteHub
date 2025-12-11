# ConcreteHub - Professional E-commerce Dashboard

A modern, professional e-commerce platform built with Next.js, Material-UI, and inspired by the Minimal Dashboard template, featuring design patterns from Alibaba and Jumia marketplaces.

## 🎨 Design Features

- **Material-UI Components** - Professional UI components with consistent design
- **Minimal Dashboard Layout** - Clean, modern dashboard inspired by [Minimal Dashboard](https://mui.com/store/previews/minimal-dashboard/)
- **Alibaba/Jumia Design Patterns** - E-commerce marketplace features including:
  - Product cards with discount badges
  - Rating and review displays
  - Sales counters
  - Flash sale banners
  - Gradient cards and buttons
  
## 🚀 Tech Stack

- **Next.js 16** - React framework for production
- **Material-UI v7** - React UI framework
- **TypeScript** - Type safety
- **React ApexCharts** - Beautiful charts and graphs
- **Iconify** - Comprehensive icon library
- **Prisma** - Database ORM
- **NextAuth** - Authentication

## 📦 Installation

Dependencies are already installed. To install additional dependencies in the future:

```bash
npm install
```

## 🏃 Running the Application

```bash
# Development mode
npm run dev

# Production build
npm run build

# Start production server
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
web/
├── components/
│   ├── dashboard/          # Dashboard layout components
│   │   ├── DashboardLayout.tsx
│   │   ├── AccountPopover.tsx
│   │   └── nav/
│   ├── widgets/            # Reusable widgets
│   ├── charts/             # Chart components
│   ├── products/           # Product-related components
│   └── iconify/            # Icon wrapper
├── pages/
│   ├── page.tsx            # Main dashboard
│   ├── layout.tsx          # Root layout
│   ├── ecommerce/
│   │   ├── products/       # Products marketplace
│   │   └── orders/         # Order management
│   └── customers/          # Customer management
├── lib/
│   └── theme.ts            # Material-UI theme configuration
└── prisma/
    └── schema.prisma       # Database schema
```

## 🎯 Key Features

### Dashboard
- **Summary Cards** - Key metrics with trend indicators
- **Analytics Charts** - Interactive charts for data visualization
- **Recent Products** - Latest product additions
- **Flash Sale Banner** - Promotional banner with gradient styling

### E-commerce
- **Products Page** - Grid/List view toggle, search, and filters
- **Product Cards** - Discount badges, ratings, sales count
- **Orders Page** - Order tracking with status indicators
- **Order Management** - View and manage customer orders

### Customers
- **Customer List** - Comprehensive customer information
- **Verification Status** - Visual indicators for verified customers
- **Contact Information** - Email and phone display
- **Statistics Cards** - Customer metrics with gradient backgrounds

## 🎨 Theme Customization

The theme is configured in `lib/theme.ts` with:
- **Primary Color**: #FF6A00 (Alibaba/Jumia orange)
- **Typography**: Public Sans font family
- **Custom Shadows**: Minimal, professional shadows
- **Component Overrides**: Buttons, Cards, Drawers, etc.

## 🔧 Configuration

### Theme Colors
To modify theme colors, edit `lib/theme.ts`:

```typescript
palette: {
  primary: { main: '#FF6A00' },  // Your primary color
  secondary: { main: '#00695c' }, // Your secondary color
  // ... more colors
}
```

### Navigation
To add/modify navigation items, edit `components/dashboard/nav/index.tsx`:

```typescript
const navConfig: NavItem[] = [
  {
    title: 'Your Page',
    path: '/your-path',
    icon: <YourIcon />,
  },
  // ... more items
];
```

## 📱 Responsive Design

The dashboard is fully responsive with:
- Mobile-optimized navigation drawer
- Responsive grid layouts
- Touch-friendly interface
- Adaptive typography

## 🌟 Design Inspiration

This project combines:
1. **Minimal Dashboard** - Clean, professional layout
2. **Alibaba** - Marketplace features and orange accent color
3. **Jumia** - Product cards and promotional banners

## 📄 License

This project is private and proprietary.

## 🤝 Support

For support and questions, please contact the development team.

---

Built with ❤️ using Material-UI and Next.js
