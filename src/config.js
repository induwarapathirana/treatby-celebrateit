export const THEME_COLORS = {
  royalPurple: "#7851A9",
  faithfulOrange: "#FF7F50", // Coral/Orange shade, visually striking
  dark: "#1A1A1A",
  light: "#FDFDFD",
  gray: "#E1E1E1",
};

export const PLATTERS = [
  {
    id: "platter_1",
    name: "The Royal Indulgence",
    description: "A luxurious selection of premium sweets and treats perfect for grand celebrations.",
    price: 150,
    imageUrl: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    contents: ["10x Chocolate Truffles", "5x Macarons", "2x Mini Tarts", "Fresh Berries"],
  },
  {
    id: "platter_2",
    name: "The Faithful Feast",
    description: "Our signature blend of sweet and savory treats to delight any crowd.",
    price: 120,
    imageUrl: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    contents: ["8x Mini Cupcakes", "6x Strawberries", "Assorted Chocolates"],
  },
  {
    id: "platter_3",
    name: "Simply Celebrateit",
    description: "A beautiful, minimalist platter focusing on pure, delightful flavors.",
    price: 90,
    imageUrl: "https://images.unsplash.com/photo-1577906096429-f73c2c312435?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    contents: ["12x Donut Holes", "Fruit Mix", "Sweet Dips"],
  }
];

export const CUSTOM_ITEMS = [
  {
    category: "Sweets",
    items: [
      { id: "item_1", name: "Chocolate Truffles", price: 3, imageUrl: "https://images.unsplash.com/photo-1548883354-94cb0b232677?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
      { id: "item_2", name: "French Macarons", price: 4, imageUrl: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
      { id: "item_3", name: "Mini Cupcakes", price: 5, imageUrl: "https://images.unsplash.com/photo-1587668178277-295251f900ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    ]
  },
  {
    category: "Fruits & Berries",
    items: [
      { id: "item_4", name: "Chocolate Covered Strawberries", price: 6, imageUrl: "https://images.unsplash.com/photo-1594514330689-0aeac1ec04a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
      { id: "item_5", name: "Fresh Berry Mix", price: 10, imageUrl: "https://images.unsplash.com/photo-1591871937631-2f64059d234f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    ]
  },
  {
    category: "Savory & Dips",
    items: [
      { id: "item_6", name: "Mini Quiche", price: 4, imageUrl: "https://images.unsplash.com/photo-1626078308696-6e4693ae9097?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
      { id: "item_7", name: "Caramel Dip", price: 3, imageUrl: "https://images.unsplash.com/photo-1614264626156-f6d8d672ea4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    ]
  }
];

export const EMAIL_CONFIG = {
  // Free EmailJS credentials placeholder (To be replaced by the user)
  serviceId: "service_ma9qli3",
  templateId: "template_ty6td6h",
  publicKey: "4WPyk_CtTb9i-QgbJ"
};
