import { Product } from "../types";

// Mock product data
export const products: Product[] = [
  {
    id: "1",
    title: "Apple AirPods Pro (2nd Generation) Wireless Ear Buds with USB-C",
    description: "Apple AirPods Pro (2nd generation) with MagSafe Case (USB‑C) deliver up to 2x more Active Noise Cancellation than the previous generation. Now with Adaptive Audio, which dynamically adjusts noise control based on your environment.",
    price: 3499.99,
    originalPrice: 4599.99,
    image: "https://m.media-amazon.com/images/I/61f1YfTkTDL._AC_SL1500_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/61f1YfTkTDL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71bhWgQK-cL._AC_SL1500_.jpg"
    ],
    category: "electronics",
    rating: 4.7,
    ratingCount: 38754,
    isPrime: true,
    features: [
      "Active Noise Cancellation reduces unwanted background noise",
      "Adaptive Transparency lets outside sounds in while reducing loud environmental noise",
      "Personalized Spatial Audio with dynamic head tracking places sound all around you"
    ],
    stockCount: 25
  },
  {
    id: "2",
    title: "Amazon Basics 4K Ultra HD HDMI Cable, 6 Feet, 2-Pack",
    description: "High-speed HDMI cable for connecting TVs, computer monitors, and more; supports Ethernet, 3D, 4K video, and Audio Return Channel (ARC)",
    price: 179.99,
    image: "https://m.media-amazon.com/images/I/71+5mYCqy7S._AC_SL1500_.jpg",
    category: "electronics",
    rating: 4.6,
    ratingCount: 97564,
    isPrime: true,
    features: [
      "Supports 4K resolution and Audio Return Channel (ARC)",
      "Gold-plated connectors for superior performance",
      "Durable nylon-braided cable"
    ],
    stockCount: 100
  },
  {
    id: "3",
    title: "Kindle Paperwhite (16 GB) – Now with a 6.8\" display and adjustable warm light",
    description: "The thinnest, lightest Kindle Paperwhite yet—with a flush-front design and 300 ppi glare-free display that reads like real paper even in bright sunlight.",
    price: 2799.99,
    originalPrice: 2999.99,
    image: "https://m.media-amazon.com/images/I/61Crpp37N7L._AC_SL1000_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/61Crpp37N7L._AC_SL1000_.jpg",
      "https://m.media-amazon.com/images/I/61WHGATV+ZL._AC_SL1000_.jpg",
      "https://m.media-amazon.com/images/I/71A7umZO3uL._AC_SL1500_.jpg"
    ],
    category: "electronics",
    rating: 4.8,
    ratingCount: 29876,
    isPrime: true,
    features: [
      "6.8\" display with adjustable warm light",
      "Waterproof (IPX8)",
      "Up to 10 weeks of battery life"
    ],
    stockCount: 15
  },
  {
    id: "4",
    title: "Logitech MX Master 3S - Wireless Performance Mouse with Ultra-fast Scrolling",
    description: "The Logitech MX Master 3S wireless mouse features an 8K DPI optical sensor and Quiet Clicks for precision work and enhanced workflow efficiency.",
    price: 99.99,
    image: "https://m.media-amazon.com/images/I/61ni3t1ryQL._AC_SL1500_.jpg",
    category: "electronics",
    rating: 4.5,
    ratingCount: 12543,
    isPrime: true,
    features: [
      "Ultra-fast and precise scrolling",
      "Ergonomic design for comfort",
      "Works on any surface including glass"
    ],
    stockCount: 45
  },
  {
    id: "5",
    title: "Samsung 27-Inch Odyssey G7 Gaming Monitor with 1000R Curved Screen",
    description: "NVIDIA G-SYNC and AMD FreeSync Premium Pro support, 240Hz refresh rate, 1ms response time, QLED, HDR600, WQHD (2560x1440p) display",
    price: 499.99,
    originalPrice: 699.99,
    image: "https://m.media-amazon.com/images/I/61Lb5JfRJfL._AC_SL1000_.jpg",
    category: "electronics",
    rating: 4.4,
    ratingCount: 3876,
    isPrime: true,
    features: [
      "1000R curved screen for immersive gaming",
      "240Hz refresh rate with 1ms response time",
      "QLED technology with HDR600"
    ],
    stockCount: 8
  },
  {
    id: "6",
    title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker, 6 Quart",
    description: "The Instant Pot Duo replaces 7 kitchen appliances: pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker & warmer",
    price: 89.95,
    originalPrice: 99.95,
    image: "https://m.media-amazon.com/images/I/71V1LrY1MSL._AC_SL1500_.jpg",
    category: "kitchen",
    rating: 4.7,
    ratingCount: 156289,
    isPrime: true,
    features: [
      "7-in-1 functionality",
      "13 customizable smart programs",
      "Advanced safety features"
    ],
    stockCount: 50
  },
  {
    id: "7",
    title: "Bose QuietComfort Wireless Noise Cancelling Headphones",
    description: "The world's most effective noise cancelling headphones. Premium comfort, crystal clear audio, and up to 24 hours of battery life.",
    price: 299.00,
    image: "https://m.media-amazon.com/images/I/61QyJCJ33hL._AC_SL1500_.jpg",
    category: "electronics",
    rating: 4.6,
    ratingCount: 24567,
    isPrime: true,
    features: [
      "World-class noise cancellation",
      "Premium comfort for all-day wear",
      "Up to 24 hours of battery life"
    ],
    stockCount: 20
  },
  {
    id: "8",
    title: "LEGO Star Wars Millennium Falcon Building Kit (7541 Pieces)",
    description: "Build and display the ultimate LEGO Star Wars Millennium Falcon with this expert building set. This model includes intricate exterior detailing and a detailed interior.",
    price: 849.99,
    image: "https://m.media-amazon.com/images/I/71OwGgELSGL._AC_SL1500_.jpg",
    category: "toys",
    rating: 4.9,
    ratingCount: 5621,
    isPrime: false,
    features: [
      "7,541 pieces",
      "Includes 4 classic crew minifigures and 3 episode VII/VIII characters",
      "Detailed interior with seating and game table"
    ],
    stockCount: 5
  },
  {
    id: "9",
    title: "Ninja DZ090 Foodi 6-in-1 8-qt. 2-Basket Air Fryer with DualZone Technology",
    description: "2 independent baskets with DualZone Technology to cook 2 foods, 2 ways, that finish at the same time.",
    price: 129.99,
    originalPrice: 199.99,
    image: "https://m.media-amazon.com/images/I/71+8uTMDRFL._AC_SL1500_.jpg",
    category: "kitchen",
    rating: 4.8,
    ratingCount: 32456,
    isPrime: true,
    features: [
      "2 independent 4-quart baskets",
      "6-in-1 functionality: air fry, air broil, roast, bake, reheat, and dehydrate",
      "XL 8-quart capacity"
    ],
    stockCount: 35
  },
  {
    id: "10",
    title: "Fitbit Versa 4 Fitness Smartwatch with Daily Readiness Score",
    description: "Optimize your workout routine with Daily Readiness Score, built-in GPS, 40+ exercise modes, and 24/7 heart rate tracking.",
    price: 199.95,
    originalPrice: 229.95,
    image: "https://m.media-amazon.com/images/I/610ivCSqkQL._AC_SL1500_.jpg",
    category: "electronics",
    rating: 4.2,
    ratingCount: 8734,
    isPrime: true,
    features: [
      "Built-in GPS tracking",
      "24/7 heart rate monitoring",
      "6+ day battery life"
    ],
    stockCount: 42
  },
  {
    id: "11",
    title: "Dyson V15 Detect Cordless Vacuum Cleaner",
    description: "Dyson's most powerful, intelligent cordless vacuum. Engineered to deep clean your entire home with laser dust detection.",
    price: 749.99,
    image: "https://m.media-amazon.com/images/I/61exqFKgisL._AC_SL1500_.jpg",
    category: "home",
    rating: 4.4,
    ratingCount: 5783,
    isPrime: true,
    features: [
      "Laser dust detection technology",
      "Intelligent cleaning with piezo sensor",
      "Up to 60 minutes of run time"
    ],
    stockCount: 15
  },
  {
    id: "12",
    title: "Samsung Galaxy Tab S9 11\" 256GB Wi-Fi Android Tablet",
    description: "Dynamic AMOLED 2X Display, Snapdragon 8 Gen 2 Processor, Weatherproof Durability, S Pen Included",
    price: 799.99,
    originalPrice: 919.99,
    image: "https://m.media-amazon.com/images/I/81fRAXNVJgL._AC_SL1500_.jpg",
    category: "electronics",
    rating: 4.6,
    ratingCount: 4321,
    isPrime: true,
    features: [
      "Dynamic AMOLED 2X Display",
      "S Pen included",
      "Snapdragon 8 Gen 2 for Galaxy"
    ],
    stockCount: 22
  }
];

// Featured products for the homepage
export const featuredProducts = products.slice(0, 4);

// Best selling products
export const bestSellers = products.filter(p => p.rating >= 4.6);

// Products on sale
export const onSale = products.filter(p => p.originalPrice !== undefined);

// Electronics products
export const electronics = products.filter(p => p.category === "electronics");

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
