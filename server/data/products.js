const img = (pathOrId) => {
  if (pathOrId.startsWith('/') || pathOrId.startsWith('http')) {
    return pathOrId;
  }
  return `https://images.unsplash.com/photo-${pathOrId}?w=800&q=80&auto=format&fit=crop`;
};

export const categories = [
  { name: 'Beard', slug: 'beard', description: 'Premium beard care' },
  { name: 'Face', slug: 'face', description: 'Face & skin essentials' },
  { name: 'Hair', slug: 'hair', description: 'Hair styling & care' },
];

export const products = [
  {
    name: 'Desii Gabru Beard Growth Oil',
    slug: 'desii-gabru-beard-growth-oil',
    description: [
      "Introducing Desii Gabru Beard Oil, your go-to grooming solution for a beard that's as bold as you are.",
      "Packed with the goodness of nature, this beard oil is your secret weapon for a soft, stylish, and Desii Gabru-approved beard.",

      "Key Features:",
      "Desii Gabru Blend: Our unique blend of natural oils, including Brahmi and Shikakai, gives your beard the Desii Gabru treatment it deserves.",
      "Irresistible Scent: Enjoy the masculine fragrance of sandalwood, citrus, and spices, leaving your beard smelling as confident as it looks.",
      "Quick Absorption: Say goodbye to greasy residue — our non-greasy formula absorbs fast, so you can strut your stuff without any hassle.",
      "Nutrient Boost: Packed with vitamins, our beard oil nourishes your facial hair, promoting healthy growth and preventing itchiness.",
      "For Every Beard: No matter the length or style, Desii Gabru Beard Growth Oil is your grooming partner for all beard types.",

      "Ingredients:",
      "Crafted with care, Desii Gabru Beard Oil combines a blend of natural and nourishing ingredients like Brahmi and Shikakai known for their beard-enhancing properties.",
      "Each component works in harmony to create a beard that's Desii Swag-worthy.",

      "Our Big Promise:",
      "Experience the Desii Gabru Beard Oil promise: Unleash confidence, foster impressive growth, bid farewell to itchiness, style effortlessly, and leave a lasting impact with our signature fragrance.",
      "Transform your beard into a Desii Gabru masterpiece in just a few drops."
    ],
    productDetails: [
      "Manly Beard Growth:",
      "Desii Gabru Beard Growth Oil, enriched with Brahmi and Shikakai, is expertly formulated to promote robust and manly beard growth, helping you achieve the beard you've always desired.",

      "Brahmi Nourishment:",
      "Experience the nourishing power of Brahmi in every drop. Our Beard Growth Oil deeply nourishes your beard, providing essential nutrients to enhance its strength, thickness, and overall health.",

      "Shikakai for Cleansing:",
      "Infused with Shikakai, this beard growth oil not only promotes growth but also ensures a clean and healthy beard. Shikakai's natural cleansing properties help eliminate dirt and dandruff, leaving your beard fresh and vibrant.",

      "Smooth and Manageable Beard:",
      "Say goodbye to rough and unruly facial hair. Desii Gabru Beard Growth Oil enhances the texture of your beard, making it smooth, soft, and easily manageable for a groomed and polished look.",

      "Natural Formula, No Harsh Chemicals",
      "Crafted with a commitment to natural ingredients, our beard growth oil is free from harsh chemicals. Embrace a natural approach to beard care that prioritizes both growth and overall beard health.",

      "Elevate Your Grooming Experience:",
      "With Desii Gabru Beard Growth Oil, you’re not just grooming your beard — you’re embracing a lifestyle. This isn’t just a product; it’s a statement of confidence and style. It’s the secret behind every perfectly sculpted beard and the confidence that comes with it. Every application is a step towards unlocking your full beard potential."
    ],
    category: 'beard',
    images: [
      img('/public/beard-growth-oil-1.png'),
      img('/public/beard-growth-oil-2.png'),
      img('/public/beard-growth-oil-3.png'),
      img('/public/beard-growth-oil-4.png'),
      img('/public/beard-growth-oil-5.png'),
      img('/public/beard-growth-oil-6.png')
    ],
    price: 329,
    comparePrice: 499,
    stock: 120,
    ingredients: ['Argan Oil', 'Jojoba', 'Sandalwood', 'Vitamin E', 'Brahmi', 'Shikakai'],
    usageGuide: 'Apply 4-6 drops to damp beard. Massage into skin beneath.',
    isFeatured: true,
    isTrending: true,
    ratings: 4.8,
    numReviews: 234,
    tags: ['bestseller', 'beard'],
    sku: 'DG-BE-001',
  },
  {
    name: 'Desii Gabru Beard Shiner',
    slug: 'desii-gabru-beard-shiner',
    description: [
      "Introducing Desii Gabru Beard Shiner, your grooming essential for a beard that demands attention. Crafted with precision, this beard shiner from Desii Gabru adds a touch of brilliance to your facial hair, making you stand out in the crowd. ",

      "Key Features",

      "Luminous Formula:",
      "Our specially formulated beard shiner brings out the natural shine of your beard, giving it a lustrous and healthy appearance.",

      "Fast-Absorbing Elegance:",
      "Enjoy a non-greasy application that absorbs quickly, leaving your beard soft to the touch and effortlessly radiant.",

      "Desii Gabru Signature Scent:",
      "Infused with the captivating Desii Gabru fragrance, our beard shiner ensures you leave a memorable impression wherever you go.",

      "Confidence in Your Beard:",
      "Enjoy the confidence that comes with a well-maintained, shiny beard that stands out in any crowd.",

      "Easy Grooming Upgrade:",
      "Elevate your grooming game with Desii Gabru Beard Shiner, adding a touch of sophistication to your daily routine without any hassle",

      "Ingredients:",
      "Crafted with care, Desii Gabru Beard Shiner combines the power of natural and nourishing ingredients like almond & grape seed known for their beard-enhancing properties. Each component works together to create a beard that shines with health and style.",

      "Our Big Promise:",
      "Desii Gabru Beard Shiner delivers brilliance in every drop. Expect a beard that radiates health, exudes confidence, and captures attention effortlessly. Unleash your beard's potential and experience the Desii Gabru glow, transforming your grooming routine into a statement of style.",

    ],
    productDetails: [
      "Radiant Beard Shine:",
      "Desii Gabru Beard Shiner, enriched with Almond and Grape Seed, is your secret weapon for achieving a radiant and glossy beard shine that exudes confidence and charm.",

      "Almond Infusion for Nourishment:",
      "Experience the nourishing power of Almond in every drop. Our Beard Shiner deeply moisturizes and conditions your beard, leaving it soft, supple, and irresistibly touchable.",

      "Grape Seed Elegance:",
      "Infused with Grape Seed extract, this beard shiner not only adds shine but also contributes to the overall health of your beard. Grape Seed is rich in antioxidants, promoting a strong and resilient beard.",

      "Non-Greasy Formula:",
      "Say goodbye to greasy residue. Desii Gabru Beard Shiner is meticulously crafted to provide a luxurious shine without leaving your beard feeling oily or weighed down.",

      "Aromatic Appeal:",
      "Immerse yourself in the captivating fragrance of Desii Gabru Beard Shiner. Let the subtle blend of Almond and Grape Seed leave your beard not only looking great but smelling irresistibly fresh."
    ],
    category: 'beard',
    images: [
      img('/public/beard-shiner-1.png'),
      img('/public/beard-shiner-2.png'),
      img('/public/beard-shiner-3.png'),
      img('/public/beard-shiner-4.png'),
      img('/public/beard-shiner-5.png')
    ],
    price: 249,
    comparePrice: 499,
    stock: 85,
    ingredients: ['Almond', 'Grape Seed'],
    usageGuide: [
      "Take a few drops of shiner on your palm",

      "Rub hands together to distribute the shiner evenly",

      "Massage shiner in to beard and skin from the roots to tips"
    ],
    isTrending: true,
    ratings: 4.6,
    numReviews: 156,
    sku: 'DG-BE-002',
  },
  {
    name: 'Desii Gabru Hair Wax',
    slug: 'desii-gabru-hair-wax',
    description: [
      "Desii Gabru Sculpt & Style Hair Wax is an organic wax that allows you to create and define your signature look. The formula is designed to give your hair a strong, sculpted hold without sacrificing healthy shine. Get ready to design, shape, and style for your desired results.",

      "Key Features :",

      "Flexible Hold:",
      "Achieve a customisable hold that allows you to shape and reshape your hairstyle throughout the day, offering flexibility for various looks.",

      "Matte Finish:",
      "Experience a natural matte finish that adds texture and depth to your hair without the unwanted shine, creating a modern and effortless look.",

      "Long-Lasting Definition:",
      "Enjoy a wax that provides lasting definition, ensuring your carefully crafted hairstyle stays intact from morning to night.",

      "Easy Application:",
      "The smooth and easy-to-apply formula allows for effortless styling, making it user-friendly for both beginners and experienced groomers.",

      "Washable Formula:",
      "Wash out the wax easily without leaving residue, ensuring a clean and fresh start for your hair each day, without build-up.",



      "Ingredients :",
      "Crafted with care, Desii Gabru Hair Wax contains a blend of natural ingredients, including oat extract and rice, known for their hair-loving properties. These ingredients provide a firm hold without weighing your hair down, leaving it soft, manageable, and revitalized.",

      "Our Big Promise :",
      "This revolutionary hair wax will effortlessly sculpt and redefine your hair, turning ordinary locks into a bold, stylish statement in seconds.",
    ],
    productDetails: [
      "Made with Desi Goodness",
      "Enriched with natural Orange, Aloe Vera, Lemon, and Oats extracts to keep your hair healthy while styling.",

      "Strong Hold with Matte Finish",
      "Provides a firm hold without the greasy or shiny look, making it perfect for everyday Indian weather.",


      "Ideal for All Hair Types",
      "Whether your hair is straight, wavy, or curly, this wax works well for all Indian hair textures.",

      "Easy to Apply, Easy to Wash",
      "Smooth, non-sticky application that washes off easily without leaving residue behind.",

      "Style that Lasts All Day",
      "Keeps your look fresh and set from morning till night. Whether you're at college, work, or a Shaadi!",
    ],
    category: 'hair',
    images: [
      img('/public/hair-wax-1.png'),
      img('/public/hair-wax-2.png'),
      img('/public/hair-wax-3.png'),
      img('/public/hair-wax-4.png'),
      img('/public/hair-wax-5.png')
    ],
    price: 399,
    comparePrice: 499,
    stock: 150,
    ingredients: ['Oat Extract', 'Rice Extract', 'Orange Extract', 'Aloe Vera Extract', 'Lemon Extract'],
    usageGuide: [
      "Scoop a small amount of crystal-clear wax",

      "Apply through strands of your hair",

      "Style as you like"
    ],
    isFeatured: true,
    ratings: 4.9,
    numReviews: 289,
    sku: 'DG-HR-001',
  },
  {
    name: 'Desii Gabru Hair Serum',
    slug: 'desii-gabru-hair-serum',
    description: [
      "Desii Gabru's Hair Serum is specially formulated with organic ingredients to nourish and give a glossy shine to your hair. Its non-greasy formula is quickly absorbed, giving you daily nourishment without compromising on glamor. Reap the benefits of a strong and healthy hair with Desii Gabru.",

      "Key Features :",
      "Hair Transformation: Our Hair Serum works its magic, turning ordinary locks into a bold, stylish statement effortlessly.",
      "Silky Smoothness: Experience hair that feels as soft as silk and shines with natural beauty.",
      "Frizz Control: Tame frizz and flyaways, maintaining your hair's elegance all day long.",

      "Ingredients :",
      "Crafted with care, Desii Gabru Hair Serum contains a blend of natural ingredients like avocado & grape seed oil, each selected for its hair-loving properties. These ingredients provide deep hydration, repair damage, and enhance the natural beauty of your hair.",

      "Our Big Promise :",
      "This transformative hair serum instantly turns frizzy, dull, dry hair into a soft, silky-smooth mane you'll adore."
    ],
    productDetails: [
      "Natural Shine Booster:",
      "Desii Gabru Hair Serum, infused with Avocado and Grape Seed Oil, is your go-to solution for achieving natural shine that enhances the beauty of your hair, making it radiant and glossy.",

      "Avocado Magic for Nourishment:",
      "Experience the magic of Avocado, known for its nourishing properties. Our Hair Serum deeply nourishes each strand, leaving your hair smoother, silkier, and healthier from root to tip.",

      "Grape Seed Oil Thickness:",
      "Infused with Grape Seed Oil, this hair serum not only adds shine but also contributes to the thickness of your hair. Grape Seed Oil is rich in essential fatty acids that promote hair strength and thickness.",

      "Weightless and Non-Greasy:",
      "Enjoy the benefits of a hair serum without the heaviness. Desii Gabru Hair Serum is crafted to be weightless and non-greasy, providing natural shine and thickness without weighing yo ur hair down.",

      "Heat Protection:",
      "Whether you love styling or just want to protect your hair from heat damage, our Hair Serum has you covered. It forms a protective layer, keeping your hair shielded from the damaging effects of heat styling."
    ],
    category: 'hair',
    images: [
      img('/public/hair-serum-1.png'),
      img('/public/hair-serum-2.png'),
      img('/public/hair-serum-3.png'),
      img('/public/hair-serum-4.png'),
      img('/public/hair-serum-5.png')
    ],
    price: 549,
    comparePrice: 899,
    stock: 175,
    ingredients: ['Avocado Oil', 'Grape Seed Oil'],
    usageGuide: [
      "Put a generous amount of serum on your scalp focusing on the root and thinning areas",

      "Gently massage the serum into scalp using fingertips",

      "For optimal results, let It remains overnight"
    ],
    isTrending: true,
    ratings: 4.5,
    numReviews: 198,
    sku: 'DG-HR-002',
  },
  {
    name: 'Desii Gabru Conditioning Shampoo',
    slug: 'desii-gabru-conditioning-shampoo',
    description: [
      "Make your hair thick, healthy and strong with Desii Gabru Conditioning Shampoo.  It is enriched with completely safe & natural ingredients like Aloe vera extract, Cucumber extract, Fenugreek seed extract, Brahmi Leaf extract and Shikakai extract that reduces hair fall & dandruff and helps in hair growth. It makes hair smooth and frizz-free. Safe for coloured & chemically treated hair, this shampoo is free of harmful chemicals & toxins such as Parabens, Sulphate. Use it regularly to get voluminous, strong and shinier hair.",

      "Benefits Of Onion Shampoo",

      "1. Helps In Hair Growth: -   Desii Gabru Conditioning Shampoo thoroughly cleanses both the hair and scalp absorbing 50 to 100 times its weight in impurities. It removes any product buildup without stripping or drying out hair, provides essential nutrients to the hair follicle to support healthy hair growth.",

      "2. Anti-Dandruff: - With a blend of natural ingredients, repairs and strengthen your hair naturally. Our restorative shampoo fights again drying, damaged, and dehydrated hair. Helping to get rid of dandruff.",

      "3. Anti-Hair Fall and Makes Hair Stronger: - This Conditioning Shampoo will wash away all of the excess oils and dirt from your hair to get that beautiful shiny hair which in turn reduces hair fall and makes hair stronger & thicker. ",

      "How Much You Get",

      "250gm (Approx.- 1 month)",

      "HOW TO USE",

      "Step 1: Wet your hair properly with water",

      "Step 2: Take desired amount of Conditioning shampoo",

      "Step 3: Apply on wet hair and massage gently",

      "Step 4: Rinse off with water"
    ],
    productDetails: [
      "1. Nourishing Formula:",
      "Specially designed to provide essential hydration and nourishment to the hair, promoting healthier-looking hair.",

      "2. Improves Manageability:",
      "Aims to enhance hair texture and manageability, making it easier to style and maintain.",

      "3. Suitable for All Hair Types:",
      "Formulated to be effective on various hair types, including dry, oily, and normal hair.",

      "4. Gentle Cleansing:",
      "Cleanses hair while delivering conditioning benefits, helping to maintain natural moisture balance.",

      "5. Dermatologist Tested:",
      "Tested for safety and suitability, ensuring a reliable addition to your hair care routine."
    ],
    category: 'hair',
    images: [
      img('/public/shampoo-1.png'),
      img('/public/shampoo-2.png'),
      img('/public/shampoo-3.png'),
      img('/public/shampoo-4.png'),
      img('/public/shampoo-5.png'),
      img('/public/shampoo-6.png')
    ],
    price: 599,
    comparePrice: 999,
    stock: 90,
    ingredients: ["Alo", "Cucumber", "Fenugreek seed", "Brahmi Leaf", "Shikakai"],
    usageGuide: [
      "Wet your hair with water",

      "Gently massage shampoo into your scalp and lengths",

      "Rinse thoroughly with water"
    ],
    ratings: 4.9,
    numReviews: 87,
    sku: 'DG-HR-003',
  },
  {
    name: 'Desii Gabru Face Wash',
    slug: 'desii-gabru-face-wash',
    description: [
      "Uncover a natural, glowing complexion with Desii Gabru Refresh Glow Face Wash. Its special formula, enriched with organic ingredients, helps remove dirt and impurities to reveal a clean, radiant complexion. Get ready to show off your healthy and beautiful skin!",

      "Key Features:",  

      "Deep Cleansing: Our Face Wash effectively removes dirt, oil, and impurities, leaving your skin feeling refreshed and rejuvenated.",

      "Gentle on Skin: Formulated with care, our Face Wash is suitable for all skin types, providing a gentle yet thorough cleanse.",

      "Natural Ingredients: Enriched with skin-loving natural ingredients, our formula nourishes as it cleanses, promoting a radiant complexion.",

      "Ingredients:",

      "Crafted with care, Desii Gabru Face Wash combines the power of natural ingredients like orange & neem extract known for their skin-friendly properties. Each component works harmoniously to cleanse, refresh, and enhance your skin's vitality.",

      "Our Big Promise :",

      "This rejuvenating face wash instantly refreshes tired, dull skin, leaving you with a vibrant, invigorated complexion you'll love."
    ],
    productDetails:[
      "Refreshing Face Wash:",
      "Desii Gabru Face Wash, enriched with Orange and Neem Extract, offers a refreshing cleansing experience that leaves your skin revitalized and rejuvenated.",

      "Oil Control with Orange Extract:",
      "Experience the natural oil-controlling properties of Orange Extract. Our Face Wash helps regulate excess oil production, leaving your skin feeling fresh and balanced.",

      "Pimple-Fighting Neem Extract:",
      "Infused with Neem Extract, this face wash is a powerful ally against pimples and acne. Neem's antibacterial properties help cleanse your skin and prevent breakouts, promoting a clear complexion.",

      "Gentle Cleansing:",
      "Enjoy gentle yet effective cleansing with Desii Gabru Face Wash. The carefully selected ingredients ensure a thorough cleanse without stripping your skin of its natural moisture.",

      "Refreshing Citrus Fragrance:",
      "Immerse yourself in the invigorating citrus fragrance of our face wash. The refreshing scent adds a delightful touch to your skincare routine, leaving you feeling energized and ready to face the day."
    ],
    category: 'face',
    images: [
      img('/public/face-wash-1.png'),
      img('/public/face-wash-2.png'),
      img('/public/face-wash-3.png'),
      img('/public/face-wash-4.png'),
      img('/public/face-wash-5.png'),
      img('/public/face-wash-6.png')
    ],
    price: 364,
    comparePrice: 399,
    stock: 50,
    ingredients: ["Orange Extract", "Neem Extract"],
    usageGuide: [
      "Squeeze the desire amount of face wash on your palm",

      "Massage gently on your face in circular motion",

      "Rinse thoroughly with water"
    ],
    isFeatured: true,
    ratings: 4.9,
    numReviews: 67,
    sku: 'DG-FA-001',
  },
  {
    name: 'Desii Gabru Face Serum',
    slug: 'desii-gabru-face-serum',
    description: [
      "Unleash your skin's true radiance with Desii Gabru Face Serum. Specially crafted to enhance your natural glow, this serum revitalizes and nourishes, leaving you with a complexion that reflects confidence and vitality. Elevate your skincare routine with Desii Gabru and let your inner radiance shine through.",

      "Key Features:",
      "Radiant Complexion: Our Face Serum revitalises and brightens your skin, giving you a luminous and youthful glow.",

      "Hydration Boost: Experience deep hydration that keeps your skin supple, reducing the appearance of fine lines and dryness.",

      "Versatile Formula: Suitable for all skin types, Desii Gabru Face Serum is your universal path to youthful, radiant skin.",

      "Ingredients:",

      "Crafted with care, Desii Gabru Face Serum is enriched with a blend of natural ingredients like Vit. E & Vit. C known for their skin-loving properties. Each component works in harmony to rejuvenate, hydrate, and enhance your skin's radiance.",

      "Our Big Promise :",

      "This revolutionary face serum will effortlessly transform tired, dull skin into a radiant, youthful complexion you'll love instantly."
    ],
    productDetails:[
      "Revitalize Your Skin:",
      " Desii Gabru Face Serum is a potent blend of Vitamin E and Vitamin C, carefully formulated to rejuvenate and revitalize your skin. Experience a natural and radiant glow that comes from within.",

      "Brightening Power of Vitamin C:",
      "Infused with Vitamin C, this face serum targets dark spots, uneven skin tone, and pigmentation. Watch as your skin transforms, becoming visibly brighter and more even-toned with regular use.",

      "Intense Hydration with Vitamin E:",
      "Enriched with Vitamin E, our face s  erum deeply nourishes your skin, providing intense hydration for a smoother and healthier complexion. Say goodbye to dryness and hello to a supple, youthful look.",

      "Natural Ingredients for Healthy Skin:",
      "Desii Gabru Face Serum is crafted with a focus on natural ingredients, free from harmful additives. Pamper your skin with the goodness it deserves, promoting long-term skin health and resilience.",

      "For Fair and Glowing Skin:",
      "Achieve the complexion you desire with our face serum designed for fair and glowing skin. Incorporate it into your daily skincare routine to unveil a radiant, youthful glow that reflects your inner vibrance."
    ],
    category: 'face',
    images: [
      img('/public/face-serum-1.png'),
      img('/public/face-serum-2.png'),
      img('/public/face-serum-3.png'),
      img('/public/face-serum-4.png'),
      img('/public/face-serum-5.png'),
      img('/public/face-serum-6.png')
    ],
    price: 345,
    comparePrice: 599,
    stock: 75,
    ingredients: ["Vitamin E", "Vitamin C"],
    usageGuide: [
      "Take 2-3 drops of Vitamin C serum on your palm",
      "Gently massage it all over your face and neck",
      "Use it twice a day (morning & night) for best results."
    ],
    isFeatured: true, 
    ratings: 4.8,
    numReviews: 45,
    sku: 'DG-FA-002',
  },
];
   
