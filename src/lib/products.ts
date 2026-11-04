export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  category: 'Wireless Headphones' | 'Wireless Earbuds' | 'Gaming Headsets' | 'Portable Bluetooth Speakers' | 'Accessories';
  categorySlug: 'wireless-headphones' | 'wireless-earbuds' | 'gaming-headsets' | 'portable-speakers' | 'accessories';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: 'Bestseller' | 'New Arrival' | 'Limited Edition' | 'Staff Pick';
  inStock: boolean;
  stockCount: number;
  shortDescription: string;
  description: string;
  images: string[];
  colors: ProductColor[];
  features: string[];
  specs: ProductSpec[];
  reviews: ProductReview[];
  isFeatured?: boolean;
}

export const CATEGORIES = [
  {
    name: 'Wireless Headphones',
    slug: 'wireless-headphones',
    description: 'Precision-tuned active noise cancellation and master-grade acoustic architecture.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    itemCount: 4,
  },
  {
    name: 'Wireless Earbuds',
    slug: 'wireless-earbuds',
    description: 'Ultra-compact high-resolution transducers with ergonomic comfort and spatial transparency.',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    itemCount: 4,
  },
  {
    name: 'Gaming Headsets',
    slug: 'gaming-headsets',
    description: 'Zero-latency wireless audio with holographic 7.1 spatial positioning and broadcast mic.',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80',
    itemCount: 2,
  },
  {
    name: 'Portable Bluetooth Speakers',
    slug: 'portable-speakers',
    description: 'Omnidirectional 360 sound projection built with rugged aerospace IP67 proofing.',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    itemCount: 3,
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: 'High-purity audiophile cabling, fast charging wireless docks, and armor carry cases.',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
    itemCount: 2,
  },
] as const;

