import muttonBoneless from '../assets/bestSeller/mutton-boneless.jpg';
import muttonKeema from '../assets/bestSeller/mutton-kheema.jpg';
import chickenWings from '../assets/bestSeller/chicken-wings-without-skin.jpg';
import chickenFullLeg from '../assets/bestSeller/chicken-full-legs-without-skin.jpg';
import chickenBreast from '../assets/bestSeller/chicken-breast-boneless.jpg';
import prawnsIcon from '../assets/productIcons/PrawnsIcon.jpg';
import whitePromfretIcon from '../assets/productIcons/whitePromfretIcon.jpg';
import eggsIcon from '../assets/productIcons/EggsIcon.jpg';
import whiteEggsIcon from '../assets/productIcons/whiteEggsIcon.jpg';
import coconutWaterIcon from '../assets/productIcons/coconutIcon.jpg';
import roastedChickenIcon from '../assets/productIcons/roastedChicken.jpg';
import nonVegPicklesIcon from '../assets/productIcons/nonvegPickleIcon.jpg';
import mudCrabsIcon from '../assets/productIcons/mudCrabsIcon.jpg';;
import natuKodiEggsIcon from '../assets/productIcons/brownEggs.jpg';
import quailEggsIcon from '../assets/productIcons/QuaileggsIcon.jpg';
import brownEggsIcon from '../assets/productIcons/brownEggs.jpg';
import natuKodiIcon from '../assets/productIcons/CountryChickenIcon.jpg';
import kadaknathIcon from '../assets/productIcons/kadaknathIcon.jpg';
import asliChickenIcon from '../assets/productIcons/AsliChickenIcon.jpg';
import quailIcon from '../assets/productIcons/quilBirdIcon.jpg';
export const bestSellerData = [
  {
    image: muttonBoneless,
    name: 'Mutton Boneless',
    description: '400GM | 10 pieces | 4-6 serves',
    price: 499,
    originalPrice: 699,
    discount: 29,
  },
  {
    image: muttonKeema,
    name: 'Mutton Keema',
    description: '400GM | 4-6 serves',
    price: 459,
    originalPrice: 699,
    discount: 34,
  },
  {
    image: chickenWings,
    name: 'Chicken Wings without Skin',
    description: '400GM | 6 pieces | 4-6 serves',
    price: 159,
    originalPrice: 199,
    discount: 20,
  },
  {
    image: chickenFullLeg,
    name: 'Chicken Full Leg Without Skin',
    description: '400GM | 2 pieces | 4-6 serves',
    price: 199,
    originalPrice: 249,
    discount: 20,
  },
  {
    image: chickenBreast,
    name: 'Chicken Breast Boneless',
    description: '400GM | 2 pieces | 4-6 serves',
    price: 208,
    originalPrice: 260,
    discount: 20,
  },
];

// Product interface
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  category: string;
  subCategory?: string;
  weight: string;
  serves: string;
  inStock: boolean;
  isBestSeller?: boolean;
}

