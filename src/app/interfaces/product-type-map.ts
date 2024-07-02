// Define the interface for the mapping
export interface ProductTypeMap {
    [key: number]: string;
  }
  
  // Create the mapping object
  export const PRODUCT_TYPE_MAP: ProductTypeMap = {
    1: 'fruits',
    2: 'vegetables',
    3: 'dairy',
    // Add more mappings as needed
  };
  