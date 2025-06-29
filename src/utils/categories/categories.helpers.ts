import chicken from '../../assets/categories/chicken.jpg';
import mutton from '../../assets/categories/mutton.jpg'; 
import seaFood from '../../assets/productIcons/seafoodIcon.jpg';
import natukodi from '../../assets/productIcons/CountryChickenIcon.jpg';
import kadaknath from '../../assets/productIcons/kadaknathIcon.jpg';
import turkey from '../../assets/productIcons/turkeyIcon.jpg';
import quail from '../../assets/productIcons/quilBirdIcon.jpg';
import eggs from '../../assets/productIcons/EggsIcon.jpg';
import roastedChicken from '../../assets/productIcons/roastedChicken.jpg';
import nonVegPickles from '../../assets/productIcons/nonvegPickleIcon.jpg';
import coconutWater from '../../assets/productIcons/coconutIcon.jpg';

export const categories = [
  { label: 'Chicken', value: 'chicken', imageSrc: chicken, description: 'Fresh chicken - bone & boneless cuts' },
  { label: 'Mutton', value: 'mutton', imageSrc: mutton, description: 'Telangana or Andhra mekapothu - bone & boneless' },
  { label: 'Natu Kodi', value: 'natu-kodi', imageSrc: natukodi, description: 'Free-range country chicken' },
  { label: 'Kadaknath', value: 'kadaknath', imageSrc: kadaknath, description: 'Premium black chicken variety' },
  { label: 'Turkey', value: 'turkey', imageSrc: turkey, description: 'Fresh turkey meat' },
  { label: 'Quail Birds', value: 'quail-birds', imageSrc: quail, description: 'Fresh quail meat' },
  { label: 'Sea Food', value: 'seafood', imageSrc: seaFood, description: 'Fish, prawns, crabs & more' },
  { label: 'Eggs', value: 'eggs', imageSrc: eggs, description: 'White eggs, natu kodi eggs, quail eggs' },
  { label: 'Roasted Chicken', value: 'roasted-chicken', imageSrc: roastedChicken, description: 'Ready to eat roasted chicken' },
  { label: 'Non-Veg Pickles', value: 'nonveg-pickles', imageSrc: nonVegPickles, description: 'Traditional meat pickles' },
  { label: 'Coconut Water', value: 'coconut-water', imageSrc: coconutWater, description: 'Fresh coconut water' },
];

export interface Category {
  label: string;
  value: string;
  imageSrc: string;
  description: string;
}

export const getCategoryByValue = (value: string): Category | undefined => {
  return categories.find(cat => cat.value === value);
};