// Comprehensive product data for all categories
export const productsData: Product[] = [
  // Chicken Category
  {
    id: 'chicken-breast-boneless',
    name: 'Chicken Breast Boneless',
    description: 'Premium boneless chicken breast',
    price: 208,
    originalPrice: 260,
    discount: 20,
    image: chickenBreast,
    category: 'chicken',
    subCategory: 'boneless',
    weight: '400GM',
    serves: '4-6 serves',
    inStock: true,
    isBestSeller: true,
  },
  {
    id: 'chicken-legs-bone',
    name: 'Chicken Legs with Bone',
    description: 'Fresh chicken legs with bone',
    price: 180,
    originalPrice: 225,
    discount: 20,
    image: chickenFullLeg,
    category: 'chicken',
    subCategory: 'bone',
    weight: '500GM',
    serves: '4-6 serves',
    inStock: true,
  },
  {
    id: 'chicken-wings-boneless',
    name: 'Chicken Wings Boneless',
    description: 'Boneless chicken wings',
    price: 159,
    originalPrice: 199,
    discount: 20,
    image: chickenWings,
    category: 'chicken',
    subCategory: 'bone',
    weight: '400GM',
    serves: '4-6 serves',
    inStock: true,
    isBestSeller: true,
  },
  {
    id: 'chicken-curry-cut',
    name: 'Chicken Curry Cut',
    description: 'Traditional curry cut chicken pieces',
    price: 175,
    originalPrice: 220,
    discount: 20,
    image: chickenFullLeg,
    category: 'chicken',
    subCategory: 'bone',
    weight: '500GM',
    serves: '4-6 serves',
    inStock: true,
  },

  // Mutton Category
  {
    id: 'mutton-boneless',
    name: 'Mutton Boneless',
    description: 'Premium boneless mutton pieces',
    price: 499,
    originalPrice: 699,
    discount: 29,
    image: muttonBoneless,
    category: 'mutton',
    subCategory: 'boneless',
    weight: '400GM',
    serves: '4-6 serves',
    inStock: true,
    isBestSeller: true,
  },
  {
    id: 'mutton-bone',
    name: 'Mutton with Bone',
    description: 'Fresh mutton with bone',
    price: 450,
    originalPrice: 600,
    discount: 25,
    image: muttonBoneless,
    category: 'mutton',
    subCategory: 'bone',
    weight: '500GM',
    serves: '4-6 serves',
    inStock: true,
  },
  {
    id: 'mutton-keema',
    name: 'Mutton Keema',
    description: 'Finely minced mutton',
    price: 459,
    originalPrice: 699,
    discount: 34,
    image: muttonKeema,
    category: 'mutton',
    subCategory: 'minced',
    weight: '400GM',
    serves: '4-6 serves',
    inStock: true,
    isBestSeller: true,
  },

  // Natu Kodi Category
  {
    id: 'natu-kodi-whole',
    name: 'Natu Kodi Whole',
    description: 'Free-range country chicken whole',
    price: 350,
    originalPrice: 450,
    discount: 22,
    image: natuKodiIcon,
    category: 'natu-kodi',
    subCategory: 'whole',
    weight: '1KG',
    serves: '6-8 serves',
    inStock: true,
  },
  {
    id: 'natu-kodi-original',
    name: 'Anvi Natu Kodi Original (asli breed)',
    description: 'Country chicken original (asli breed)',
    price: 800,
    originalPrice: 1000,
    discount: 20,
    image: asliChickenIcon,
    category: 'natu-kodi',
    subCategory: 'original',
    weight: '1KG',
    serves: '4-6 serves',
    inStock: true,
  },
  {
    id: 'natu-kodi-curry-cut',
    name: 'Natu Kodi Curry Cut',
    description: 'Country chicken curry cut pieces',
    price: 320,
    originalPrice: 400,
    discount: 20,
    image: natuKodiIcon,
    category: 'natu-kodi',
    subCategory: 'curry-cut',
    weight: '500GM',
    serves: '4-6 serves',
    inStock: true,
  },

  // Kadaknath Category
  {
    id: 'kadaknath-whole',
    name: 'Kadaknath Whole',
    description: 'Premium black chicken whole',
    price: 800,
    originalPrice: 1000,
    discount: 20,
    image: kadaknathIcon,
    category: 'kadaknath',
    subCategory: 'whole',
    weight: '1KG',
    serves: '6-8 serves',
    inStock: true,
  },
  {
    id: 'kadaknath-curry-cut',
    name: 'Kadaknath Curry Cut',
    description: 'Black chicken curry cut pieces',
    price: 750,
    originalPrice: 900,
    discount: 17,
    image: kadaknathIcon,
    category: 'kadaknath',
    subCategory: 'curry-cut',
    weight: '500GM',
    serves: '4-6 serves',
    inStock: true,
  },

  // Turkey Category
  {
    id: 'turkey-breast',
    name: 'Turkey Breast',
    description: 'Fresh turkey breast meat',
    price: 400,
    originalPrice: 500,
    discount: 20,
    image: chickenBreast,
    category: 'turkey',
    subCategory: 'breast',
    weight: '500GM',
    serves: '4-6 serves',
    inStock: false,
  },
  {
    id: 'turkey-curry-cut',
    name: 'Turkey Curry Cut',
    description: 'Fresh turkey curry cut pieces',
    price: 380,
    originalPrice: 475,
    discount: 20,
    image: chickenFullLeg,
    category: 'turkey',
    subCategory: 'curry-cut',
    weight: '500GM',
    serves: '4-6 serves',
    inStock: false,
  },

  // Quail Birds Category
  {
    id: 'quail-whole',
    name: 'Quail Whole',
    description: 'Fresh whole quail birds',
    price: 120,
    originalPrice: 150,
    discount: 20,
    image: quailIcon,
    category: 'quail-birds',
    subCategory: 'whole',
    weight: '200GM',
    serves: '2-3 serves',
    inStock: true,
  },
  {
    id: 'quail-curry-cut',
    name: 'Quail Curry Cut',
    description: 'Quail curry cut pieces',
    price: 100,
    originalPrice: 125,
    discount: 20,
    image: quailIcon,
    category: 'quail-birds',
    subCategory: 'curry-cut',
    weight: '150GM',
    serves: '2-3 serves',
    inStock: true,
  },

  // Sea Food Category
  {
    id: 'fish-rohu',
    name: 'Rohu Fish',
    description: 'Fresh Rohu fish fillets',
    price: 200,
    originalPrice: 250,
    discount: 20,
    image: chickenBreast,
    category: 'seafood',
    subCategory: 'fish',
    weight: '500GM',
    serves: '4-6 serves',
    inStock: false,
  },
  {
    id: 'white-promfret',
    name: 'White Promfret',
    description: 'Fresh White Promfret whole',
    price: 600,
    originalPrice: 800,
    discount: 20,
    image: whitePromfretIcon,
    category: 'seafood',
    subCategory: 'fish',
    weight: '1KG',
    serves: '3-4 serves', 
    inStock: true,
  },
  {
    id: 'prawns-jumbo',
    name: 'Jumbo Prawns',
    description: 'Fresh jumbo prawns',
    price: 350,
    originalPrice: 400,
    discount: 13,
    image: prawnsIcon,
    category: 'seafood',
    subCategory: 'prawns',
    weight: '400GM',
    serves: '4-6 serves',
    inStock: true,
  },
  {
    id: 'crabs-mud',
    name: 'Mud Crabs',
    description: 'Fresh mud crabs',
    price: 450,
    originalPrice: 550,
    discount: 18,
    image: mudCrabsIcon,
    category: 'seafood',
    subCategory: 'crabs',
    weight: '500GM',
    serves: '4-6 serves',
    inStock: true,
  },

  // Eggs Category
  {
    id: 'eggs-white',
    name: 'White Eggs',
    description: 'Fresh white eggs',
    price: 60,
    originalPrice: 75,
    discount: 20,
    image: whiteEggsIcon,
    category: 'eggs',
    subCategory: 'white-eggs',
    weight: '12 pieces',
    serves: '6-8 serves',
    inStock: true,
  },
  {
    id: 'eggs-natu-kodi',
    name: 'Natu Kodi Eggs',
    description: 'Free-range country chicken eggs',
    price: 120,
    originalPrice: 150,
    discount: 20,
    image: brownEggsIcon,
    category: 'eggs',
    subCategory: 'natu-kodi-eggs',
    weight: '12 pieces',
    serves: '6-8 serves',
    inStock: true,
  },
  {
    id: 'eggs-quail',
    name: 'Quail Eggs',
    description: 'Fresh quail eggs',
    price: 80,
    originalPrice: 100,
    discount: 20,
    image: quailEggsIcon,
    category: 'eggs',
    subCategory: 'quail-eggs',
    weight: '20 pieces',
    serves: '8-10 serves',
    inStock: true,
  },
  {
    id: 'eggs-original-natu',
    name: 'Original Natu Kodi Eggs',
    description: 'Premium original natu kodi eggs',
    price: 150,
    originalPrice: 180,
    discount: 17,
    image: natuKodiEggsIcon,
    category: 'eggs',
    subCategory: 'original-natu-kodi-eggs',
    weight: '12 pieces',
    serves: '6-8 serves',
    inStock: true,
  },

  // Roasted Chicken Category
  {
    id: 'roasted-chicken-whole',
    name: 'Roasted Chicken Whole',
    description: 'Ready to eat roasted whole chicken',
    price: 450,
    originalPrice: 550,
    discount: 18,
    image: roastedChickenIcon,
    category: 'roasted-chicken',
    subCategory: 'whole',
    weight: '1KG',
    serves: '6-8 serves',
    inStock: true,
  },
  {
    id: 'roasted-chicken-half',
    name: 'Roasted Chicken Half',
    description: 'Ready to eat roasted half chicken',
    price: 250,
    originalPrice: 300,
    discount: 17,
    image: roastedChickenIcon,
    category: 'roasted-chicken',
    subCategory: 'half',
    weight: '500GM',
    serves: '4-6 serves',
    inStock: true,
  },

  // Non-Veg Pickles Category
  {
    id: 'pickle-chicken',
    name: 'Chicken Pickle',
    description: 'Traditional chicken pickle',
    price: 180,
    originalPrice: 220,
    discount: 18,
    image: nonVegPicklesIcon,
    category: 'nonveg-pickles',
    subCategory: 'chicken-pickle',
    weight: '500GM',
    serves: '8-10 serves',
    inStock: true,
  },
  {
    id: 'pickle-mutton',
    name: 'Mutton Pickle',
    description: 'Traditional mutton pickle',
    price: 220,
    originalPrice: 270,
    discount: 19,
    image: nonVegPicklesIcon,
    category: 'nonveg-pickles',
    subCategory: 'mutton-pickle',
    weight: '500GM',
    serves: '8-10 serves',
    inStock: true,
  },

  // Coconut Water Category
  {
    id: 'coconut-water-fresh',
    name: 'Fresh Coconut Water',
    description: 'Natural fresh coconut water',
    price: 99,
    originalPrice: 120,
    discount: 20,
    image: coconutWaterIcon,
    category: 'coconut-water',
    subCategory: 'fresh',
    weight: '850ML',
    serves: ' serve',
    inStock: true,
  },
];

