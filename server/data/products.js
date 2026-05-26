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

export const bundles = [
  {
    name: "Ultimate Men's Grooming Set",
    slug: 'ultimate-mens-grooming-set',
    description: [
      "The Ultimate Men's Grooming Kit is the perfect gift for any man who likes to stay well-groomed! Featuring a variety of essential items such as a grooming kit, as well as added extras like Desii Gabru, it contains everything he needs to stay handsome and well-groomed all year-round.",
      "Inside this carefully curated kit, discover a premium grooming experience that goes beyond the basics. The precision grooming kit offers everything he needs for a sharp, well-maintained look, from trimmers to scissors, ensuring every detail is perfected. But the Ultimate Men's Grooming Kit doesn't stop there it goes the extra mile with the inclusion of Desii Gabru, a distinctive touch that adds a hint of unique flair to his grooming routine.",
      "Desii Gabru brings a touch of confidence and individuality, making this kit more than just a collection of tools it's a statement of personal style. The carefully selected extras go beyond the expected, creating an all-encompassing grooming solution that reflects the modern man's commitment to self-care and refinement. Whether it's a gift for a special occasion or a gesture to show appreciation, the Ultimate Men's Grooming Kit is a versatile and thoughtful choice.",
      "Elevate his grooming routine with a touch of luxury and practicality, ensuring he stays handsome and well-groomed throughout the seasons. Make every day a good hair day, and gift him the confidence that comes with a meticulously maintained appearance.",
    ],
    productDetails:[
      "Complete Grooming Solution: This all-in-one kit has everything a man needs for a comprehensive grooming experience, covering everything from beard care and styling to hair maintenance and personal grooming.",
      "Everything You Need, All in One Place: This comprehensive grooming kit eliminates the hassle of searching for individual products by providing a curated selection of high-quality grooming essentials designed to cover all aspects of a man's grooming routine.",
      "Thoughtful Gifting Made Simple: Whether for birthdays, holidays, anniversaries, or just because, this grooming kit serves as a practical and stylish gift choice that shows you care about his grooming needs and overall well-being."
    ],
    images: [
      img('/public/bundle-1.png'),
      img('/public/bundle-2.png')
    ],
    products: [
      'desii-gabru-beard-shiner', 
      'desii-gabru-face-wash', 
      'desii-gabru-hair-wax',
      'desii-gabru-face-serum', 
      'desii-gabru-hair-serum'
    ],
    price: 1449,
    stock: 10,
    comparePrice: 2799,
    ratings: 4.9,
    numReviews: 100,
    isTrending: true,
    isFeatured: true,
  },
  {
    name: "BEARD OIL & BEARD SHINER COMBO",
    slug: "beard-oil-beard-shiner-combo",
    description: [
      "Desii Gabru Beard Oil & Beard Shiner Combo - The perfect combination for a well-groomed and stylish beard!",
      "This dynamic duo combines the nourishing power of our premium beard oil with the stylish finish of our signature beard shiner, creating the ultimate grooming experience for the man who demands both health and style for his beard.",
      "The beard oil, crafted with a unique blend of natural ingredients, nourishes your beard from the roots, promoting healthy growth and eliminating itchiness and dryness.",
      "The beard shiner adds that perfect touch of shine and definition, ensuring your beard looks sharp, well-maintained, and effortlessly stylish."
    ],
    productDetails: [
      "Double the Care, Double the Style: Experience the best of both worlds with our combo pack that delivers comprehensive beard care and a touch of sophisticated shine.",
      "Nourish and Shine: The perfect synergy of moisturizing beard oil and defining beard shiner ensures your beard stays healthy, hydrated, and impeccably styled."
    ],
    images: [
      img('/public/beard-oil-shiner-combo.png')
    ],
    products: [
      'desii-gabru-beard-shiner',
      'desii-gabru-beard-growth-oil',
    ],
    price: 549,
    stock: 100,
    comparePrice: 998,
    ratings: 4.8,
    numReviews: 300,
    isTrending: false,
    isFeatured: false,
  },
  {
    name: "FACE WASH & FACE SERUM COMBO",
    slug: "face-wash-face-serum-combo",
    description: [
      "Desii Gabru Face Wash & Face Serum Combo - The perfect combination for a healthy and radiant complexion!",
      "This dynamic duo combines the cleansing power of our premium face wash with the nourishing properties of our signature face serum, creating the ultimate grooming experience for the man who demands both health and radiance for his skin.",
      "The face wash, crafted with a unique blend of natural ingredients, cleanses your skin from impurities and excess oil, promoting healthy skin and eliminating dryness.",
      "The face serum adds that perfect touch of hydration and radiance, ensuring your skin looks fresh, well-maintained, and effortlessly glowing."
    ],
    productDetails: [
      "Double the Care, Double the Radiance: Experience the best of both worlds with our combo pack that delivers comprehensive skin care and a touch of sophisticated glow.",
      "Cleanse and Radiate: The perfect synergy of moisturizing face wash and defining face serum ensures your skin stays healthy, hydrated, and impeccably glowing."
    ],
    images: [
      img('/public/face-wash-serum-combo.png')
    ],
    products: [
      'desii-gabru-face-wash',
      'desii-gabru-face-serum',
    ],
    price: 549,
    stock: 100,
    comparePrice: 998,
    ratings: 4.8,
    numReviews: 300,
    isTrending: false,
    isFeatured: false,
  },
  {
    name: "FACE WASH, BEARD SHINER & HAIR WAX",
    slug: "face-wash-beard-shiner-hair-wax-combo",
    description: [
      "Desii Gabru Face Wash, Beard Shiner & Hair Wax Combo - The perfect combination for a healthy, groomed, and stylish look!",
      "This dynamic trio combines the cleansing power of our premium face wash, the nourishing and styling benefits of our signature beard shiner, and the texturizing and holding power of our expert hair wax, creating the ultimate grooming experience for the man who demands both health and style for his beard and hair.",
      "The face wash, crafted with a unique blend of natural ingredients, cleanses your skin from impurities and excess oil, promoting healthy skin and eliminating dryness.",
      "The beard shiner adds that perfect touch of shine and definition, ensuring your beard looks sharp, well-maintained, and effortlessly stylish.",
      "The hair wax, formulated with premium ingredients, provides superior hold and definition, allowing you to style your hair with precision and confidence."
    ],
    productDetails: [
      "All-in-One Grooming Solution: This comprehensive combo pack delivers everything you need for a complete grooming experience, covering your face, beard, and hair in one convenient package.",
      "Triple Action Benefits: Experience the combined power of cleansing, nourishing, and styling, ensuring every aspect of your grooming routine is covered with premium products."
    ],
    images: [
      img('/public/face-wash-beard-shiner-hair-wax-combo.png')
    ],
    products: [
      'desii-gabru-face-wash',
      'desii-gabru-beard-shiner',
      'desii-gabru-hair-wax',
    ],
    price: 948,
    stock: 100,
    comparePrice: 1348,
    ratings: 4.8,
    numReviews: 300,
    isTrending: false,
    isFeatured: false,
  },
  {
    name: "HAIR WAX & HAIR SERUM COMBO",
    slug: "hair-wax-hair-serum-combo",
    description: [
      "Desii Gabru Hair Wax & Hair Serum Combo - The perfect combination for a healthy and stylish hair!",
      "This dynamic duo combines the styling power of our premium hair wax with the nourishing properties of our signature hair serum, creating the ultimate grooming experience for the man who demands both health and style for his hair.",
      "The hair wax, crafted with a unique blend of natural ingredients, styles your hair with superior hold and definition, ensuring your hair looks sharp, well-maintained, and effortlessly stylish.",
      "The hair serum adds that perfect touch of hydration and radiance, ensuring your hair looks fresh, well-maintained, and effortlessly glowing."
    ],
    productDetails: [
      "Double the Care, Double the Style: Experience the best of both worlds with our combo pack that delivers comprehensive hair care and a touch of sophisticated style.",
      "Style and Shine: The perfect synergy of moisturizing hair wax and defining hair serum ensures your hair stays healthy, hydrated, and impeccably styled."
    ],
    images: [
      img('/public/hair-wax-hair-serum-combo.png')
    ],
    products: [
      'desii-gabru-hair-wax',
      'desii-gabru-hair-serum',
    ],
    price: 899,
    stock: 100,
    comparePrice: 1348,
    ratings: 4.8,
    numReviews: 300,
    isTrending: false,
    isFeatured: false,
  }
]

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
    isFeatured: true,
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
    isTrending: true,
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
    isFeatured: true,
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
    isFeatured:false,
    isTrending:false,
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
    productDetails: [
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
    isTrending: true,
    isFeatured: false,
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
    productDetails: [
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
    isTrending: true,
    isFeatured: true,
    ratings: 4.8,
    numReviews: 45,
    sku: 'DG-FA-002',
  },
  {
    name: 'Desii Gabru Face Cleanser Plus Moisturizer',
    slug: 'desii-gabru-face-cleanser-plus-moisturizer',
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
    productDetails: [
      "Refreshing Face Wash:",
      "Desii Gabru Face Wash, enriched with Orange and Neem Extract, offers a refreshing cleansing experience that leaves your skin revitalized and rejuvenated.",

      "Oil Control with Orange Extract:",
      "Experience the natural oil-controlling properties of Orange Extract. Our Face Wash helps regulate excess oil production, leaving your skin feeling fresh and balanced.",

      "Pimple-Fighting Neem Extract:",
      "Infused with Neem Extract, this face wash is a powerful ally against pimples and acne. Neem's antibacterial properties help cleanse your skin and prevent breakouts, promoting a clear complexion.",

      "Gentle Cleansing:",
      "Enjoy gentle yet effective cleansing with Desii Gabru Face Wash. The carefully selected ingredients ensure a thorough cleanse without stripping your skin of its natural moisture.",

      "Refreshing Citrus Fragrance:",
      "Immerse yourself in the invigorating citrus fragrance of our face wash. The refreshing scent adds a delightful touch to your skincare routine, leaving you feeling energized and ready to face the day.",
    ],
    category: 'face',
    images: [
      img('/public/face-moisturizer-1.png'),
      img('/public/face-moisturizer-2.png'),
      img('/public/face-moisturizer-3.png'),
      img('/public/face-moisturizer-4.png'),
      img('/public/face-moisturizer-5.png'),
      img('/public/face-moisturizer-6.png')
    ],
    price: 329,
    comparePrice: 599,
    stock: 150,
    ingredients: ["Orange Extract", "Neem Extract"],
    usageGuide: [
      "Squeeze the desire amount of face wash on your palm",

      "Massage gently on your face in circular motion",

      "Rinse thoroughly with water"
    ],
    
    isFeatured: false,
    isTrending: false,
    ratings: 5.0,
    numReviews: 43,
    sku: 'DG-FA-003',
  },
  {
    name: 'Desii Gabru De-Tan Face Pack',
    slug: 'desii-gabru-de-tan-face-pack',
    description: [
      "Desii Gabru De-Tan Face Pack that works on reinvigorating the dead and damaged cells of UV affected skin. Bursting with the energizing and replenishing properties of Neem extract, Multani Mitti, Cucumber extract, Peppermint oil and Aloe vera, the detan face pack casts its magic spell on the deeper layers. Multani Mitti deeply nourishes the skin for a soft, supple and more glowing appearance. Its skin-renewing brightening formula reduces tan and effectively works on treating uneven skin tone caused by sun damage to give your skin a brighter and radiant look. The pack holds absolute freedom from parabens, sulfates, silicones, Petrolatum ad Artificial Colors.",

      "What it does?",
      "Stubborn tan is removed and the underneath skin cells are energized and activated.",
      "Skin is softer and smoother to touch and feels amply nourished.",
      "Enhanced improvement in skin texture and brightness.",
      "With regular application, any signs of tan, dark patches and blotches are considerably diminished."
    ],
    productDetails: [
      "Effective De-Tanning:",
      "Formulated to reduce tan and enhance your natural glow, restoring your skin's radiance.",

      "Deep Cleansing Action:",
      "Helps remove impurities and excess oil, leaving your face fresh and revitalized.",
      
      "Hydrating Formula:",
      "Infused with moisturizing agents to keep your skin hydrated and prevent dryness.",

      "Easy Application:",
      "Lightweight cream that spreads easily and rinses off effortlessly for a hassle-free skincare routine.",

      "Suitable for All Skin Types:",
      "Gentle formula ideal for sensitive, oily, and combination skin.",
    ],
    category: 'face',
    images: [
      img('/public/face-detanpack-1.png'),
      img('/public/face-detanpack-2.png'),
      img('/public/face-detanpack-3.png'),
      img('/public/face-detanpack-4.png'),
      img('/public/face-detanpack-5.png'),
      img('/public/face-detanpack-6.png')
    ],
    price: 345,
    comparePrice: 599,
    stock: 150,
    ingredients: ["Multani Mitti", "Neem Extract", "Aloe Vera", "Sunflower Oil", "Cucumber"],
    usageGuide: [
      "Wash your face and pat it dry",
      "Take a pea-sized amount of the cream",
      "Apply small dots of the cream all over your face and neck",
      "Gently massage in circular motions"
    ],
    isTrending: false,
    isFeatured: false,
    ratings: 5.0,
    numReviews: 43,
    sku: 'DG-FA-004',
  },
  {
    name: 'Desii Gabru De-Tan Face Scrub',
    slug: 'desii-gabru-de-tan-face-scrub',
    description: [
      "Desii Gabru De-Tan Face Scrub your new go-to for achieving a flawless, sun-kissed glow! Get rid of stubborn tan lines and uneven skin tone caused by sun exposure. An award-winning product with Moisture lock action - Unlike other De-Tan Face Scrub, this De-Tan Face Scrub does not make the skin dry and delivers instant results guaranteed in 3-4 uses.",

      "This is a specially formulated skincare product designed to effectively remove tan and restore your skin's natural radiance, enriched with natural ingredients like Coffee seed powder, green tea extract, Almond oil, Aloe vera, Rose water and Liquorice extract offer a soothing feel to the skin. These combinations offer tan-free, healthy, and radiating skin. Gentle enough to use daily. This D Tan Pack is the perfect addition to your skincare routine. So why wait? Treat your skin to the nourishment it deserves, and get ready to glow like never before!",

      "What it does?",

      "Exfoliates dead skin cells: Desii Gabru De-Tan Face Scrub helps to slough off dead skin cells that can clog pores, making your skin look dull, tired, and uneven. Regular use of this scrub can help to reveal a smoother, more radiant complexion.",

      "Deep Cleansing: This professional De-Tan Face Scrub deeply cleanses the skin by unclogging the pores and removing dirt, impurities, and excess oil. It helps to keep the skin clean and healthy.",

      "Even Skin Tone: With regular use, the Desii Gabru De-Tan Face Scrub Professional Pack helps to even out the skin tone by reducing the appearance of dark spots and pigmentation. It helps to reveal brighter and more radiant skin.",

      "Suitable for All Skin Types: This professional pack is for all skin types, including sensitive skin. It is gentle on the skin and does not cause any irritation or dryness."
    ],
    productDetails: [
      "Effective Exfoliation:",
      "Designed to gently exfoliate and remove dead skin cells, helping to reveal a smoother and brighter complexion.",

      "De-Tan Formula:",
      "Aims to address the appearance of tan and uneven skin tone, promoting a more radiant and refreshed look.",

      "Natural Ingredients:",
      "Contains a blend of natural exfoliants and soothing ingredients to enhance skin texture while minimizing irritation.",

      "Suitable for All Skin Types:",
      "Formulated to be gentle and effective on various skin types, including sensitive skin.",

      "Dermatologist Tested:",
      "Tested for safety and efficacy, ensuring a reliable addition to your skincare routine."
    ],
    category: 'face',
    images: [
      img('/public/face-detanscrub-1.png'),
      img('/public/face-detanscrub-2.png'),
      img('/public/face-detanscrub-3.png'),
      img('/public/face-detanscrub-4.png'),
      img('/public/face-detanscrub-5.png'),
      img('/public/face-detanscrub-6.png')
    ],
    price: 345,
    comparePrice: 599,
    stock: 150,
    ingredients: ["Coffee", "Aloe Vera", "Almond Oil", "Rose Water"],
    usageGuide: [
      "Wet your face and pat it gently with a towel.",
      "Squeeze out a small amount of face wash onto your palm.",
      "Massage it onto your face and neck using light, circular motions.",
      "Rinse off thoroughly with water and pat dry."
    ],
    isTrending: false,
    isFeatured: false,
    ratings: 5.0,
    numReviews: 43,
    sku: 'DG-FA-005',
  },
  {
    name: "Desii Gabru Dominant",
    slug:"desii-gabru-dominant",
    description:[
      "Dominant Perfume is an assertive and powerful fragrance designed for those who command attention and leave a lasting impression. The scent opens with a bold fusion of spicy black pepper and zesty bergamot, leading into a heart of intoxicating leather and smoky tobacco. The base is a masterful blend of rich oud, sensual musk, and warm amber, creating a fragrance that is both intense and unforgettable.",
      "Fragrance Notes: Black Pepper, Aloe Vera & Lavender for a refined, masculine touch"
    ],
    productDetails:[
      "Commanding & Powerful Fragrance: A bold scent for men who lead with confidence.",
      "Premium Notes for a Strong Appeal: Features Black Pepper, Aloe Vera & Lavender for a refined, masculine touch.",
      "Eau de Parfum for Lasting Performance: High fragrance concentration ensures all-day wear.",
      "Perfect for Business & Formal Settings: Ideal for meetings, corporate events & professional settings.",
      "Skin-Friendly Formula: Infused with natural extracts, making it safe for everyday use.  "
    ],
    category:'perfume',
    images:[
      img('/public/perfume-dominant-1.png'),
      img('/public/perfume-dominant-2.png'),
      img('/public/perfume-dominant-3.png'),
      img('/public/perfume-dominant-4.png'),
      img('/public/perfume-dominant-5.png'),
      
      ],
    price: 899,
    comparePrice: 2499,
    stock: 150,
    ingredients: ["Coffee", "Aloe Vera", "Almond Oil", "Rose Water"],
    usageGuide: [
      "Moisturize your skin before applying your fragrance",  
      "Spritz your fragrance onto pulse points i.e wrist, neck and collar bone",
      "Do not rub your wrists. Let your fragrance develop naturally"
    ],
    ratings: 4.8,
    numReviews: 245,
    isFeatured:true,
    isTrending:true,
    sku: 'DG-PR-001',
  },
  {
    name:"Desii Gabru ILLICIT MAN",
    slug:"desii-gabru-illicit-man",
    description:[
      "Illicit Man Perfume is designed for the risk-taker, the rule-breaker, and the man who lives life on his own terms. This fragrance embodies the spirit of rebellion and the allure of the forbidden. Each spray envelops you in an aura of mystery and magnetism, making it perfect for nighttime adventures and intimate encounters. The harmonious blend of spicy, floral, and woody notes ensures you stand out in any crowd..",
      "Fragrance Notes: Black Pepper, Lavender & Lemon for a refined, masculine touch "
    ],
    productDetails:[
      "Daring & Magnetic Scent: Designed for men who love bold, powerful fragrances.",
      "Premium Ingredients: A perfect blend of Black Pepper, Lavender & Lemon, creating a spicy-fresh scent.",
      "Eau de Parfum for All-Day Wear: High fragrance concentration ensures long-lasting performance.",
      "Ideal for Nightlife & Special Events: Perfect for clubs, high-energy parties, and power meetings.",
      "Gentle on Skin: Infused with natural extracts for a smooth, irritation-free application."
    ],
    category:'perfume',
    images:[
      img('/public/perfume-illicit-1.png'),
      img('/public/perfume-illicit-2.png'),
      img('/public/perfume-illicit-3.png'),
      img('/public/perfume-illicit-4.png'),
      img('/public/perfume-illicit-5.png'),
      
      ],
    price: 799,
    comparePrice: 2499,
    stock: 150,
    ingredients: ["Coffee", "Aloe Vera", "Almond Oil", "Rose Water"],
    usageGuide: [
      "Moisturize your skin before applying your fragrance",  
      "Spritz your fragrance onto pulse points i.e wrist, neck and collar bone",
      "Do not rub your wrists. Let your fragrance develop naturally"
    ],
    isTrending: false,
    isFeatured: true ,
    ratings: 4.8,
    numReviews: 245,
    sku: 'DG-PR-002',
  },
  {
    name: "Desii Gabru Night Shade",
    slug:"desii-gabru-night-shade",
    description:[
      "Night Shade Perfume captures the essence of mystery and elegance with its intoxicating blend of dark, floral, and woody notes. This fragrance opens with a burst of black currant and bergamot, leading into a heart of midnight jasmine and velvet rose. The base is a rich and sensual mix of patchouli, amber, and musk, creating a deep and lingering aroma that captivates the senses.",
      "Fragrance Notes: Black Currant, Bergamot, Midnight Jasmine, Velvet Rose, Patchouli, Amber & Musk for a refined, masculine touch "
    ],
    productDetails:[
      "Bold & Mysterious Scent: A deep, sensual fragrance crafted for modern men who love an enigmatic aura.",
      "Premium Fragrance Notes: Infused with Patchouli, Citrus & Cucumber for a refreshing yet intense appeal.",
      "Long-Lasting Formula: High-concentration Eau de Parfum for extended wear throughout the day and night.",
      "Perfect for Special Occasions: Ideal for date nights, parties, and evening events, leaving a lasting impression.",
      "Skin-Friendly & Safe: Formulated with natural extracts, ensuring a smooth and irritation-free experience."
    ],
    category:'perfume',
    images:[
      img('/public/perfume-nightshade-1.png'),
      img('/public/perfume-nightshade-2.png'),
      img('/public/perfume-nightshade-3.png'),
      img('/public/perfume-nightshade-4.png'),
      img('/public/perfume-nightshade-5.png'),
      
      ],
    price: 1099,
    comparePrice: 2499,
    stock: 150,
    ingredients: ["Coffee", "Aloe Vera", "Almond Oil", "Rose Water"],
    usageGuide: [
      "Moisturize your skin before applying your fragrance",  
      "Spritz your fragrance onto pulse points i.e wrist, neck and collar bone",
      "Do not rub your wrists. Let your fragrance develop naturally"
    ],
    ratings: 4.8,
    numReviews: 245,
    isFeatured:true,
    isTrending:true,
    sku: 'DG-PR-003',
  },
  {
    name: 'Desii Gabru More Man',
    slug: 'desii-gabru-more-man',
    description:[
      "More Man Perfume is a celebration of masculinity and sophistication, crafted for the man who embraces his multifaceted nature. This invigorating fragrance opens with a refreshing burst of grapefruit and crisp green apple, moving into a heart of aromatic sage and earthy geranium. The base is a rich and enduring blend of cedarwood, warm vanilla, and tonka bean, creating a scent that is both dynamic and enduring.",
      "Fragrance Notes: Geranium, Cedarwood, Vetiver, Sandalwood, Sage, Grapefruit, Bergamot, Black Pepper & Tonka Bean for a refined, masculine touch "
    ],
    productDetails:[
      "FRESH & CONFIDENT SCENT: Keeps you feeling fresh all day.",
      "ENERGIZING FRAGRANCE: Blended with Geranium, Cedarwood, Vetiver, Sandalwood, Sage, Grapefruit, Bergamot, Black Pepper & Tonka Bean.",
      "LONG-LASTING FORMULA: All-day wear without reapplying.",
      "EVERYDAY VERSATILITY: Great for work, casual, or social outings.",
      "GENTLE ON SKIN: Infused with natural, skin-safe ingredient"
    ],
    category:'perfume',
    images:[
      img('/public/perfume-moreman-1.png'),
      img('/public/perfume-moreman-2.png'),
      img('/public/perfume-moreman-3.png'),
      img('/public/perfume-moreman-4.png'),
      img('/public/perfume-moreman-5.png'),
      
      ],
    price: 799,
    comparePrice: 2499,
    stock: 150,
    ingredients: ["Cedarwood","Sage","Grapefruit","Bergamot","Black Pepper","Tonka Bean"],
    usageGuide: [
      "Moisturize your skin before applying your fragrance",  
      "Spritz your fragrance onto pulse points i.e wrist, neck and collar bone",
      "Do not rub your wrists. Let your fragrance develop naturally"
    ],
    ratings: 4.8,
    numReviews: 245,
    isFeatured:false,
    isTrending:false,
    sku: 'DG-PR-004',
  }
];