export const PRODUCTS: Product[] = [
  // --- WIRELESS HEADPHONES ---
  {
    id: 'sona-one',
    name: 'SONA ONE',
    slug: 'sona-one',
    tagline: 'Sound. Unbound. The iconic flagship.',
    category: 'Wireless Headphones',
    categorySlug: 'wireless-headphones',
    price: 9999,
    originalPrice: 14999,
    rating: 4.9,
    reviewCount: 328,
    badge: 'Bestseller',
    inStock: true,
    stockCount: 42,
    shortDescription: 'Precision-built 40mm dynamic drivers with adaptive active noise cancellation and 24-hour battery reserve.',
    description: 'SONA ONE redefines personal acoustics. Engineered around a proprietary 40mm custom graphene diaphragm, it delivers breathtaking acoustic staging, surgical instrumental separation, and effortless dynamic transients. Built with aerospace aluminum pivots and memory-foam ear cushions wrapped in breathable vegan leather.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80',
    ],
    colors: [
      { name: 'SONA Red', hex: '#FF4D4D' },
      { name: 'Midnight', hex: '#171820' },
      { name: 'Forest', hex: '#2A6A50' },
      { name: 'Cobalt', hex: '#1746A2' },
    ],
    features: [
      'Custom 40mm graphene dynamic drivers',
      'Hybrid active noise cancellation with 4-mic array',
      '24-hour continuous battery life with fast quick-charge (15m = 4h)',
      'Ultra-low distortion Bluetooth 5.3 with LDAC & AAC codecs',
      'Ergonomic contour headband with memory-foam ear cushions',
    ],
    specs: [
      { label: 'Driver Size', value: '40mm Custom Dynamic' },
      { label: 'Frequency Response', value: '10Hz – 40,000Hz' },
      { label: 'Bluetooth Version', value: '5.3 (Multipoint)' },
      { label: 'Battery Capacity', value: '720 mAh (24h Playback)' },
      { label: 'Weight', value: '254 grams' },
    ],
    reviews: [
      {
        id: 'r1',
        author: 'Arjun Mehta',
        rating: 5,
        date: '2026-10-18',
        title: 'Masterpiece soundstage',
        comment: 'The sub-bass extension without bleeding into mids is phenomenal. Best headphones in India under 15k.',
        verified: true,
      },
      {
        id: 'r2',
        author: 'Priya Sharma',
        rating: 5,
        date: '2026-10-24',
        title: 'Design matches the sound',
        comment: 'Minimalist industrial finish. ANC completely eliminates flight engine noise.',
        verified: true,
      },
    ],
    isFeatured: true,
  },
  {
    id: 'sona-auralux-pro',
    name: 'SONA Auralux Pro',
    slug: 'sona-auralux-pro',
    tagline: 'Audiophile planar reference headphones.',
    category: 'Wireless Headphones',
    categorySlug: 'wireless-headphones',
    price: 18999,
    originalPrice: 24999,
    rating: 4.95,
    reviewCount: 142,
    badge: 'Limited Edition',
    inStock: true,
    stockCount: 18,
    shortDescription: 'Planar magnetic transducers with lossless 24-bit/96kHz wireless streaming and open-air acoustic staging.',
    description: 'Designed for mixing engineers and discerning audiophiles. The Auralux Pro utilizes ultra-thin planar magnetic drivers suspended in a symmetric neodymium motor, eliminating diaphragm break-up for zero harmonic coloration.',
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#111111' },
      { name: 'Brushed Silver', hex: '#D8D8D8' },
    ],
    features: [
      '50mm Planar magnetic transducers',
      'Ultra-wide soundstage with zero phase smearing',
      'Lossless LDAC, aptX HD & USB-C DAC playback',
      'Up to 32 hours playback reserve',
      'Magnesium alloy chassis with perforated lambskin pads',
    ],
    specs: [
      { label: 'Driver Type', value: '50mm Planar Magnetic' },
      { label: 'Frequency Response', value: '5Hz – 48,000Hz' },
      { label: 'Impedance', value: '32 Ohms' },
      { label: 'Battery Life', value: '32 Hours' },
      { label: 'Weight', value: '298 grams' },
    ],
    reviews: [
      {
        id: 'r3',
        author: 'Rohan Verma',
        rating: 5,
        date: '2026-10-12',
        title: 'Unbelievable detail resolution',
        comment: 'You can hear breath intakes and micro-details on acoustic tracks that dynamic drivers miss.',
        verified: true,
      },
    ],
    isFeatured: true,
  },
  {
    id: 'sona-nova-x',
    name: 'SONA Nova X',
    slug: 'sona-nova-x',
    tagline: 'Ultralight travel headphone with smart ANC.',
    category: 'Wireless Headphones',
    categorySlug: 'wireless-headphones',
    price: 7499,
    originalPrice: 9999,
    rating: 4.7,
    reviewCount: 215,
    badge: 'Bestseller',
    inStock: true,
    stockCount: 65,
    shortDescription: 'Foldable featherlight design weighing just 195g with intelligent wind-suppression microphones.',
    description: 'Built for nomads and daily commuters. SONA Nova X folds flat into a pocketable hard shell case, featuring fast capacitive gesture controls on the earcups and automatic wear detection.',
    images: [
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    ],
    colors: [
      { name: 'Matte Charcoal', hex: '#232528' },
      { name: 'Cream Sand', hex: '#E5DFD3' },
    ],
    features: [
      'Ultralight 195g foldable chassis',
      'Adaptive ambient awareness mode',
      'Touch and swipe volume/track controls',
      'Dual device auto-switch multipoint',
    ],
    specs: [
      { label: 'Driver', value: '38mm Bio-cellulose' },
      { label: 'Weight', value: '195 grams' },
      { label: 'Battery', value: '28 Hours' },
      { label: 'Codecs', value: 'SBC, AAC, aptX' },
    ],
    reviews: [
      {
        id: 'r4',
        author: 'Kavita Nair',
        rating: 5,
        date: '2026-09-30',
        title: 'Perfect for daily travel',
        comment: 'So lightweight I forget I am wearing them on my 2-hour daily metro commute.',
        verified: true,
      },
    ],
  },
  {
    id: 'sona-phantom-max',
    name: 'SONA Phantom Max',
    slug: 'sona-phantom-max',
    tagline: 'Deep bass master with sub-bass haptic feedback.',
    category: 'Wireless Headphones',
    categorySlug: 'wireless-headphones',
    price: 11999,
    originalPrice: 15999,
    rating: 4.8,
    reviewCount: 98,
    badge: 'New Arrival',
    inStock: true,
    stockCount: 29,
    shortDescription: 'Dual motor acoustic design pairing 45mm neodymium drivers with dedicated tactile sub-bass resonators.',
    description: 'Feel your sound. The Phantom Max incorporates independent haptic transducers that turn sub-60Hz frequencies into physical sensations, giving cinema-level immersion and club-grade kicks on demand.',
    images: [
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    ],
    colors: [
      { name: 'Stealth Black', hex: '#0B0B0C' },
      { name: 'Crimson Red', hex: '#C81E1E' },
    ],
    features: [
      'Dual-driver system with tactile sub-frequency bass slider',
      'Studio-grade 45mm composite drivers',
      'Active acoustic noise damping',
      'Low-latency 35ms gaming mode',
    ],
    specs: [
      { label: 'Primary Driver', value: '45mm Neodymium' },
      { label: 'Haptic Resonator', value: '30mm Low-Pass Transducer' },
      { label: 'Battery', value: '22 Hours' },
      { label: 'Weight', value: '280 grams' },
    ],
    reviews: [
      {
        id: 'r5',
        author: 'Vikram Joshi',
        rating: 5,
        date: '2026-10-05',
        title: 'The bass is insane',
        comment: 'You do not just hear EDM and movies, your skull vibrates in the best possible way.',
        verified: true,
      },
    ],
  },

  // --- WIRELESS EARBUDS ---
  {
    id: 'sona-airpods-neo',
    name: 'SONA AirPods Neo',
    slug: 'sona-airpods-neo',
    tagline: 'Pure clarity in an aerodynamic in-ear housing.',
    category: 'Wireless Earbuds',
    categorySlug: 'wireless-earbuds',
    price: 5999,
    originalPrice: 8999,
    rating: 4.85,
    reviewCount: 412,
    badge: 'Bestseller',
    inStock: true,
    stockCount: 88,
    shortDescription: '11mm beryllium-coated dynamic drivers, true spatial 3D audio, and Qi wireless fast-charging case.',
    description: 'Precision engineering in miniature. The AirPods Neo provides studio-grade tuning with customizable silicone tips, 48dB hybrid noise cancelling, and instant one-tap Bluetooth pair.',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=1200&q=80',
    ],
    colors: [
      { name: 'Alabaster White', hex: '#F9F8F6' },
      { name: 'Graphite', hex: '#1C1C1E' },
      { name: 'Sage Green', hex: '#58705E' },
    ],
    features: [
      '11mm Beryllium-coated drivers',
      '48dB Hybrid adaptive ANC with natural transparency mode',
      '6-Mic AI voice isolation array for crystal calls',
      '36 Hours combined total battery (8h buds + 28h case)',
      'IPX5 water and sweat resistance',
    ],
    specs: [
      { label: 'Driver', value: '11mm Beryllium Coated' },
      { label: 'Battery (Buds/Case)', value: '8h / 36h total' },
      { label: 'Charging', value: 'USB-C & Qi Wireless' },
      { label: 'Water Resistance', value: 'IPX5' },
      { label: 'Weight (per bud)', value: '4.2 grams' },
    ],
    reviews: [
      {
        id: 'r6',
        author: 'Siddharth Rao',
        rating: 5,
        date: '2026-10-21',
        title: 'Better than competitors twice the price',
        comment: 'Transparency mode sounds just like natural hearing. Calls are ultra-crisp outdoors.',
        verified: true,
      },
    ],
    isFeatured: true,
  },
  {
    id: 'sona-buds-pro',
    name: 'SONA Buds Pro',
    slug: 'sona-buds-pro',
    tagline: 'Dual driver in-ear monitors for audio purists.',
    category: 'Wireless Earbuds',
    categorySlug: 'wireless-earbuds',
    price: 8499,
    originalPrice: 11999,
    rating: 4.9,
    reviewCount: 167,
    badge: 'Staff Pick',
    inStock: true,
    stockCount: 34,
    shortDescription: 'Coaxial dual-driver system (10mm dynamic woofer + balanced armature tweeter) with LDAC decoding.',
    description: 'Bringing high-fidelity multi-driver IEM architecture to true wireless earbuds. Clear, shimmering highs combined with tactile, punchy sub-bass.',
    images: [
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80',
    ],
    colors: [
      { name: 'Matte Black', hex: '#121212' },
      { name: 'Chrome Silver', hex: '#E0E0E0' },
    ],
    features: [
      'Coaxial dual-driver: 10mm dynamic + Knowles balanced armature',
      'Hi-Res Audio Wireless certification with LDAC codec',
      'Personalized acoustic ear-canal calibration',
      'Wireless charging aluminum alloy carry case',
    ],
    specs: [
      { label: 'Drivers', value: '10mm Dynamic + Knowles BA' },
      { label: 'Playback Time', value: '7h (Buds) / 30h (Case)' },
      { label: 'Latency', value: '45ms Gaming Mode' },
      { label: 'Rating', value: 'IP54 Dust & Splash' },
    ],
    reviews: [
      {
        id: 'r7',
        author: 'Devika Sen',
        rating: 5,
        date: '2026-10-15',
        title: 'Audiophile grade in true wireless format',
        comment: 'Highs are silky and never sibilant. Easily outclasses mainstream earbud brands.',
        verified: true,
      },
    ],
  },
  {
    id: 'sona-minipods',
    name: 'SONA MiniPods',
    slug: 'sona-minipods',
    tagline: 'Ultra-small, seamless daily music companion.',
    category: 'Wireless Earbuds',
    categorySlug: 'wireless-earbuds',
    price: 3499,
    originalPrice: 4999,
    rating: 4.6,
    reviewCount: 290,
    badge: 'New Arrival',
    inStock: true,
    stockCount: 110,
    shortDescription: 'Invisible low-profile in-ear fit, perfect for sleeping, workout sessions, and lightweight casual listening.',
    description: 'Weighing only 3.2g per earbud, SONA MiniPods sit completely flush inside the ear concha. Snug fit guarantees they never fall out during high-intensity workouts or while sleeping.',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80',
    ],
    colors: [
      { name: 'Ghost White', hex: '#FFFFFF' },
      { name: 'Midnight', hex: '#111317' },
      { name: 'Coral Tint', hex: '#FF7070' },
    ],
    features: [
      'Flush invisible profile (sleep-friendly)',
      'IPX7 total immersion waterproof rating',
      'Bluetooth 5.3 with instant automatic connect',
      '24h battery life with miniature pill case',
    ],
    specs: [
      { label: 'Weight', value: '3.2g per bud' },
      { label: 'Battery', value: '6h Buds / 24h Total' },
      { label: 'Waterproof', value: 'IPX7 Submersible' },
    ],
    reviews: [
      {
        id: 'r8',
        author: 'Mohit Agarwal',
        rating: 5,
        date: '2026-09-22',
        title: 'Sleep headphones savior',
        comment: 'I can sleep on my side without any ear pressure. Highly recommend!',
        verified: true,
      },
    ],
  },

  // --- GAMING HEADSETS ---
  {
    id: 'sona-phantom-7-1',
    name: 'SONA Phantom 7.1',
    slug: 'sona-phantom-7-1',
    tagline: 'True spatial positional audio for competitive esports.',
    category: 'Gaming Headsets',
    categorySlug: 'gaming-headsets',
    price: 12499,
    originalPrice: 16999,
    rating: 4.88,
    reviewCount: 180,
    badge: 'Bestseller',
    inStock: true,
    stockCount: 24,
    shortDescription: 'Hardware 7.1 surround sound engine, 2.4GHz zero-latency dongle, and broadcast-grade detachable condenser mic.',
    description: 'Hear enemy footsteps and reload cues before you see them. Phantom 7.1 combines dual wireless connectivity (2.4GHz lossless + Bluetooth) with custom tuned sound stages calibrated for tactical FPS gaming.',
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80',
    ],
    colors: [
      { name: 'Tactical Matte Black', hex: '#141416' },
      { name: 'Cyber White', hex: '#EBEBEB' },
    ],
    features: [
      'Lossless 2.4GHz wireless with <15ms ultra-low latency',
      'Hardware 7.1 spatial positioning DSP chip',
      'Detachable 9.7mm broadcast-grade noise cancelling boom mic',
      'Cooling-gel infused memory foam ear cushions',
      '40-Hour ultra-long battery life with RGB on',
    ],
    specs: [
      { label: 'Driver', value: '53mm Neodymium Magnet' },
      { label: 'Wireless Protocol', value: '2.4GHz + BT 5.3 + 3.5mm' },
      { label: 'Microphone', value: 'Detachable Cardioid Condenser' },
      { label: 'Battery', value: '40 Hours Playback' },
      { label: 'Platform Support', value: 'PC, PS5, Xbox, Switch, Mobile' },
    ],
    reviews: [
      {
        id: 'r9',
        author: 'Aman Deep Singh',
        rating: 5,
        date: '2026-10-19',
        title: 'Tactical advantage in Valorant and CS2',
        comment: 'Pinpoint footstep detection. The cooling ear pads prevent sweat during 5-hour scrim sessions.',
        verified: true,
      },
    ],
    isFeatured: true,
  },
  {
    id: 'sona-arena-x',
    name: 'SONA Arena X',
    slug: 'sona-arena-x',
    tagline: 'Lightweight wired tournament gaming headset.',
    category: 'Gaming Headsets',
    categorySlug: 'gaming-headsets',
    price: 4999,
    originalPrice: 6999,
    rating: 4.7,
    reviewCount: 130,
    badge: 'Staff Pick',
    inStock: true,
    stockCount: 45,
    shortDescription: 'Weighs only 220g with oxygen-free braided cable, inline mute wheel, and multi-platform 3.5mm compatibility.',
    description: 'Zero batteries to charge, zero lag. The Arena X delivers tournament-grade audio reliability with comfortable velour earpads and an unbreakable steel headband.',
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=1200&q=80',
    ],
    colors: [
      { name: 'Carbon Black', hex: '#1B1C1E' },
    ],
    features: [
      '50mm Custom-tuned acoustic drivers',
      'Featherlight 220g tournament chassis',
      'Omnidirectional flip-to-mute mic',
      'Braided tangle-free 2m cable',
    ],
    specs: [
      { label: 'Connection', value: '3.5mm Gold-plated' },
      { label: 'Weight', value: '220 grams' },
      { label: 'Driver', value: '50mm Neodymium' },
    ],
    reviews: [
      {
        id: 'r10',
        author: 'Tanmay Bhatt',
        rating: 5,
        date: '2026-10-02',
        title: 'Solid build quality',
        comment: 'Simple, direct, zero delay. Plug and play perfection on PS5 and PC.',
        verified: true,
      },
    ],
  },

  // --- PORTABLE BLUETOOTH SPEAKERS ---
  {
    id: 'sona-boom-360',
    name: 'SONA Boom 360',
    slug: 'sona-boom-360',
    tagline: 'Room-filling 360 omnidirectional sound.',
    category: 'Portable Bluetooth Speakers',
    categorySlug: 'portable-speakers',
    price: 8999,
    originalPrice: 12999,
    rating: 4.84,
    reviewCount: 220,
    badge: 'Bestseller',
    inStock: true,
    stockCount: 38,
    shortDescription: '60W peak output with dual passive radiators, IP67 dust/waterproof enclosure, and PartyLink pairing.',
    description: 'Immerse any space. The Boom 360 delivers punchy bass and crystalline 360-degree acoustic projection, wrapped in tactile aerospace aluminum mesh.',
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    ],
    colors: [
      { name: 'Raw Aluminum', hex: '#C2C2C2' },
      { name: 'Onyx Black', hex: '#18191B' },
      { name: 'Terracotta Coral', hex: '#E05A47' },
    ],
    features: [
      '60W High-output omnidirectional 360 sound array',
      'Dual opposing passive radiators for deep punchy bass',
      'IP67 Submersible waterproof and dustproof design',
      '20-Hour playtime with built-in powerbank reverse charging',
      'Stereo Link capability to pair two Boom 360 speakers',
    ],
    specs: [
      { label: 'Power Output', value: '60W Peak (40W RMS)' },
      { label: 'Frequency Response', value: '45Hz – 22,000Hz' },
      { label: 'Battery Capacity', value: '5200 mAh (20h Playback)' },
      { label: 'Waterproof Rating', value: 'IP67' },
      { label: 'Dimensions', value: '188mm x 85mm' },
    ],
    reviews: [
      {
        id: 'r11',
        author: 'Neha Kapoor',
        rating: 5,
        date: '2026-10-14',
        title: 'Fills our entire living room and terrace',
        comment: 'Rich sound that does not distort even at max volume. Built like an audio tank.',
        verified: true,
      },
    ],
    isFeatured: true,
  },
  {
    id: 'sona-pulse-mini',
    name: 'SONA Pulse Mini',
    slug: 'sona-pulse-mini',
    tagline: 'Pocket speaker with astonishing low-end authority.',
    category: 'Portable Bluetooth Speakers',
    categorySlug: 'portable-speakers',
    price: 3999,
    originalPrice: 5499,
    rating: 4.75,
    reviewCount: 178,
    badge: 'New Arrival',
    inStock: true,
    stockCount: 72,
    shortDescription: 'Pocket-sized aluminum puck speaker with 12W output, built-in lanyard strap, and 14h battery.',
    description: 'Audio power in the palm of your hand. Machined from a single block of anodized aluminum, SONA Pulse Mini clips to backpacks and bikes for premium audio everywhere you roam.',
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80',
    ],
    colors: [
      { name: 'Space Grey', hex: '#3E4044' },
      { name: 'Olive Green', hex: '#3D5443' },
      { name: 'SONA Red', hex: '#FF4D4D' },
    ],
    features: [
      'Ultra-compact palm-sized machined aluminum body',
      '12W Clean output with downward firing bass port',
      'Magnetic mounting base to attach to metallic surfaces',
      '14 Hours continuous playback',
    ],
    specs: [
      { label: 'Weight', value: '210 grams' },
      { label: 'Battery', value: '14 Hours' },
      { label: 'Water Resistance', value: 'IPX6 Splashproof' },
    ],
    reviews: [
      {
        id: 'r12',
        author: 'Rajiv Malhotra',
        rating: 5,
        date: '2026-10-09',
        title: 'Shockingly loud for its size',
        comment: 'Magnetic base is genius for outdoor workouts and camping.',
        verified: true,
      },
    ],
  },

  // --- ACCESSORIES ---
  {
    id: 'sona-flex-charging-case',
    name: 'SONA Flex Charging Case',
    slug: 'sona-flex-charging-case',
    tagline: 'Smart wireless charging dock and travel vault.',
    category: 'Accessories',
    categorySlug: 'accessories',
    price: 2499,
    originalPrice: 3499,
    rating: 4.8,
    reviewCount: 85,
    badge: 'Staff Pick',
    inStock: true,
    stockCount: 50,
    shortDescription: 'Hard shell ballistic nylon travel dock with integrated 10,000mAh reserve battery for headphones and earbuds.',
    description: 'Keep your audio gear safeguarded and always at 100%. Compatible with SONA ONE and all SONA earbuds, featuring dedicated cable organizers and dual USB-C output ports.',
    images: [
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80',
    ],
    colors: [
      { name: 'Stealth Grey', hex: '#2A2C30' },
    ],
    features: [
      'Built-in 10,000 mAh fast charging battery bank',
      'Ballistic nylon water-repellent shell with velvet interior',
      'Magnetic alignment slots for earbuds and cables',
      'External battery percentage LED indicator',
    ],
    specs: [
      { label: 'Battery Capacity', value: '10,000 mAh' },
      { label: 'Input/Output', value: 'USB-C PD 20W' },
      { label: 'Compatibility', value: 'Universal Audio Gear' },
    ],
    reviews: [
      {
        id: 'r13',
        author: 'Tarun Saxena',
        rating: 5,
        date: '2026-09-18',
        title: 'Must-have travel companion',
        comment: 'Charges my SONA ONE 4 times over while protecting it inside my luggage.',
        verified: true,
      },
    ],
  },
  {
    id: 'sona-audiolink-cable',
    name: 'SONA AudioLink Cable',
    slug: 'sona-audiolink-cable',
    tagline: 'Silver-plated high-purity audiophile cable.',
    category: 'Accessories',
    categorySlug: 'accessories',
    price: 1499,
    originalPrice: 1999,
    rating: 4.9,
    reviewCount: 110,
    badge: 'Limited Edition',
    inStock: true,
    stockCount: 60,
    shortDescription: '8-Core braided oxygen-free copper (OFC) cable with 24K gold-plated 3.5mm connectors and USB-C DAC adapter.',
    description: 'Extract every drop of acoustic resolution. Engineered for analog purists who demand zero microphonics, low capacitance, and transparent sound transmission.',
    images: [
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80',
    ],
    colors: [
      { name: 'Braided Silver/Black', hex: '#9E9E9E' },
    ],
    features: [
      '8-Core braided 99.999% oxygen-free copper silver plated',
      'Zero cable microphonics with flexible silicone sheath',
      'Includes 3.5mm to USB-C lossless 24-bit/192kHz DAC dongle',
    ],
    specs: [
      { label: 'Cable Length', value: '1.4 meters' },
      { label: 'Termination', value: '3.5mm to 3.5mm + USB-C DAC' },
      { label: 'Plating', value: '24K Gold' },
    ],
    reviews: [
      {
        id: 'r14',
        author: 'Deepak Patel',
        rating: 5,
        date: '2026-10-10',
        title: 'High quality cable and DAC',
        comment: 'Zero hissing on high-gain tracks. Flexible and does not tangle.',
        verified: true,
      },
    ],
  },
  {
    id: 'sona-apex-anc',
    name: 'SONA Apex ANC',
    slug: 'sona-apex-anc',
    tagline: 'Dual-chamber hybrid ANC with studio monitor voicing.',
    category: 'Wireless Earbuds',
    categorySlug: 'wireless-earbuds',
    price: 6999,
    originalPrice: 9499,
    rating: 4.88,
    reviewCount: 154,
    badge: 'New Arrival',
    inStock: true,
    stockCount: 52,
    shortDescription: 'Dual acoustic chamber architecture with 50dB active noise suppression and bone-conduction voice sensors.',
    description: 'Designed for silence in bustling environments. SONA Apex ANC features an isolated front-and-back acoustic chamber structure that prevents driver back-pressure, ensuring tight bass articulation and ultra-wide spatial soundstage.',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=1200&q=80',
    ],
    colors: [
      { name: 'Titanium Grey', hex: '#3B3E42' },
      { name: 'Pure White', hex: '#F5F5F7' },
      { name: 'SONA Red', hex: '#FF4D4D' },
    ],
    features: [
      'Industry-leading 50dB hybrid dual-feed ANC',
      'Dual-chamber acoustic structure for transient purity',
      'Bone conduction sensor for noisy street phone calls',
      'Up to 34h combined battery with wireless charging',
      'IP55 sweat, dust, and rain resistance',
    ],
    specs: [
      { label: 'Transducer', value: '11.5mm Dual-Chamber Dynamic' },
      { label: 'ANC Depth', value: 'Up to 50dB Adaptive' },
      { label: 'Battery Life', value: '8.5h Buds / 34h Total' },
      { label: 'Microphones', value: '6 Microphones + VPU Bone Sensor' },
      { label: 'Codec Support', value: 'LDAC, AAC, SBC' },
    ],
    reviews: [
      {
        id: 'r15',
        author: 'Nikhil Kashyap',
        rating: 5,
        date: '2026-10-28',
        title: 'ANC is astonishing',
        comment: 'Cuts traffic and fan noise completely. The fit is comfortable for 6 hours straight.',
        verified: true,
      },
    ],
    isFeatured: true,
  },
  {
    id: 'sona-titan-outdoor',
    name: 'SONA Titan Outdoor',
    slug: 'sona-titan-outdoor',
    tagline: 'Rugged 100W expedition speaker with powerbank.',
    category: 'Portable Bluetooth Speakers',
    categorySlug: 'portable-speakers',
    price: 14999,
    originalPrice: 19999,
    rating: 4.92,
    reviewCount: 96,
    badge: 'Bestseller',
    inStock: true,
    stockCount: 22,
    shortDescription: '100W bi-amplified expedition speaker with 30-hour playback reserve, IP68 submersion proofing, and emergency powerbank.',
    description: 'A monster of acoustic fidelity built for the great outdoors. Featuring two long-throw woofers, two silk dome tweeters, and symmetrical passive bass radiators encased in shockproof aircraft silicone and brushed alloy.',
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    ],
    colors: [
      { name: 'Tactical Olive', hex: '#334033' },
      { name: 'Obsidian Black', hex: '#141415' },
      { name: 'Desert Sand', hex: '#C2B69D' },
    ],
    features: [
      '100W Bi-amplified 4-driver acoustic array',
      'IP68 Submersible and drop-tested from 2 meters',
      'Massive 9600 mAh powerbank for charging mobile devices',
      'Up to 30 hours continuous playback time',
      'Built-in broadcast link to sync up to 50 SONA speakers',
    ],
    specs: [
      { label: 'Peak Power', value: '100W (70W RMS)' },
      { label: 'Frequency Range', value: '38Hz – 24,000Hz' },
      { label: 'Battery Capacity', value: '9,600 mAh (30h Playback)' },
      { label: 'Waterproof Rating', value: 'IP68 Submersible' },
      { label: 'Weight', value: '1.45 kg' },
    ],
    reviews: [
      {
        id: 'r16',
        author: 'Major Siddharth Sen',
        rating: 5,
        date: '2026-10-26',
        title: 'Built like a tank with studio sound',
        comment: 'Took this on a 5-day mountain trek in Himachal. Handled rain, dust, and filled the campsite with thunderous bass.',
        verified: true,
      },
    ],
    isFeatured: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return PRODUCTS.filter((p) => p.categorySlug === categorySlug);
}

export function getRelatedProducts(currentId: string, limit = 4): Product[] {
  const current = PRODUCTS.find((p) => p.id === currentId);
  if (!current) return PRODUCTS.slice(0, limit);
  return PRODUCTS.filter((p) => p.id !== currentId && p.category === current.category)
    .concat(PRODUCTS.filter((p) => p.id !== currentId && p.category !== current.category))
    .slice(0, limit);
}

