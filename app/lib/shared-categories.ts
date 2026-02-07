// Shared categories data - use this for both API and server components
export const categories = [
  {
    _id: "1",
    name: "Badminton",
    description: "Badminton equipment and gear",
    imageUrl: "/images/categories/category-badminton.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "2",
    name: "Basketball",
    description: "Basketball equipment and gear",
    imageUrl: "/images/categories/category-basketball.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "3",
    name: "Football",
    description: "Football equipment and gear",
    imageUrl: "/images/categories/category-football.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "4",
    name: "Running",
    description: "Running equipment and gear",
    imageUrl: "/images/categories/category-running.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "5",
    name: "Swimming",
    description: "Swimming equipment and gear",
    imageUrl: "/images/categories/category-swimming.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "6",
    name: "Tennis",
    description: "Tennis equipment and gear",
    imageUrl: "/images/categories/category-tennis.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function getCategories() {
  return categories;
}

