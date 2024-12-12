interface IAddress {
 
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    lat: string;
    lon: string;
    display_name: string;
    address: {
      county: string;
      state: string;
      country: string;
      country_code: string;
    };

    boundingbox: string[];
    
  }
  export default IAddress;