// Helper functions to get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return productsData.filter(product => product.category === category);
};

export const getProductsBySubCategory = (category: string, subCategory: string): Product[] => {
  return productsData.filter(product => 
    product.category === category && product.subCategory === subCategory
  );
};

export const getProductById = (id: string): Product | undefined => {
  return productsData.find(product => product.id === id);
};

export const getBestSellerProducts = (): Product[] => {
  return productsData.filter(product => product.isBestSeller);
};

// Search function to filter products
export const searchProducts = (query: string): Product[] => {
  if (!query.trim()) return [];
  
  const searchTerm = query.toLowerCase().trim();
  
  return productsData.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    (product.subCategory && product.subCategory.toLowerCase().includes(searchTerm))
  );
};

// Testimonials interface
export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  avatar?: string;
  date: string;
}

// Testimonials mock data
export const testimonialsData: Testimonial[] = [
  {
    id: '4',
    name: 'Saideep Meka',
    rating: 5,
    comment: "If you're looking for fresh, hygienic, and premium-quality meat delivered to your doorstep, Anvi Fresh Meat Mart is a fantastic choice. Highly recommended for busy households and meat lovers! Will definitely order again!",
    date: '2024-06-09',
  },
  {
    id: '2',
    name: 'srikanth aknoori',
    rating: 5,
    comment: "Strongly recommend! Maintains Hygiene, Quality and Tastes good. Meat is tender and juicy. Coming to price it's cheaper than usual stores which we find in and around Kalyan Nagar. Lastly customer support is also good. Thanks Anvi! :)",
    date: '2024-06-09',
  },
  {
    id: '3',
    name: 'sindhu karanam',
    rating: 5,
    comment: "I've been ordering meat every week, and I've always received my deliveries on time with the meat arriving fresh and well-packaged. The quality is consistently great.",
    date: '2024-06-09',
  },
  {
    id: '1',
    name: 'Dr. Sunnam Venkata Srikanth',
    rating: 5,
    comment: "Awesome and Very good quality meat we get at this place. Home delivery service is also very good.",
    date: '2024-06-09',
  },
  {
    id: '5',
    name: 'Venkanna Chebelli',
    rating: 5,
    comment: 'Very good service and good hygiene',
    date: '2024-06-10',
  },
  {
    id: '6',
    name: 'Anuhya Alapakha',
    rating: 5,
    comment: 'Very good quality and service and hygiene',
    date: '2024-06-10',
  },
  {
    id: '7',
    name: 'jami gangadhar',
    rating: 5,
    comment: 'Super hygienic and fresh meat from Anvi Fresh mart highly recommended',
    date: '2024-06-10',
  },
  {
    id: '8',
    name: 'Gunti Nagendra',
    rating: 5,
    comment: 'Good quality of meat and free home delivery',
    date: '2024-06-10',
  },
  {
    id: '9',
    name: 'Tejaswini Cheekoti',
    rating: 5,
    comment: 'Fresh meat supply for customers best packing and in time delivery',
    date: '2024-06-10',
  },
  {
    id: '10',
    name: 'srikanth s',
    rating: 5,
    comment: "I've been a customer of ANVI since they first opened, and I usually order chicken and mutton from them. From the beginning, they've consistently maintained high-quality standards, which I really appreciate. Before ANVI, weekends were spent searching for good meat stores, waiting in long lines, and taking time out of my day just to buy fresh meat. Now, with ANVI's timely home delivery, that hassle is completely gone. The meat is always fresh, neatly packed, and delivered right on time, which has been a huge time-saver for me. I can now focus on other things without compromising on the quality of what I cook. I would definitely recommend ANVI to anyone looking for top-quality meat delivered reliably at their doorstep.",
    date: '2024-06-10',
  },
  {
    id: '11',
    name: 'Devi vara prasad Panasa',
    rating: 5,
    comment: "Fresh Meat, Groceries & More – Excellent Service! I'm a regular customer of Anvi Fresh Mart Pvt Ltd, and I've been consistently impressed with their quality and service. They offer fresh meat like Naatu Kodi, mutton, prawns, and also have eggs, groceries, and even non-veg pickles, which are really tasty! Their monthly subscription options and home delivery in selected areas make shopping so convenient. It's truly a one-stop destination for quality non-veg and daily essentials. Highly recommend for anyone looking for fresh and reliable meat products!",
    date: '2024-06-10',
  },
]; 