
export const categories = [
  {
    id: "electronics",
    name: "Electronics",
    subCategories: [
      { id: "computers", name: "Computers & Accessories" },
      { id: "phones", name: "Cell Phones & Accessories" },
      { id: "tv", name: "TV & Video" },
      { id: "audio", name: "Audio & Home Theater" },
      { id: "cameras", name: "Camera & Photo" }
    ]
  },
  {
    id: "kitchen",
    name: "Home & Kitchen",
    subCategories: [
      { id: "appliances", name: "Appliances" },
      { id: "cookware", name: "Cookware" },
      { id: "furniture", name: "Furniture" },
      { id: "organization", name: "Organization" }
    ]
  },
  {
    id: "books",
    name: "Books",
    subCategories: [
      { id: "fiction", name: "Fiction" },
      { id: "nonfiction", name: "Non-fiction" },
      { id: "comics", name: "Comics & Graphic Novels" },
      { id: "textbooks", name: "Textbooks" }
    ]
  },
  {
    id: "fashion",
    name: "Clothing & Fashion",
    subCategories: [
      { id: "mens", name: "Men's Clothing" },
      { id: "womens", name: "Women's Clothing" },
      { id: "kids", name: "Kids' Clothing" },
      { id: "shoes", name: "Shoes" },
      { id: "jewelry", name: "Jewelry" }
    ]
  },
  {
    id: "toys",
    name: "Toys & Games",
    subCategories: [
      { id: "action", name: "Action Figures" },
      { id: "dolls", name: "Dolls & Accessories" },
      { id: "educational", name: "Educational Toys" },
      { id: "games", name: "Games & Puzzles" }
    ]
  },
  {
    id: "beauty",
    name: "Beauty & Personal Care",
    subCategories: [
      { id: "skincare", name: "Skin Care" },
      { id: "haircare", name: "Hair Care" },
      { id: "makeup", name: "Makeup" },
      { id: "fragrance", name: "Fragrance" }
    ]
  },
  {
    id: "sports",
    name: "Sports & Outdoors",
    subCategories: [
      { id: "exercise", name: "Exercise & Fitness" },
      { id: "camping", name: "Camping & Hiking" },
      { id: "cycling", name: "Cycling" },
      { id: "team-sports", name: "Team Sports" }
    ]
  }
];

export const getCategory = (id: string) => {
  return categories.find(category => category.id === id);
};