export const blogs = [
  {
    title: 'The Modern Desi Man\'s Grooming Ritual',
    slug: 'modern-desi-grooming-ritual',
    excerpt: 'Discover the 5-step routine that transforms your daily grind into a luxury ritual.',
    content: '<p>Grooming is not vanity—it is discipline. Start with charcoal cleanse, hydrate, then style with intention...</p>',
    coverImage: img('1616390323981-fd529c7d7f9a'),
    tags: ['routine', 'tips'],
    readTime: 6,
  },
  {
    title: 'Beard Care 101: From Patchy to Powerful',
    slug: 'beard-care-101',
    excerpt: 'Science-backed tips to grow, maintain, and style your beard like royalty.',
    content: '<p>Patience, oil, and balm—the holy trinity of beard mastery...</p>',
    coverImage: img('1621605815971-fbc98d665033'),
    tags: ['beard', 'guide'],
    readTime: 8,
  },
];

export const coupons = [
  {
    code: 'GABRU10',
    description: '10% off your first order',
    discountType: 'percent',
    discountValue: 10,
    minOrderAmount: 500,
    maxUses: 1000,
    expiresAt: new Date('2027-12-31'),
  },
  {
    code: 'FREESHIP',
    description: 'Flat ₹100 off',
    discountType: 'fixed',
    discountValue: 100,
    minOrderAmount: 799,
    maxUses: 500,
    expiresAt: new Date('2027-06-30'),
  },
];
