import { Product, CategoryData, Order } from './types'

export const CATEGORY_DATA: Record<string, CategoryData> = {
  'Tools & Equipment': {
    id: 'tools-equipment',
    title: 'Tools & Equipment',
    image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800',
    subcategories: [
      { title: 'Power Tools', items: ['Drills', 'Saws', 'Kits & Twinpacks', 'Multi Tools', 'Sanders', 'Angle Grinders', 'Impact Drivers', 'Nail Guns', 'Batteries & Chargers', 'Electric ScrewDrivers', 'Planers', 'Glue & Heat Guns'] },
      { title: 'Hand Tools', items: ['Tool Kits', 'Measures & Levels', 'Screwdrivers & Keys', 'Spanners & Socket Sets', 'Cutting Tools', 'Woodworking Tools', 'Soldering & Brazing', 'Demolition', 'Hand Saws', 'Plastering Tools', 'Cartridge & Tape Guns', 'Pliers'] },
      { title: 'Equipment', items: ['Tool Storage', 'Step Ladders', 'Extension Ladders', 'Loft Ladder & Kits', 'Work Platforms & Towers', 'Workbenches & Tresles', 'Cement Mixers', 'Tarpaulins & Sheets', 'Automotive', 'Vacuum Cleaners', 'Trolleys & Carts', 'Torches & Worklights'] },
      { title: 'Safety & Workwear', items: ['Work Trousers', 'Safety Boots', 'Workwear', 'Safety Footwear', 'Work Hoodies', 'Work Jackets', 'Boiler Suits', 'Waterproof Workwear', 'Work Hats', 'Hi Vis Workwear', 'PPE', 'Safety Vests'] },
      { title: 'Power Tool Accessories', items: ['Drill Bits', 'Mixed Drill Bit Sets', 'Masonry Drill Bits', 'Sawing & Blades', 'Sanding', 'Circular Saw Blades', 'Sanding Sheets', 'Multi Tool Accessories', 'Angle Grinder Discs', 'Cleaning & Preparation', 'Chucks & Keys'] },
      { title: 'Tool Hire', items: ['Saw Hire', 'Pressure Washer Hire', 'Wacker Plate Hire', 'Brushcutter Hire', 'Hedge Trimmer Hire', 'Drill Hire', 'Breaker Hire', 'Floor Sander Hire', 'Cement Mixer Hire', 'Carpet Cleaner Hire', 'Ladder Hire', 'Dehumidifier Hire'] },
    ],
  },
  'Building Materials & Hardware': {
    id: 'building-materials-hardware',
    title: 'Building Materials & Hardware',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800',
    subcategories: [
      { title: 'Timber & Joinery', items: ['Timber', 'Planed Timber', 'Wall Panelling Kits', 'Wood Trims', 'Mouldings', 'Cladding', 'Skirting Board', 'Scaffold Boards', 'Floorboards', 'Architrave', 'Stairs & Stair Parts', 'Loft Boards'] },
      { title: 'Sheet Wood', items: ['Plywood', 'MDF', 'Furniture Boards', 'OSB', 'HardBoard', 'ChipBoard'] },
      { title: 'Building Supplies', items: ['Aggregates', 'Plasterboard', 'Plastering Supplies', 'Insulation', 'Bricks & Blocks', 'Cements & Additives', 'Roofing Supplies', 'Guttering', 'Drainage', 'Glazing Sheets', 'Access Panels', 'Ventilation'] },
      { title: 'Hardware', items: ['Door Handles', 'All Handles & Knobs', 'Screws', 'Fixing & Wall Plugs', 'Brackets', 'Bolts, Nuts & Washers', 'Door Locks & Latches', 'Hinges', 'Letter Boxes', 'Hooks', 'Wardrobe Rails', 'Furniture Legs'] },
      { title: 'Doors', items: ['Internal Doors', 'External Doors', 'Front Door', 'Sliding Doors', 'White Internal Door', 'Oak Doors', 'Louvre Doors', 'Door Locks & Latches', 'Door Canopies', 'Door Frames & Fittings', 'Loft Hatches', 'Garage Doors'] },
      { title: 'External Windows', items: ['Fitted Windows & Doors', 'Timber Windows', 'uPVC Windows', 'Double Glazed Windows', 'Velux Windows', 'Window Sills', 'Window Fittings', 'Window Furniture', 'Roof Lanterns'] },
    ],
  },
  'Flooring & Tiling': {
    id: 'flooring-tiling',
    title: 'Flooring & Tiling',
    image: 'https://images.unsplash.com/photo-1581858726768-fdff21ac91a4?auto=format&fit=crop&w=800',
    subcategories: [
      { title: 'Flooring', items: ['Laminate Flooring', 'Luxury Vinyl Click Flooring', 'Sheet Vinyl', 'Vinyl Flooring', 'Self Adhesive Vinyl Tiles', 'Engineered Wood Flooring', 'Carpet Tiles', 'Composite Flooring', 'Flooring Mats', 'Flooring Samples'] },
      { title: 'Scotias & Floor Trims', items: ['Underlay', 'Scotias & Floor Trims', 'Thresholds & Reducers', 'Flooring Adhesive', 'Flooring Tools', 'Gripper Rods', 'Underfloor Heating'] },
      { title: 'Flooring Trends', items: ['Herringbone Flooring', 'Grey Laminate Flooring', 'Bathroom & Kitchen Vinyl', 'Natural Laminate Flooring', 'Water Resistant Laminate', 'Oak Laminate Flooring', 'Brown Laminate Flooring', 'White Laminate Flooring', 'Black Laminate Flooring', 'New In Flooring'] },
      { title: 'Tiles', items: ['Wall Tiles', 'Floor Tiles', 'Bathroom Tiles', 'Kitchen Tiles', 'Mosaic Tiles', 'Outdoor Tiles', 'New In Tiling'] },
      { title: 'Tiling Tools', items: ['Adhesive', 'Grout', 'Tile Trims', 'Tile Cutters', 'Tile Spacers', 'Grouting Tools', 'Tiling Trowels', 'Sealant', 'Tile Kits', 'Tile Scribes'] },
      { title: 'Tiling Trends', items: ['Brick Effect Tiles', 'Large Floor Tiles', 'Grey Wall Tiles', 'White Wall Tiles', 'White Bathroom Tiles', 'Green Wall Tiles', 'Porcelain Tiles', 'Metro Tiles'] },
    ],
  },
  'Kitchen & Dining': {
    id: 'kitchens',
    title: 'Kitchen & Dining',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800',
    subcategories: [
      { title: 'Fitted Kitchens', items: ['Browse Ranges', 'Book An Appointment', 'Online Design Tool', 'Installation', 'Kitchen Finance', 'Kitchen Ideas & Advice', 'Green Kitchens', 'Blue Kitchens', 'Grey Kitchens', 'White Kitchens', 'Luxury Kitchen Ideas'] },
      { title: 'Kitchen Cabinets & Doors', items: ['Kitchen Doors', 'Kitchen Units', 'Complete Kitchen Units', 'Kitchen Cabinet Storage', 'Plinths & Panels', 'Drawer Boxes', 'Kitchen Storage'] },
      { title: 'Kitchen Worktops', items: ['Laminate Worktops', 'Solid Wood WorkTops', 'Acrylic Worktops', 'Bespoke Kitchen Worktops', 'Kitchen SplashBacks', 'Kitchen Upstands', 'Edging & Strips', 'Worktop Installation'] },
      { title: 'Kitchen Taps', items: ['Mixer Taps', 'Pull Out Taps', 'Boiling Water Taps', 'Filter Taps', 'Pillar Taps', 'Black Taps', 'Silver Taps', 'Gold Taps'] },
      { title: 'Kitchen Sinks', items: ['1 Bowl Sinks', '1.5 Bowl Sinks', '2 Bowl Sinks', 'Stainless Bowl Sinks', 'Composite Sinks', 'Ceramic Sinks', 'Resin Sinks', 'Undermount Sinks', 'Black Sinks', 'Grey Sinks'] },
      { title: 'Kitchen Appliances', items: ['Ovens', 'Cookers', 'Hobs', 'Cooker Hoods', 'Fridges & Freezers', 'Laundry Appliances', 'Dishwashers', 'Microwaves', 'Air Fryers', 'Coffee Machines'] },
    ],
  },
  'Bathroom & Ensuites': {
    id: 'bathrooms',
    title: 'Bathroom & Ensuites',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800',
    subcategories: [
      { title: 'Bathroom Furniture', items: ['Vanity Units', 'Bathroom Cabinets', 'Bathroom Suites', 'Bathroom Mirrors', 'Fitted Bathroom Furniture', 'Bathroom Storage', 'Towel Radiators', 'Bathroom Furniture Sets', 'Accessible Bathrooms', 'Book An Appointment'] },
      { title: 'Showering', items: ['Shower Enclosures', 'Shower Doors', 'Shower Trays', 'Mixer Showers', 'Electric Showers', 'Bathroom Wall Panels', 'Shower Kits', 'Shower Seals', 'Shower Heads', 'Wet Rooms', 'Digital Showers'] },
      { title: 'Toilets', items: ['Close-Coupled Toilets', 'Back To Wall Toilets', 'Toilet Seats', 'Soft Close Toilet Seats', 'Wall Hung Toilets', 'High & Low Level Toilets', 'Toilet Flushes', 'Toilet Cisterns', 'Toilet Spares', 'Bidets'] },
      { title: 'Baths', items: ['Shower Baths', 'Freestanding Baths', 'Straight Baths', 'Bath Panels', 'Bath Screens', 'Walk-In Baths', 'Corner Baths', 'Whirlpool Baths', 'Bath Taps', 'Bath Shower Mixer Taps', 'Bath Mixer Taps'] },
      { title: 'Basins', items: ['Counter Top Basins', 'Cloakroom Basins', 'Pedestal Basins', 'Wall Hung Basins', 'Semi Recessed Basins', 'Corner Basins', 'Basin Taps', 'Basin Mixer Taps', 'Black Basin Taps'] },
      { title: 'Bathroom Accessories', items: ['Bathroom Shelves', 'Shower Caddies', 'Toilet Roll Holders', 'Towel Rails & Rings', 'Shower Curtain', 'Soap Dishes & Dispensers', 'Grab Rails', 'Bath & Shower Mats', 'Bathroom Hooks', 'Bathroom Bins'] },
    ],
  },
  'Home Interiors & Furniture': {
    id: 'home-interiors-furniture',
    title: 'Home Interiors & Furniture',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800',
    subcategories: [
      { title: 'Furniture', items: ['Wardrobes', 'Beds', 'Chest Of Drawers', 'Fitted Wardrobe Ranges', 'Sliding Wardrobe Doors', 'Bedroom Furniture', 'Sofas', 'Chairs', 'Dining Sets', 'TV Units', 'Tables', 'Desks'] },
      { title: 'Home Furnishing', items: ['Blinds', 'Curtains', 'Curtain Poles', 'Curtain Tracks', 'Rugs', 'Bedding', 'Cushions', 'Throws & Blankets', 'Door Mats', 'How to measure for blinds'] },
      { title: 'Home Accessories', items: ['Wall Art', 'Mirrors', 'Artificial Flowers', 'Picture Frames', 'Bottles, Vases & Jars', 'Ornaments', 'Clocks', 'Candles', 'Candle Holders', 'Crafts & Books'] },
      { title: 'Storage & Shelving', items: ['Storage Boxes', 'Storage Cabinets', 'Shelves', 'Shelving Units', 'Cube Shelves', 'Floating Shelves', 'Shoe Racks', 'Garage Storage', 'Clothes Racks & Rails', 'Shelf Brackets'] },
      { title: 'Household Cleaning', items: ['Laundry & Ironing', 'Vacuum Cleaners', 'Bins', 'Washing Lines', 'Clothes Airers', 'Laundry Baskets', 'Cleaning Products', 'Irons', 'Ironing Board', 'Steam Cleaners'] },
      { title: 'Cooking & Dining', items: ['Kitchen Storage & Accessories', 'Tableware', 'Cookware', 'Kitchen Utensils', 'Drinkware', 'Bakeware', 'Pans', 'Mugs & Cups', 'Cutlery', 'Kitchen Scales', 'Dinner Sets'] },
    ],
  },
  'Lighting & Electrical': {
    id: 'lighting-electrical',
    title: 'Lighting & Electrical',
    image: 'https://images.unsplash.com/photo-1513506003013-d3c2611e0b58?auto=format&fit=crop&w=800',
    subcategories: [
      { title: 'Indoor Lights', items: ['Ceiling Lights', 'Light Bulbs', 'Table Lamps', 'Wall Lights', 'Light Shades', 'Floor Lamps', 'Spotlight & Downlight', 'Pendant Lights', 'Light Fixtures & Fittings', 'Chandeliers'] },
      { title: 'Outdoor Lights', items: ['Outdoor Wall Lights', 'Security Lights', 'Outdoor Lanterns', 'Solar String Lights', 'Solar Security Lights', 'Decking Lights', 'Solar Wall Lights', 'String Lights', 'Ground Lights', 'Post Lights'] },
      { title: 'Electronics', items: ['TVs', 'TV Aerials', 'TV Remote Controls', 'HDMI Cables', 'Networking & Wi-Fi', 'Wi-Fi Adapters', 'Ethernet Cables', 'Power Cables', 'Speakers', 'Home Cinema'] },
      { title: 'Electrical', items: ['Wiring & Cable Management', 'Cable', 'Cable Connectors', 'Junction Boxes', 'Back Boxes', 'Extension Leads', 'Cable Reels', 'Plug Adaptors', 'Switches & Sockets', 'Doorbells'] },
      { title: 'Security & Safety', items: ['Security Cameras', 'Burglar Alarms', 'Smoke Alarms', 'Carbon Monoxide Alarms', 'Door Locks', 'Safes', 'Key Cabinets', 'Bicycle Locks', 'Fire Safety', 'PadLocks', 'Safety Signs'] },
      { title: 'Smart Home', items: ['Smart Indoor Lighting', 'Smart Light Bulbs', 'Smart Switches', 'Smart Sockets', 'Smart Plug Adaptors', 'Smart Thermostats', 'Smart DoorBells', 'Smart Locks', 'Smart Kitchen Appliances', 'Smart TVs'] },
    ],
  },
  'Heating & Plumbing': {
    id: 'heating-plumbing',
    title: 'Heating & Plumbing',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800',
    subcategories: [
      { title: 'Radiators', items: ['Double Panel Radiators', 'Towel Radiators', 'Column Radiators', 'Vertical Radiators', 'Oil Filled Radiators', 'Radiator Valves', 'Single Panel Radiators', 'Cast Iron Radiators', 'Radiator Covers'] },
      { title: 'Fires, Stoves & Heaters', items: ['Electric Fire', 'Stoves', 'Heaters', 'Fireplace Suites', 'Gas Fires', 'Fire Surrounds', 'Logs', 'Halogen Heaters', 'Inset Fires', 'Gas Bottle Refills'] },
      { title: 'Central Heating', items: ['Thermostats', 'Radiator Valves', 'Radiator Covers', 'Radiator Pipe Covers', 'Underfloor Heating', 'Radiator Foil', 'Radiator Accessories', 'Water Heaters', 'Boilers', 'Central Heating Pumps'] },
      { title: 'Plumbing', items: ['Pipes', 'Pipe Fittings', 'Wastes & Traps', 'Pipe Connectors', 'Valves', 'Taps', 'Bathroom Fittings', 'Plumbing Tools', 'Pipe Insulation', 'Hose Clips', 'Elbows', 'Toilet Cisterns'] },
      { title: 'Air Treatment', items: ['Dehumidifiers', 'Extractor Fans', 'Bathroom Extractor Fans', 'Humidifiers', 'Air Quality Sensors', 'Air Purifiers', 'Vents', 'Fan Heaters'] },
      { title: 'Cooling', items: ['Fans', 'Air Conditioners', 'Tower Fans', 'Pedestal Fans', 'Ceiling Fans', 'Desk Fans', 'Portable Fans', 'Air Coolers'] },
    ],
  },
  'Painting & Decorating': {
    id: 'painting-decorating',
    title: 'Painting & Decorating',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800',
    subcategories: [
      { title: 'Interior Paint', items: ['Emulsion Paint', 'Paint Mixing', 'Metal & Wood Paint', 'Bathroom & Kitchen Paint', 'Damp & Anti-Mould Paint', 'Furniture Paint', 'Tile Paint', 'Primers & Undercoats', 'Paint Samples', 'Radiator Paint', 'Spray Paint', 'Floor Paint'] },
      { title: 'Exterior Paint', items: ['Metal & Wood Paint', 'Paint Mixing', 'Fence & Shed Paint', 'Masonry Paint', 'Door Paint', 'Decking Paint'] },
      { title: 'WoodCare', items: ['Wood Stain', 'Interior Woodcare', 'Wood Varnish', 'Exterior Woodcare', 'Wood Preservatives', 'Wood Oil', 'Wood Polish', 'Wood Wax'] },
      { title: 'Wallpaper & Coverings', items: ['Wallpaper', 'Decorative Wall Panels', 'Murals', 'Panelled Wallpaper', 'Wall Stickers', 'Blue Wallpaper', 'Grey Wallpaper', 'Wallpaper tools', 'Lining Paper', 'Green Wallpaper', 'Wallpaper Paste'] },
      { title: 'Decorating Tools', items: ['Paint Rollers', 'Paint Brushes', 'Fillers', 'Dust Sheets', 'Sealants', 'Paint Pads', 'Wallpaper Steamers', 'Tapes', 'Paint Sprayers', 'Sandpaper', 'Paint Stripper', 'Glue & Adhesives'] },
      { title: 'Popular Paint', items: ['Dulux', 'Dulux Trade', 'Valspar Paint Mixing', 'Farrow & Ball', 'Lick', 'GoodHome', 'Rust-Oleum', 'Laura Ashley', 'Leyland Trade', 'Sandtex', 'Ronseal', 'V33', 'Cuprinol'] },
    ],
  },
  'Garden & Landscaping': {
    id: 'garden-landscaping',
    title: 'Garden & Landscaping',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800',
    subcategories: [
      { title: 'Gardening', items: ['Plant Pots', 'Houseplants', 'Compost, Top Soil & Bark', 'Plants, Seeds & Bulbs', 'Weed Killers', 'Water Butts', 'Water Features & Fountains', 'Lawn Turf', 'Grass Seed', 'Lawn & Plant Care', 'Fertilisers & Plant Food'] },
      { title: 'Garden Tools', items: ['Lawnmowers', 'Trimmers', 'Pressure Washers', 'Leaf Blowers', 'Chainsaws', 'Garden Power Tools', 'Wheelbarrows', 'Cutting & Pruning Tools', 'Digging & Planting Tools', 'Weeding & Clearing Tools', 'Garden Hand Tools'] },
      { title: 'Outdoor Living', items: ['All Garden Furniture', 'Garden Furniture Sets', 'Garden Furniture Covers', 'BBQs & Accessories', 'Fire Pits', 'Garden Seating', 'Hot Tubs & Saunas', 'Parasols', 'Garden Tables', 'Outdoor Lights', 'Chimineas'] },
      { title: 'Landscaping', items: ['Fencing', 'Paving & Walling', 'Fence Panels', 'Fence Posts', 'Garden Trellis & Screening', 'Decking', 'Aggregates', 'Garden Gates', 'Picket Fences', 'Decking Boards', 'Garden Stepping Stones'] },
      { title: 'Garden Building', items: ['Sheds', 'Garden Storage', 'Summerhouse', 'Greenhouse', 'Garden Rooms', 'Plastic Sheds', 'Gazebos', 'Pergolas', 'Log Cabins', 'Shed Bases', 'Awnings', 'Garden Arches'] },
      { title: 'Leisure & Animal Supplies', items: ['Outdoor Play', 'Animal & Pet Care', 'Bird & Wildlife Supplies', 'Camping', 'Cycling', 'Indoor Play', 'Fitness & Training', 'Toys & Games', 'Pools & Maintenance'] },
    ],
  },
  'Outdoor Furniture': {
    id: 'outdoor-furniture',
    title: 'Outdoor Furniture',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800',
    subcategories: [
      { title: 'Furniture Sets', items: ['Dining Sets', 'Lounge Sets', 'Bistro Sets', 'Balcony Sets'] },
      { title: 'Seating', items: ['Garden Chairs', 'Sun Loungers', 'Benches', 'Swing Seats'] },
      { title: 'Outdoor Heating', items: ['Fire Pits', 'Chimineas', 'Patio Heaters', 'Table Heaters'] },
      { title: 'Accessories', items: ['Parasols', 'Furniture Covers', 'Outdoor Cushions', 'Outdoor Rugs'] },
    ],
  },
  'Pre-Build Modular': {
    id: 'modular',
    title: 'Pre-Build Modular',
    image: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=800',
    subcategories: [
      { title: 'Residential Pods', items: ['Bathroom Pods', 'Utility Pods', 'Kitchen Pods'] },
      { title: 'Commercial Pods', items: ['Mobile Offices', 'Mobile Meeting Rooms', 'Mobile Showrooms'] },
      { title: 'Outdoor Pods', items: ['Garden Offices', 'Glamping Pods', 'Sauna Pods'] },
      { title: 'Accessories', items: ['Pod Foundations', 'Pod Cladding', 'Pod Interiors'] },
    ],
  },
  'Offers & Sales': {
    id: 'offers-sales',
    title: 'Offers & Sales',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800',
    subcategories: [
      { title: 'Current Offers', items: ['3 For 2 Deals', 'Half Price Sale', 'Clearance', 'Bundle Deals'] },
      { title: 'Category Deals', items: ['Tool Deals', 'Paint Deals', 'Garden Deals', 'Bathroom Deals', 'Kitchen Deals'] },
    ],
  },
}