export const blogs = [
  {
    title: 'Decoding Fragrance: Finding Your Signature Scent',
    slug: 'decoding-fragrance',
    excerpt: 'Stop buying cologne blindly. Learn how to pick a scent that matches your personality.',
    content: '<p>Selecting the right fragrance is a subtle yet powerful tool in your personal branding arsenal. A signature scent is often the first thing people notice and the last thing they remember about you. Many men make the mistake of choosing a cologne based on a quick sniff at a department store, ignoring how the scent interacts with their unique body chemistry over several hours. To truly master this, you need to understand the concept of fragrance notes—top, heart, and base. Top notes provide the initial impact, heart notes define the personality of the scent, and base notes provide the longevity. By investing time in learning which families—woody, citrus, spicy, or aquatic—align with your personality and the environments you frequent, you can curate a collection that elevates your presence. Remember, the goal is not to fill a room when you walk in, but to leave a lingering, sophisticated impression that invites people closer.</p>',
    coverImage: 'http://googleusercontent.com/image_collection/image_retrieval/15995016452586614625_0',
    tags: ['fragrance', 'lifestyle'],
    readTime: 5,
  },
  {
    title: 'Skinimalism: Why Less is More for Men',
    slug: 'skinimalism-for-men',
    excerpt: 'Simplify your shelf. Three products, three minutes, flawless results.',
    content: '<p>In the world of skincare, more is not always better. Skinimalism is the antidote to the overwhelming 10-step routines often promoted in magazines, focusing instead on efficiency, quality, and effectiveness. For the modern man, a sustainable routine is one he will actually stick to every single day. By narrowing your focus to three pillars—cleansing, moisturizing, and sun protection—you address the fundamental needs of your skin without unnecessary complexity. A gentle cleanser removes dirt without stripping essential oils, a lightweight moisturizer hydrates and strengthens the skin barrier, and a daily broad-spectrum sunscreen acts as your most important anti-aging tool. This minimalist approach not only saves you time in the morning but also reduces the risk of irritation caused by layering too many active ingredients. Consistency is the true secret to healthy skin, and a simple, manageable routine ensures you remain consistent for years to come.</p>',
    coverImage: 'http://googleusercontent.com/image_collection/image_retrieval/15995016452586614625_1',
    tags: ['skincare', 'minimalism'],
    readTime: 4,
  },
  {
    title: 'The Art of the Wet Shave',
    slug: 'art-of-wet-shaving',
    excerpt: 'Ditch the electric trimmer for a week and master the classic safety razor.',
    content: '<p>While electric trimmers offer convenience, they often fall short of the precision and skin-soothing benefits of a traditional wet shave. Embracing the safety razor is a commitment to a ritual that transforms a mundane chore into a meditative, high-end experience. The process begins with proper preparation: softening the hair follicles with warm water and a quality pre-shave oil. Using a high-quality shaving brush and cream creates a rich, protective lather that cushions the skin against the blade, significantly reducing the chances of irritation, razor burn, and those frustrating ingrown hairs. As you learn the correct angle and pressure, you will find that a safety razor provides a closer, more comfortable shave than any multi-blade cartridge ever could. Beyond the physical results, the wet shave forces you to slow down and focus, providing a quiet, introspective moment before the chaos of the day begins. It is a timeless skill that connects you to generations of men who understood that true style is found in the details.</p>',
    coverImage: 'http://googleusercontent.com/image_collection/image_retrieval/15995016452586614625_2',
    tags: ['shaving', 'classic'],
    readTime: 7,
  },
  {
    title: 'Hair Texture Matters: Choosing the Right Pomade',
    slug: 'hair-pomade-guide',
    excerpt: 'Matte, shine, or dry? Match your product to your hair type.',
    content: '<p>The secret to great hair isn’t just a good cut; it is choosing the product that complements your natural hair texture and the style you wish to achieve. Many men fail to get the desired results simply because they are using a heavy wax on fine hair, or a light cream on thick, unruly hair. To achieve control and longevity in your style, you must understand your product labels. For men with fine hair, look for texturizing powders or lightweight clays that add volume without weighing it down. If you have thick, coarse hair, reach for high-hold pomades or waxes that offer firm control throughout the day. Furthermore, consider the finish—do you want the classic high-shine look of a traditional gel, or the modern, natural appeal of a matte finish? By understanding how different formulas interact with your specific hair type, you can stop fighting your hair and start working with it to achieve the perfect style effortlessly every single day.</p>',
    coverImage: 'http://googleusercontent.com/image_collection/image_retrieval/15995016452586614625_3',
    tags: ['hair', 'styling'],
    readTime: 5,
  },
  { title: 'Sunscreen: The Non-Negotiable Step', 
    slug: 'sunscreen-guide-men', 
    excerpt: 'Don\'t let the sun age you prematurely. Why daily SPF is your best investment.', 
    content: '<p>It is not just for the beach. UV rays are the number one cause of skin aging...</p>', 
    coverImage: img('1556228453-efd6c1ff047f'), 
    tags: ['skincare', 'health'], 
    readTime: 4 },
  { title: 'Combating Dry Skin in Winter', 
    slug: 'winter-skincare-men', 
    excerpt: 'Keep your face from cracking when the temperature drops.', 
    content: '<p>Switch to a heavier cream and avoid long, scorching showers...</p>', 
    coverImage: img('1548690312-e3b507d8c541'), 
    tags: ['skincare', 'seasonal'], 
    readTime: 5 },
  { title: 'The Truth About Anti-Aging', slug: 'anti-aging-for-men', excerpt: 'It is never too late to start a prevention protocol.', content: '<p>Retinol, Vitamin C, and consistency. That is the winning formula...</p>', coverImage: img('1515377905703-c478be9c3a1d'), tags: ['skincare', 'aging'], readTime: 9 },
  { title: 'Choosing the Right Beard Shape', slug: 'beard-shape-guide', excerpt: 'Square, round, or oval? Shape your beard to flatter your face.', content: '<p>Align your beard lines with your jaw structure for a sharper silhouette...</p>', coverImage: img('1524805444758-089113d48a6d'), tags: ['beard', 'styling'], readTime: 6 },
  { title: 'Essential Grooming Tools for Every Man', slug: 'grooming-kit-essentials', excerpt: 'The 7 items you should always have in your dopp kit.', content: '<p>From a reliable trimmer to a high-quality nail clipper, quality matters...</p>', coverImage: img('1596755638016-568470a25990'), tags: ['tools', 'essentials'], readTime: 5 },
  { title: 'Managing Oily Skin and Breakouts', slug: 'oily-skin-tips', excerpt: 'Stop the shine without stripping your skin barrier.', content: '<p>The secret is balance, not aggression. Use a gentle cleanser and a light moisturizer...</p>', coverImage: img('1608248597259-b1d50c766e4a'), tags: ['skincare', 'acne'], readTime: 6 },
  { title: 'Scalp Care: The Foundation of Healthy Hair', slug: 'scalp-health', excerpt: 'Dandruff and itchiness start at the root. Fix them today.', content: '<p>Treat your scalp like your skin. Exfoliate, nourish, and cleanse...</p>', coverImage: img('1550948398-35ed06742a78'), tags: ['hair', 'scalp'], readTime: 5 },
  { title: 'The Psychology of Looking Good', slug: 'grooming-psychology', excerpt: 'How personal grooming impacts your confidence and career.', content: '<p>When you look sharp, you feel capable. It is a psychological edge that is hard to ignore...</p>', coverImage: img('1519085360753-af0119f7cbe7'), tags: ['lifestyle', 'mindset'], readTime: 4 },
  { title: 'Post-Workout Grooming Hacks', slug: 'gym-grooming-tips', excerpt: 'Clean up fast after the gym to avoid sweat-induced acne.', content: '<p>Pack a gym-friendly cleanser and always change your shirt immediately...</p>', coverImage: img('1534438327276-14e5300c3a48'), tags: ['routine', 'fitness'], readTime: 4 },
  { title: 'How to Properly Use Beard Oil', slug: 'beard-oil-tutorial', excerpt: 'Are you applying it to your skin or just the hair?', content: '<p>Massage it into the skin underneath, or you are missing the point of beard oil...</p>', coverImage: img('1571776358406-38379c670a21'), tags: ['beard', 'guide'], readTime: 4 },
  { title: 'Sustainable Grooming Choices', slug: 'eco-friendly-grooming', excerpt: 'Look great while reducing your environmental footprint.', content: '<p>Look for refillable bottles and brands that prioritize plastic-free packaging...</p>', coverImage: img('1542601906990-b4d3fb778089'), tags: ['sustainability', 'tips'], readTime: 5 },
  { title: 'Nighttime Skin Repair', slug: 'night-routine', excerpt: 'Your skin repairs itself while you sleep. Here is how to assist it.', content: '<p>Use a serum with active ingredients before you hit the pillow...</p>', coverImage: img('1500648767791-00dcc994a43e'), tags: ['skincare', 'routine'], readTime: 5 },
  { title: 'Mastering the Messy Look', slug: 'textured-hair-styling', excerpt: 'Casual, not sloppy. How to style effortless hair.', content: '<p>Use a texturizing powder and work it in with your fingers, not a comb...</p>', coverImage: img('1590086782792-428605333f81'), tags: ['hair', 'styling'], readTime: 6 },
  { title: 'The Grooming Rules for Travel', slug: 'travel-grooming', excerpt: 'Stay fresh on the go with these TSA-friendly essentials.', content: '<p>Stick to solids and minis to avoid losing your favorite products at security...</p>', coverImage: img('1469854523086-cc02fe5d8800'), tags: ['tips', 'travel'], readTime: 5 },
  { title: 'Beard Trimming: The Precision Guide', slug: 'beard-trimming-guide', excerpt: 'Don\'t go freehand. Learn how to use guards and combs.', content: '<p>Start with a longer guard than you think you need. You can always take more off...</p>', coverImage: img('1560753066-272036725287'), tags: ['beard', 'tools'], readTime: 7 },
  { title: 'Ingredients to Avoid in Grooming', slug: 'toxic-ingredients', excerpt: 'Why you should check the label before you buy.', content: '<p>Parabens, sulfates, and synthetic fragrances might be hurting your skin...</p>', coverImage: img('1595152772835-21967482a60a'), tags: ['skincare', 'advice'], readTime: 6 },
  { title: 'Caring for Your Eyebrows', slug: 'eyebrow-maintenance', excerpt: 'Clean up the unibrow without looking unnatural.', content: '<p>Use tweezers sparingly and focus only on the stray hairs...</p>', coverImage: img('1556228578-0d85b1a4d571'), tags: ['tips', 'face'], readTime: 3 },
  { title: 'The Benefits of Exfoliation', slug: 'exfoliation-guide', excerpt: 'Why twice a week is the sweet spot for smooth skin.', content: '<p>Remove dead skin cells to reveal a brighter, fresher complexion...</p>', coverImage: img('1548690312-e3b507d8c541'), tags: ['skincare', 'routine'], readTime: 5 },
  { title: 'Cologne Layering Basics', slug: 'cologne-layering', excerpt: 'Creating a custom scent profile that is uniquely yours.', content: '<p>Start with something light, then add a deeper, muskier scent on top...</p>', coverImage: img('1563258387-9d5f03c3b8d4'), tags: ['fragrance', 'tips'], readTime: 6 },
  { title: 'The Importance of a Sharp Haircut', slug: 'haircut-importance', excerpt: 'Your haircut can change your entire face shape.', content: '<p>Find a barber who understands your head shape and hair texture...</p>', coverImage: img('1512314887307-55079a295c52'), tags: ['hair', 'guide'], readTime: 5 },
  { title: 'Dealing with Sensitive Skin', slug: 'sensitive-skin-tips', excerpt: 'Calm the irritation with the right products.', content: '<p>Avoid fragrances and alcohols; stick to soothing ingredients like aloe...</p>', coverImage: img('1543322771-4608c02c65a7'), tags: ['skincare', 'advice'], readTime: 6 },
  { title: 'Hand and Nail Care for Men', slug: 'hand-nail-care', excerpt: 'Groomed hands make a strong first impression.', content: '<p>Keep nails trimmed and use a hand cream to prevent dryness...</p>', coverImage: img('1544816155-12df9643f363'), tags: ['tips', 'lifestyle'], readTime: 4 },
  { title: 'How to Choose the Right Face Wash', slug: 'choosing-cleanser', excerpt: 'Gel, cream, or foam? Match it to your skin type.', content: '<p>Don’t use bar soap on your face—it is too harsh for delicate skin...</p>', coverImage: img('1556228578-0d85b1a4d571'), tags: ['skincare', 'guide'], readTime: 4 },
  { title: 'The Grooming Benefits of Tea Tree Oil', slug: 'tea-tree-benefits', excerpt: 'Nature’s antiseptic for skin and hair.', content: '<p>Great for treating acne or a flaky scalp, but use it diluted...</p>', coverImage: img('1560753066-272036725287'), tags: ['tips', 'natural'], readTime: 5 },
  { title: 'Mastering the Clean Shave Look', slug: 'clean-shave-tips', excerpt: 'How to avoid razor bumps and ingrown hairs.', content: '<p>Always shave with the grain and never skip the pre-shave oil...</p>', coverImage: img('1599305445674-8d197607a72d'), tags: ['shaving', 'tips'], readTime: 6 },
  { title: 'Understanding Your Hair Type', slug: 'hair-type-guide', excerpt: 'Fine, coarse, curly, or straight? Adapt your routine.', content: '<p>Curly hair needs moisture, while fine hair needs lightweight products...</p>', coverImage: img('1562322140-8baeecece3df'), tags: ['hair', 'guide'], readTime: 5 },
  { title: 'The Role of Diet in Skin Health', slug: 'diet-and-skin', excerpt: 'Glowing skin starts with what you eat, not just what you apply.', content: '<p>Hydration and antioxidants are the keys to a clear complexion...</p>', coverImage: img('1512621776951-a57141f2eefd'), tags: ['health', 'lifestyle'], readTime: 7 },
  { title: 'Choosing a Signature Beard Style', slug: 'beard-style-guide', excerpt: 'Goatee, full beard, or stubble? Finding your look.', content: '<p>Consider your profession and personal style when choosing a beard length...</p>', coverImage: img('1524805444758-089113d48a6d'), tags: ['beard', 'styling'], readTime: 6 },
  { title: 'Essential Oils in Grooming', slug: 'essential-oils-guide', excerpt: 'Benefits of using natural oils for your skin and hair.', content: '<p>Lavender for soothing, sandalwood for scent, jojoba for hydration...</p>', coverImage: img('1571776358406-38379c670a21'), tags: ['natural', 'tips'], readTime: 6 },
  { title: 'Combating Dark Circles', slug: 'dark-circles-fix', excerpt: 'Look well-rested, even after a long night.', content: '<p>Use a caffeine-infused eye cream to tighten and brighten the area...</p>', coverImage: img('1500648767791-00dcc994a43e'), tags: ['skincare', 'tips'], readTime: 4 },
  { title: 'The Grooming Habits of Successful Men', slug: 'successful-habits', excerpt: 'Why discipline in the bathroom leads to discipline in the boardroom.', content: '<p>It is about showing respect to yourself before starting your day...</p>', coverImage: img('1519085360753-af0119f7cbe7'), tags: ['lifestyle', 'mindset'], readTime: 5 },
  { title: 'Sustainable Beard Care', slug: 'sustainable-beard', excerpt: 'Eco-friendly products for the conscious man.', content: '<p>Bamboo brushes and plastic-free oils are the future of grooming...</p>', coverImage: img('1542601906990-b4d3fb778089'), tags: ['beard', 'sustainability'], readTime: 5 },
  { title: 'Summer Grooming Essentials', slug: 'summer-grooming', excerpt: 'Beat the heat with sweat-proof routines.', content: '<p>Lightweight moisturizers and high-SPF sunscreen are your best friends...</p>', coverImage: img('1556228453-efd6c1ff047f'), tags: ['seasonal', 'tips'], readTime: 5 },
  { title: 'Proper Towel Care', slug: 'towel-care', excerpt: 'Stop using dirty towels on your clean face.', content: '<p>Change your face towel every two days to prevent bacteria buildup...</p>', coverImage: img('1544816155-12df9643f363'), tags: ['hygiene', 'tips'], readTime: 3 },
  { title: 'How to Fix Bad Hair Days', slug: 'bad-hair-days', excerpt: 'Quick fixes when your hair won\'t cooperate.', content: '<p>Reach for a cap, use a sea salt spray, or re-wet and restyle...</p>', coverImage: img('1590086782792-428605333f81'), tags: ['hair', 'tips'], readTime: 4 },
  { title: 'Skincare for Active Lifestyles', slug: 'active-lifestyle-skin', excerpt: 'Protect your skin against wind, sun, and sweat.', content: '<p>Use a barrier-repairing moisturizer to counteract outdoor damage...</p>', coverImage: img('1534438327276-14e5300c3a48'), tags: ['skincare', 'fitness'], readTime: 6 },
  { title: 'The Correct Order for Skincare', slug: 'skincare-layering', excerpt: 'Does it matter which product you apply first?', content: '<p>Yes—go from thinnest (serum) to thickest (cream/oil)...</p>', coverImage: img('1601049541245-090288a6d713'), tags: ['skincare', 'guide'], readTime: 5 },
  { title: 'Dealing with Dry Lips', slug: 'lip-care-tips', excerpt: 'Chapped lips are never a good look.', content: '<p>Exfoliate with a washcloth and use a non-waxy, nourishing balm...</p>', coverImage: img('1543322771-4608c02c65a7'), tags: ['skincare', 'tips'], readTime: 3 },
  { title: 'Why You Need a Night Routine', slug: 'why-night-routine', excerpt: 'It is the most important part of your skincare process.', content: '<p>Cleaning off the day’s pollution is non-negotiable for clear skin...</p>', coverImage: img('1500648767791-00dcc994a43e'), tags: ['skincare', 'routine'], readTime: 5 },
  { title: 'Grooming for Your Wedding Day', slug: 'wedding-grooming', excerpt: 'Be the best version of yourself for the big day.', content: '<p>Start your routine 3 months out—don’t try anything new last minute...</p>', coverImage: img('1512314887307-55079a295c52'), tags: ['lifestyle', 'tips'], readTime: 8 },
  { title: 'Maintaining Your Cologne Collection', slug: 'cologne-storage', excerpt: 'Keep your scents from expiring.', content: '<p>Store them in a cool, dark place, away from sunlight and humidity...</p>', coverImage: img('1563258387-9d5f03c3b8d4'), tags: ['fragrance', 'tips'], readTime: 4 },
  { title: 'The Benefits of Facial Massage', slug: 'facial-massage', excerpt: 'Improve circulation and reduce puffiness.', content: '<p>Use a gua sha or your fingers to lift and sculpt your face...</p>', coverImage: img('1543322771-4608c02c65a7'), tags: ['skincare', 'tips'], readTime: 6 },
  { title: 'Choosing the Perfect Razor', slug: 'razor-guide', excerpt: 'Safety razor vs. cartridge: What is better?', content: '<p>Cartridges are convenient, but safety razors provide a better finish...</p>', coverImage: img('1599305445674-8d197607a72d'), tags: ['shaving', 'tools'], readTime: 6 },
  { title: 'Building Your First Routine', slug: 'first-routine', excerpt: 'Starting your journey to better grooming made easy.', content: '<p>Keep it simple. Cleanser, moisturizer, SPF. You are halfway there...</p>', coverImage: img('1601049541245-090288a6d713'), tags: ['routine', 'beginner'], readTime: 4 }
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