export const CATEGORIES = Object.keys(CATEGORY_DATA)

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Modern Accent Chair', price: 129.99, category: 'Home Interiors & Furniture', rating: 4.5, reviews: 128, image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800', description: 'A sleek, modern accent chair perfect for any living room. Upholstered in premium fabric.', features: ['Solid wood legs', 'Premium upholstery', 'Ergonomic design'] },
  { id: '2', name: 'Industrial Pendant Light', price: 89.50, category: 'Lighting & Electrical', rating: 4.8, reviews: 85, image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=800', description: 'Matte black finish pendant light suitable for kitchen islands and dining areas.', features: ['Adjustable height', 'LED compatible', 'Matte finish'] },
  { id: '3', name: 'Minimalist Desk Organizer', price: 24.99, category: 'Home Interiors & Furniture', rating: 4.2, reviews: 45, image: 'https://images.unsplash.com/photo-1532323544230-ac8d630685ad?auto=format&fit=crop&w=800', description: 'Keep your workspace tidy with this elegant organizer made from sustainable materials.', features: ['Sustainable wood', 'Multiple compartments', 'Non-slip base'] },
  { id: '4', name: 'Ceramic Plant Pot Set', price: 45.00, category: 'Garden & Landscaping', rating: 4.9, reviews: 210, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800', description: 'Set of 3 ceramic pots with drainage holes. Perfect for indoor succulents.', features: ['Drainage holes', 'Three sizes', 'Glazed finish'] },
  { id: '5', name: 'Smart Thermostat', price: 199.00, category: 'Lighting & Electrical', rating: 4.6, reviews: 340, image: 'https://images.unsplash.com/photo-1563461660947-507ef49e9c47?auto=format&fit=crop&w=800', description: 'Control your home temperature from anywhere with this Wi-Fi enabled smart thermostat.', features: ['Wi-Fi enabled', 'Energy saving', 'Touch screen'] },
  { id: '6', name: 'Hardwood Flooring Sample', price: 5.00, category: 'Flooring & Tiling', rating: 4.0, reviews: 12, image: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=800', description: 'Oak hardwood flooring sample to help you decide on your renovation.', features: ['Real oak', 'Durable finish', 'Easy installation system'] },
  { id: '7', name: 'Cordless Drill Kit', price: 149.99, category: 'Tools & Equipment', rating: 4.7, reviews: 890, image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800', description: 'High-performance cordless drill with two batteries and a carrying case.', features: ['18V Power', '2 Batteries included', 'LED work light'] },
  { id: '8', name: 'Velvet Throw Pillow', price: 35.00, category: 'Home Interiors & Furniture', rating: 4.4, reviews: 67, image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?auto=format&fit=crop&w=800', description: 'Luxurious velvet throw pillow to add a pop of color to your sofa.', features: ['100% Cotton Velvet', 'Hidden zipper', 'Hypoallergenic fill'] },
  { id: '9', name: 'Mid-Century Modern Sofa', price: 899.00, category: 'Home Interiors & Furniture', rating: 4.8, reviews: 42, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800', description: 'Classic mid-century design with tapered legs and tufted back.', features: ['Solid wood frame', 'High-density foam', 'Stain-resistant fabric'] },
  { id: '10', name: 'Brass Floor Lamp', price: 150.00, category: 'Lighting & Electrical', rating: 4.3, reviews: 29, image: 'https://images.unsplash.com/photo-1507473888900-52ea50812599?auto=format&fit=crop&w=800', description: 'Elegant brass floor lamp that adds warmth to any reading corner.', features: ['Adjustable neck', 'Foot switch', 'Heavy base'] },
  { id: '11', name: 'Woven Storage Basket', price: 45.00, category: 'Home Interiors & Furniture', rating: 4.7, reviews: 112, image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800', description: 'Hand-woven seagrass basket perfect for blankets or toys.', features: ['Natural material', 'Collapsible', 'Carrying handles'] },
  { id: '12', name: 'Garden Pruning Shears', price: 22.99, category: 'Garden & Landscaping', rating: 4.8, reviews: 356, image: 'https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?auto=format&fit=crop&w=800', description: 'Sharp and durable shears for keeping your garden tidy.', features: ['Carbon steel blades', 'Ergonomic grip', 'Safety lock'] },
  { id: '13', name: 'Smart Doorbell', price: 179.99, category: 'Lighting & Electrical', rating: 4.5, reviews: 89, image: 'https://images.unsplash.com/photo-1558002038-1091a1661116?auto=format&fit=crop&w=800', description: 'See who is at your door from your smartphone with HD video.', features: ['1080p HD Video', 'Two-way talk', 'Night vision'] },
  { id: '14', name: 'Wool Rug', price: 250.00, category: 'Home Interiors & Furniture', rating: 4.6, reviews: 24, image: 'https://images.unsplash.com/photo-1575414003591-ece8d0416c7a?auto=format&fit=crop&w=800', description: 'Soft, hand-tufted wool rug with a geometric pattern.', features: ['100% Wool', 'Cotton backing', 'Hand-tufted'] },
  { id: '15', name: 'Precision Screwdriver Set', price: 19.99, category: 'Tools & Equipment', rating: 4.4, reviews: 450, image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=800', description: 'Complete set for electronics and small appliances.', features: ['Magnetic tips', 'Rotating cap', 'Hard case included'] },
  { id: '16', name: 'Abstract Wall Art', price: 75.00, category: 'Home Interiors & Furniture', rating: 4.9, reviews: 18, image: 'https://images.unsplash.com/photo-1582650774302-8a9d164d1c5d?auto=format&fit=crop&w=800', description: 'Large canvas print featuring soothing abstract shapes.', features: ['Canvas print', 'Wooden frame', 'Ready to hang'] },
  { id: '17', name: 'Outdoor Patio Set', price: 499.00, category: 'Outdoor Furniture', rating: 4.7, reviews: 56, image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=800', description: 'All-weather rattan bistro set with cushions.', features: ['Weather resistant', 'Washable cushions', 'Tempered glass top'] },
  { id: '18', name: 'Kitchen Stand Mixer', price: 299.00, category: 'Kitchen & Dining', rating: 4.9, reviews: 1200, image: 'https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?auto=format&fit=crop&w=800', description: 'Powerful mixer for baking enthusiasts.', features: ['10 Speeds', 'Tilt-head design', 'Includes attachments'] },
  { id: '19', name: 'Bamboo Shoe Rack', price: 34.99, category: 'Home Interiors & Furniture', rating: 4.3, reviews: 210, image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=800', description: 'Eco-friendly bamboo rack for organizing entryways.', features: ['Sustainable bamboo', 'Stackable', 'Easy assembly'] },
  { id: '20', name: 'Marble Coffee Table', price: 220.00, category: 'Home Interiors & Furniture', rating: 4.6, reviews: 34, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=800', description: 'Luxurious real marble top coffee table with gold legs.', features: ['Real marble', 'Metal frame', 'Compact design'] },
  { id: '21', name: 'Premium Oak Internal Door', price: 145.00, category: 'Building Materials & Hardware', rating: 4.8, reviews: 65, image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800', description: 'Solid oak veneer internal door with a modern horizontal panel design.', features: ['Solid core', 'Oak veneer', 'Unfinished'] },
  { id: '22', name: 'Greenwich Porcelain Kitchen', price: 4500.00, category: 'Kitchen & Dining', rating: 4.8, reviews: 40, image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200', description: 'Introduce soothing shades with Greenwich Porcelain, slab style and matt finish.', features: ['Slab style', 'Matt finish', 'Neutral porcelain shade'] },
  { id: '23', name: 'Freestanding Oval Bath', price: 699.00, category: 'Bathroom & Ensuites', rating: 4.9, reviews: 112, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800', description: 'Luxurious freestanding acrylic bath, perfect for a modern bathroom centerpiece.', features: ['High-quality acrylic', 'Includes waste', 'Ergonomic design'] },
  { id: '24', name: 'Matt Emulsion Paint - Pure Brilliant White', price: 22.00, category: 'Painting & Decorating', rating: 4.7, reviews: 840, image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800', description: 'High-opacity matt emulsion paint for walls and ceilings. 5L tub.', features: ['Excellent coverage', 'Wipeable', 'Low VOC'] },
  { id: '25', name: 'Double Panel Radiator', price: 85.00, category: 'Heating & Plumbing', rating: 4.6, reviews: 230, image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800', description: 'High heat output double panel convector radiator. White finish.', features: ['High BTU output', 'Includes brackets', '10-year guarantee'] },
  { id: '27', name: 'Garden Office Pod', price: 8500.00, category: 'Pre-Build Modular', rating: 5.0, reviews: 14, image: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=800', description: 'Fully insulated modular garden office pod. Includes electrical fittings and double glazing.', features: ['Fully insulated', 'Plug and play electrics', 'Quick installation'] },
  { id: '28', name: 'Makita 18V Combi Drill (Clearance)', price: 99.00, category: 'Offers & Sales', rating: 4.8, reviews: 450, image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800', description: 'Clearance offer on this reliable 18V combi drill. Bare unit only.', features: ['2-speed gearbox', 'Keyless chuck', 'Ergonomic grip'] },
]

export const CLIENTS = [
  { name: 'TechCorp', logo: 'https://placehold.co/200x100/ffffff/302D2A?text=TechCorp' },
  { name: 'GreenSpace', logo: 'https://placehold.co/200x100/ffffff/302D2A?text=GreenSpace' },
  { name: 'UrbanLiving', logo: 'https://placehold.co/200x100/ffffff/302D2A?text=UrbanLiving' },
  { name: 'BuildRight', logo: 'https://placehold.co/200x100/ffffff/302D2A?text=BuildRight' },
  { name: 'DesignStudio', logo: 'https://placehold.co/200x100/ffffff/302D2A?text=DesignStudio' },
  { name: 'EcoHomes', logo: 'https://placehold.co/200x100/ffffff/302D2A?text=EcoHomes' },
  { name: 'ModernSpaces', logo: 'https://placehold.co/200x100/ffffff/302D2A?text=ModernSpaces' },
  { name: 'FutureTech', logo: 'https://placehold.co/200x100/ffffff/302D2A?text=FutureTech' },
]

export const PARTNERS = [
  { name: 'LogisticsPro', logo: 'https://placehold.co/200x100/ffffff/302D2A?text=LogisticsPro' },
  { name: 'SecurePay', logo: 'https://placehold.co/200x100/ffffff/302D2A?text=SecurePay' },
  { name: 'GlobalTrade', logo: 'https://placehold.co/200x100/ffffff/302D2A?text=GlobalTrade' },
  { name: 'QualityFirst', logo: 'https://placehold.co/200x100/ffffff/302D2A?text=QualityFirst' },
  { name: 'FastTrack', logo: 'https://placehold.co/200x100/ffffff/302D2A?text=FastTrack' },
  { name: 'ProBuild', logo: 'https://placehold.co/200x100/ffffff/302D2A?text=ProBuild' },
  { name: 'SafeTools', logo: 'https://placehold.co/200x100/ffffff/302D2A?text=SafeTools' },
  { name: 'EcoSupply', logo: 'https://placehold.co/200x100/ffffff/302D2A?text=EcoSupply' },
]

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-2026-001',
    date: '2026-03-25',
    status: 'Delivered',
    total: 254.97,
    items: [{ ...MOCK_PRODUCTS[0], quantity: 1 }, { ...MOCK_PRODUCTS[1], quantity: 1 }],
    shippingAddress: '123 Main St, London, SW1A 1AA',
  },
  {
    id: 'ORD-2026-002',
    date: '2026-04-10',
    status: 'Shipped',
    total: 149.99,
    items: [{ ...MOCK_PRODUCTS[6], quantity: 1 }],
    shippingAddress: '45 Park Avenue, Manchester, M1 1AB',
  },
]

export const KITCHEN_FEATURES = [
  { title: 'Slab style', description: 'A flat, smooth door that is easy to clean and provides a modern look.' },
  { title: 'Matt finish', description: 'A soft, non-reflective surface that hides fingerprints and smudges.' },
  { title: '15mm thick doors', description: 'Durable and sturdy construction for long-lasting use.' },
  { title: 'Integrated appliances', description: 'Seamlessly hide your appliances behind matching cabinet doors.' },
  { title: 'Soft-close hinges', description: 'Quiet and smooth closing for all cabinet doors and drawers.' },
  { title: 'Sustainable materials', description: 'Made from FSC certified wood sources.' },
]

export const KITCHEN_SPECS = [
  { label: 'Style', value: 'Modern Slab' },
  { label: 'Finish', value: 'Matt' },
  { label: 'Door Thickness', value: '15mm' },
  { label: 'Material', value: 'MFC' },
  { label: 'Edge Banding', value: '1mm ABS' },
  { label: 'Guarantee', value: '25 Year Cabinet Guarantee' },
]

export const COMPLETE_THE_LOOK = [
  { name: 'Lamona Chrome Tap', price: 89.00, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400' },
  { name: 'White Quartz Worktop', price: 450.00, image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=400' },
  { name: 'Bar Handle Black', price: 12.00, image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=400' },
  { name: 'Oak Effect Flooring', price: 25.00, image: 'https://images.unsplash.com/photo-1581858726768-fdff21ac91a4?auto=format&fit=crop&w=400' },
  { name: 'Integrated Dishwasher', price: 399.00, image: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=400' },
  { name: 'Under-cabinet LED', price: 45.00, image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=400' },
]

export const GREENWICH_RANGE = [
  { name: 'Greenwich White', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400' },
  { name: 'Greenwich Marine Blue', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=400' },
  { name: 'Greenwich Reed Green', image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&w=400' },
  { name: 'Greenwich Slate Grey', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400' },
]

export const KITCHEN_RANGES = [
  {
    id: 'halesworth',
    name: 'Halesworth',
    brand: 'Howdens',
    subtitle: 'Antique Rose Kitchen',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800',
    sampleImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=200',
    rating: 5,
    reviews: 50,
    price: 0,
    category: 'Kitchen & Dining',
    features: ['19mm thick fronts', 'Sleek five-piece design', 'Sturdy frame'],
    description: 'A modern take on a traditional aesthetic, our Halesworth collection has a slim border for a sleek, five-piece design, and its 19mm thick fronts ensure a sturdy frame.',
    colors: ['#E5E1DA', '#607274', '#B2B2B2', '#31363F', '#222831', '#D6DAC8', '#9CA986'],
    moreColors: 5,
    badge: null,
  },
  {
    id: 'clerkenwell',
    name: 'Clerkenwell',
    brand: 'VPK',
    subtitle: 'Natural Oak Kitchen',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800',
    sampleImage: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&w=200',
    rating: 4.9,
    reviews: 28,
    price: 0,
    category: 'Kitchen & Dining',
    features: ['19mm thick doors', 'J pull handle', 'Sleek appearance'],
    description: 'The timber tone of Clerkenwell Natural Oak adds a traditional touch to a contemporary kitchen, while the 19mm thick doors and j pull handle offer a sleek appearance.',
    colors: ['#C4A484'],
    moreColors: 0,
    badge: null,
  },
  {
    id: 'greenwich-gloss',
    name: 'Greenwich Gloss',
    brand: 'Howdens',
    subtitle: 'Slate Grey Kitchen',
    image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&w=800',
    sampleImage: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=200',
    rating: 5,
    reviews: 41,
    price: 0,
    category: 'Kitchen & Dining',
    features: ['Reflective finish', 'Simple slab design', '16mm-thick front'],
    description: 'Greenwich Gloss has a reflective finish and simple slab design that is easy to accommodate in any home, while the 16mm-thick front makes it affordable too.',
    colors: ['#E5E1DA', '#F0EBE3', '#9CA986', '#D2C1B0', '#B2B2B2'],
    moreColors: 0,
    badge: 'BEST ON BUDGET',
  },
  {
    id: 'frome',
    name: 'Frome',
    brand: 'Magnet',
    subtitle: 'Mist Kitchen',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800',
    sampleImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=200',
    rating: 4.8,
    reviews: 15,
    price: 0,
    category: 'Kitchen & Dining',
    features: ['Narrow frame', 'Shallow centre panel', 'Smooth finish'],
    description: 'With a narrow frame, shallow centre panel, and smooth finish, Frome has a modern, shaker design and pared-back look. These fronts can be mix-and-matched with other colours.',
    colors: ['#9CA986', '#E5E1DA', '#B2B2B2', '#D2C1B0', '#F5F5F5', '#31363F'],
    moreColors: 1,
    badge: 'NEW',
  },
]

export const SKILL_GROUPS = [
  {
    title: 'Cleaning', icon: 'Brush',
    skills: [
      { id: 'cleaning', name: 'Cleaning', description: 'Includes cleaning of living spaces or offices or deep cleans of specific spaces.', inDemand: true,
        expectations: ['Attention to detail and thoroughness.','Experience with various cleaning products and techniques.','Ability to handle deep cleaning tasks as requested.','Respect for client property and privacy.','Reliability and punctuality.'],
        tools: ['Vacuum cleaner','Mop and bucket','Cleaning cloths','Multi-surface cleaner','Disinfectant'],
        additionalExpectations: ['Experience with commercial cleaning.','Specialized deep cleaning skills.'],
        additionalTools: ['Steam cleaner','Floor buffer'] }
    ]
  },
  {
    title: 'Home Improvements', icon: 'Hammer',
    skills: [
      { id: 'minor-repairs', name: 'Minor Home Repairs', description: 'Repair and maintenance work around the home or office.', inDemand: true,
        expectations: ['Versatility in handling small repair tasks.','Knowledge of basic home maintenance.','Ability to troubleshoot common household issues.','Efficient work pace and clean finish.','Good communication with clients about repair needs.'],
        tools: ['Screwdriver set','Hammer','Pliers','Adjustable wrench','Tape measure','Utility knife'],
        additionalExpectations: ['Experience with drywall patching.','Basic plumbing repair skills.'],
        additionalTools: ['Power drill','Caulking gun'] },
      { id: 'door-repair', name: 'Door, Cabinet, & Furniture Repair', description: 'Fix or replace doors, doorknobs, locks, hinges, cabinets, and furniture.', inDemand: false,
        expectations: ['Skill in adjusting and repairing hinges and locks.','Experience with furniture restoration or repair.'],
        tools: ['Chisels','Screwdrivers','Level','Wood glue','Clamps'],
        additionalExpectations: ['Experience with custom cabinetry.'],
        additionalTools: ['Power planer','Router'] },
      { id: 'electrical-help', name: 'Electrical Help', description: 'Help with basic electrical tasks like changing light fixtures or outlet plates.', inDemand: false,
        expectations: ['Strict adherence to safety protocols.','Knowledge of local electrical codes for minor tasks.'],
        tools: ['Voltage tester','Insulated screwdrivers','Wire strippers','Electrical tape'],
        additionalExpectations: ['Experience with smart home installations.'],
        additionalTools: ['Multimeter','Circuit tracer'] }
    ]
  },
  {
    title: 'Assembly', icon: 'Box',
    skills: [
      { id: 'furniture-assembly', name: 'Furniture Assembly', description: 'Assemble desks, chairs, dressers, beds, and other furniture items.', inDemand: true,
        expectations: ['Excellent ability to follow complex assembly instructions.','Experience with various furniture brands (IKEA, etc.).'],
        tools: ['Power screwdriver','Allen key set','Rubber mallet','Level','Measuring tape'],
        additionalExpectations: ['Experience with wall-anchoring heavy units.'],
        additionalTools: ['Impact driver','Stud finder'] }
    ]
  },
  {
    title: 'Moving & Mounting', icon: 'Truck',
    skills: [
      { id: 'mounting', name: 'General Mounting', description: 'Securely mount TVs, art, mirrors, and shelving to walls.', inDemand: true,
        expectations: ['Experience mounting a variety of items.','Knowledge of different wall types and appropriate mounting hardware.'],
        tools: ['Power drill','Level','Stud finder','Screwdrivers','Wall anchors','Tape measure'],
        additionalExpectations: ['Experience with heavy items like large mirrors.'],
        additionalTools: ['Hammer drill'] },
      { id: 'moving-help', name: 'Moving Help', description: 'Assist with loading, unloading, and transporting household items.', inDemand: false,
        expectations: ['Physical strength and stamina for lifting heavy items.','Experience with safe furniture moving techniques.'],
        tools: ['Dolly/Hand truck','Moving blankets','Furniture straps','Packing tape'],
        additionalExpectations: ['Piano moving experience.'],
        additionalTools: ['Furniture sliders'] }
    ]
  }
]
