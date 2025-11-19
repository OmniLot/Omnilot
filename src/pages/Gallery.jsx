
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Star, Eye } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import GalleryItemDetail from '../components/gallery/GalleryItemDetail';

const websiteGallery = [
  {
    name: 'Fall Sales Event',
    type: 'Seasonal Promotion',
    url: 'promotion.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/2ba599e91_Whisk_dad644266ac224998c80496ca706aebfadr.jpg',
    features: ['Sales Banner', 'Lot Showcase', 'Modern Look'],
    description: 'Dynamic banner for seasonal sales events to attract customers.',
    category: 'automotive',
  },
  {
    name: 'Happy Wheels Auto',
    type: 'Family-Friendly Ads',
    url: 'familyfun.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/7744d8a43_Whisk_y2y1ido0gtnhjgzm1sy2etotm2y5qtl0idny0ym.jpg',
    features: ['Animated Characters', 'Weekly Deals', 'Engaging AI'],
    description: 'A fun, animated approach to showcase weekly deals, perfect for social media.',
    category: 'automotive',
  },
  {
    name: 'Elegance Redefined',
    type: 'Luxury Branding',
    url: 'luxury.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/9ae1eb3ec_Whisk_e2ywijmlzwozazy30izkrmytydnmrtl0mdo50yy.jpg',
    features: ['Premium Aesthetics', 'Gold Accents', 'Spotlight'],
    description: 'Sophisticated and elegant branding for high-end luxury vehicles.',
    category: 'luxury',
  },
  {
    name: 'Just Arrived',
    type: 'New Inventory Ad',
    url: 'newarrivals.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/8281a255c_Whisk_eznzmtnhvgm1mdz20ynyywotaznkrtlxq2y40cn.jpg',
    features: ['Bold Overlay', 'Clear Call-to-Action', 'Dealership Backdrop'],
    description: 'Clean and effective social media graphic for new arrivals.',
    category: 'automotive',
  },
  {
    name: '0% APR Financing',
    type: 'Financing Promotion',
    url: 'finance.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/68b5cfbc5_Whisk_qgollzyyyzn2ednj1inkzgotqwylrtljvjmx0cz.jpg',
    features: ['Financing Offer', 'Luxury Sedan', 'Showroom Feel'],
    description: 'Highlighting attractive financing options in a premium setting.',
    category: 'luxury',
  },
  {
    name: 'Premium Luxury',
    type: 'Luxury Ad Template',
    url: 'premium.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/fe2def200_Whisk_cjz3ejnibtn5mwyi1inwugotyzykrtlyetmw0yy.jpg',
    features: ['Split Design', '0% APR', 'Branded Element'],
    description: 'Elegant template for showcasing luxury vehicles and financing offers.',
    category: 'luxury',
  },
  {
    name: 'Crazy Prices',
    type: 'Retro Ad Campaign',
    url: 'retro.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/3cdd23a0c_Whisk_ugozqjyyyty4egn40ynjnmytkzmzqtlwi2yh1ym.jpg',
    features: ['Cartoon Style', 'Neon Signage', 'High Energy'],
    description: 'A high-energy, retro-style ad to grab attention for special pricing.',
    category: 'automotive',
  },
  {
    name: 'Happy Motors',
    type: 'Family Car Ad',
    url: 'happymotors.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/f9b0018cf_Whisk_qgmijznjvmzmvdo40sylrjytkznxqtlkz2yw0sy.jpg',
    features: ['Illustrated Family', 'Approachable Style', 'Dealership Focused'],
    description: 'Friendly and relatable ad targeting families.',
    category: 'automotive',
  },
  {
    name: 'Midnight Sale',
    type: 'Cyberpunk Theme',
    url: 'cyber.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/874138b66_Whisk_1ido2egzmv2yjrtytuwz5iwlirmm00in1mgntyj.jpg',
    features: ['Neon Aesthetics', 'Futuristic Cars', 'Night Setting'],
    description: 'A cutting-edge, cyberpunk-themed promotion for a late-night sales event.',
    category: 'commercial',
  },
  {
    name: 'Summer Specials',
    type: 'Retro Wave Theme',
    url: 'summer.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/c4b09052b_Whisk_3m2ywgdmkfwoyugntijzyktlif2n00yn1mdztig.jpg',
    features: ['80s Vibe', 'Palm Trees', 'Neon Grid'],
    description: 'Retro-futuristic theme for summer sales, evoking a sense of nostalgia.',
    category: 'automotive',
  },
  {
    name: 'Anime Sportscar',
    type: 'Anime-style Ad',
    url: 'anime.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/2dc21ef14_Whisk_5qtywity0mdn0e2ytuwmhjwl5gzy00in3ymytm2.jpg',
    features: ['Japanese Anime Art', 'Dynamic Action', 'Red Sportscar'],
    description: 'Eye-catching anime style, perfect for targeting a younger demographic.',
    category: 'automotive',
  },
  {
    name: 'Experience Excellence',
    type: 'Luxury Landing Page',
    url: 'excellence.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/4c07b7580_Whisk_if2n5egzjljyzkdztmwnwewlifgm00inifdztij.jpg',
    features: ['Minimalist Design', 'Elegant Typography', 'Learn More CTA'],
    description: 'A clean, high-end hero section for a luxury brand website.',
    category: 'luxury',
  },
  {
    name: 'All-American Dealership',
    type: 'Classic Americana',
    url: 'americana.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/03ebbe336_Whisk_1q2y1ijmlnwzhjtotmgm1iwlllzn00sm0qwotkz.jpg',
    features: ['Retro Signage', 'Large Inventory Lot', 'Community Focus'],
    description: 'Classic American dealership look, emphasizing history and community trust.',
    category: 'automotive',
  },
  {
    name: 'Find Your Road',
    type: 'Overland/Adventure Theme',
    url: 'adventure.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/67becdd8d_Whisk_wijmmbjm4mzm5umntqzmxgtl5qmm00imifwntat.jpg',
    features: ['Inspirational Slogan', 'Off-road Vehicle', 'Scenic Nature'],
    description: 'Lifestyle-focused ad for adventure vehicles and overlanding trucks.',
    category: 'rv',
  },
  {
    name: 'Street Culture',
    type: 'Urban/Tuner Theme',
    url: 'tuner.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/4945b7fab_Whisk_1kjy4utolvjykltytmjniltlziwm00iz5qtntcd.jpg',
    features: ['Graffiti Style', 'Drifting Car', 'Edgy Vibe'],
    description: 'An ad targeting the import tuner and street racing culture scene.',
    category: 'automotive',
  },
  {
    name: 'F-150 Infographic',
    type: 'Informational Graphic',
    url: 'infographic.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/5ed86daae_Whisk_2umn5atmhzmzhndmtitnkjwl5gtz00sn1umztuz.jpg',
    features: ['Data Visualization', 'Key Specs', 'Clean Design'],
    description: 'An infographic breaking down the key features of the Ford F-150.',
    category: 'commercial',
  },
  {
    name: 'Prices Slashed',
    type: 'Mascot Promotion',
    url: 'slashed.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/7036b4b21_Whisk_yewy2gty4yjm1mgztygo0ktl5emz00inkztytmg.jpg',
    features: ['Superhero Mascot', 'Bold Signage', 'Action-Oriented'],
    description: 'An energetic and humorous promotion featuring a superhero mascot.',
    category: 'automotive',
  },
  {
    name: 'Top Dollar for Trades',
    type: 'Trade-in Campaign',
    url: 'tradein.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/d67007cb1_Whisk_0utn0ijylntzyqmntqwzjhtlxyty00sylrgztcz.jpg',
    features: ['Funny Mascot', 'Clear Offer', 'Relatable Humor'],
    description: 'A memorable and funny ad campaign focused on offering top dollar for trade-ins.',
    category: 'automotive',
  },
  {
    name: 'Sasquatch-Sized Savings',
    type: 'RV Promotion',
    url: 'sasquatch.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/ac24249e1_Whisk_1edz3yjymn2mkjtmty2m1gtlzqwm00imljtytmw.jpg',
    features: ['Humorous Mascot', 'RV Showcase', 'Catchy Slogan'],
    description: 'A unique and humorous ad for RV savings, featuring a Sasquatch mascot.',
    category: 'rv',
  },
  {
    name: 'Trade In. Trade Up.',
    type: 'Trade-in Program',
    url: 'tradeup.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/4ef812ded_Whisk_92b28851ba34ee5a394467d0b7948d3ddr.jpg',
    features: ['Before & After', 'Clear Message', 'Brand Logo'],
    description: 'A powerful visual comparison for a "trade in, trade up" program.',
    category: 'automotive',
  },
  {
    name: 'Adventure Wheels RV',
    type: 'RV Lifestyle',
    url: 'rvlife.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/772a27112_Whisk_7d5062354eed0d197f7403f75bde1082dr.jpg',
    features: ['Scenic View', 'Branded Flag', 'Sunset'],
    description: 'Inspirational lifestyle ad for an RV dealership, focusing on adventure.',
    category: 'rv',
  },
  {
    name: 'RV Family Camping',
    type: 'Family RV Ad',
    url: 'familyrv.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/88bc808f1_Whisk_53a9694ae474c6d851e424fb081f95eadr.jpg',
    features: ['Family Moment', 'Campfire Setting', 'Branded Flag'],
    description: 'Heartwarming ad showing a family enjoying the RV lifestyle.',
    category: 'rv',
  },
  {
    name: 'Drive The Future',
    type: 'Modern Luxury Ad',
    url: 'future.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/dc198c6b1_Whisk_e1e504bc8a9d230a2f1494b12acb7eb3dr.jpg',
    features: ['Night Shot', 'Red & Blue Lights', 'Sleek Car'],
    description: 'A modern, tech-focused ad for a luxury vehicle, set in a futuristic urban environment.',
    category: 'luxury',
  },
  {
    name: '2024 Rear Living RV',
    type: 'RV Showcase',
    url: 'rvshowcase.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/295e379e8_Whisk_yijnwewoingzzmtmtiwn2iwlwmty00czkjwnte2.jpg',
    features: ['Outdoor Kitchen', '7,500 LBS', 'Rear Living'],
    description: 'Modern RV with a rear living floorplan and an outdoor kitchen.',
    category: 'rv',
  },
  {
    name: '2024 Vortex 420',
    type: 'Marine Showcase',
    url: 'marinesales.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/2a0a2d1a0_Whisk_lvwoxudn1kdozkdztizmmjwlljwz00inxywotqm.jpg',
    features: ['42 FT Length', '18,500 LBS', 'Elite Marine'],
    description: 'High-performance Vortex 420 boat, perfect for the open water.',
    category: 'marine',
  },
  {
    name: 'Ford Bronco Domination',
    type: 'Urban Off-road Ad',
    url: 'bronco.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/6677a7f2d_Whisk_mbtowizm3mgn4etntczmjfwljrtm00ynhzwytet.jpg',
    features: ['Neon Graffiti', 'Off-road Dominance', 'Urban Ability'],
    description: 'A stylish ad showcasing the Ford Bronco in an urban night setting.',
    category: 'automotive',
  },
  {
    name: 'Built to Go Anywhere',
    type: 'Truck Ad',
    url: 'truckad.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/22e9d2f37_Whisk_eabf1c95635c3f3bbe442eb0789441d6dr.jpg',
    features: ['American Flag', 'Mudding', 'Off-road Truck'],
    description: 'Patriotic and rugged ad for a powerful off-road truck.',
    category: 'commercial',
  },
  {
    name: 'What a Deal!',
    type: 'Sales Promotion Comic',
    url: 'comicdeal.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/f4981ff93_Whisk_698cf08e66e36c99c764e546ba54d1e0dr.jpg',
    features: ['Comic Style', 'Sales Process', 'Happy Customers'],
    description: 'A comic-style graphic showing a happy couple closing a deal.',
    category: 'automotive',
  },
  {
    name: '80s Classic Car Meet',
    type: 'Retro Car Ad',
    url: '80sclassics.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/5a82835cb_Whisk_itmljwzwqzyyetnj1inkhdotq2njrtlknwn00cn.jpg',
    features: ['80s Classics', 'Neon Glow', 'Retro Vibe'],
    description: 'A retro-themed ad featuring classic cars from the 1980s.',
    category: 'automotive',
  },
  {
    name: 'Wheely Good Deals',
    type: 'Mascot Promotion',
    url: 'wheelygood.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/214719737_Whisk_mjy4qzyjvmn3i2mw0cn5ygotudzzqtljzwo40sz.jpg',
    features: ['Dog Mascot', 'Cartoon Style', 'Family Friendly'],
    description: 'A friendly and fun ad featuring a cartoon dog mascot and cars.',
    category: 'automotive',
  },
  {
    name: 'Unstoppable Strength',
    type: 'Heavy Duty Truck Ad',
    url: 'truckstrength.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/fa0486919_Whisk_df40e01e5e975dd84a04701cde325820dr.jpg',
    features: ['Towing Power', 'Rugged Design', 'RV Hauling'],
    description: 'Advertisement highlighting the immense towing capacity of a heavy-duty truck.',
    category: 'commercial',
  },
  {
    name: 'Sunset Deals',
    type: 'Dealership Lot',
    url: 'sunsetdeals.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/af8191284_Whisk_cbe17b3e65e92838eab4fa6c14e87f89dr.jpg',
    features: ['Golden Hour', 'Large Inventory', 'Inviting Atmosphere'],
    description: 'Showcasing a wide selection of vehicles during a beautiful sunset.',
    category: 'automotive',
  },
  {
    name: 'Roberts Auto Sales',
    type: 'Local Dealership',
    url: 'robertsauto.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/42c6f1362_Whisk_c6f9af1f355a07b9272491a6b8467668dr.jpg',
    features: ['Family Owned', 'Community Trusted', 'Clean Lot'],
    description: 'A classic view of a local, family-owned car dealership.',
    category: 'automotive',
  },
  {
    name: 'AutoNation Lot',
    type: 'National Brand',
    url: 'autonation.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/3c31c8b4d_Whisk_3d4f7343595cbb885b14d920be50315edr.jpg',
    features: ['Modern Building', 'Brand Recognition', 'Extensive Inventory'],
    description: 'The clean and modern storefront of a national dealership brand.',
    category: 'automotive',
  },
  {
    name: 'AutoMax Nightlife',
    type: 'Used Car Lot',
    url: 'automax.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/17fffe771_Whisk_722da8a94fb900cb1ea49f204a2e603ddr.jpg',
    features: ['Night View', 'Bright Signage', 'Urban Setting'],
    description: 'An evening shot of a bustling used car lot in the city.',
    category: 'automotive',
  },
  {
    name: 'Pontoon Paradise',
    type: 'Marine Sales',
    url: 'pontoons.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/1ec074518_Whisk_cf846b4161f16dd85704a6e856c810c0dr.jpg',
    features: ['Boat Inventory', 'Marina Setting', 'Summer Fun'],
    description: 'A wide selection of pontoon boats ready for summer adventures.',
    category: 'marine',
  },
  {
    name: 'RV Adventures Family',
    type: 'RV Lifestyle',
    url: 'rvadventures.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/6c4fdaa46_Whisk_0c4116e78d65274bf7a4270c67957f24dr.jpg',
    features: ['Family Camping', 'Scenic Views', 'Outdoor Living'],
    description: 'A family enjoying a campfire in front of their RV, highlighting the lifestyle.',
    category: 'rv',
  },
  {
    name: 'Electric Future',
    type: 'EV Showcase',
    url: 'evfuture.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/210e59d62_Whisk_129fc44d91d7299a7d9455a1d843872bdr.jpg',
    features: ['Futuristic Design', 'Neon Showroom', 'EV Technology'],
    description: 'A sleek electric vehicle in a modern, neon-lit showroom.',
    category: 'luxury',
  },
  {
    name: 'Mega Sale Event',
    type: 'Sales Promotion',
    url: 'megasale.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/56fe02e57_Whisk_5e41a81f4ee9c1babce4999b662c8611dr.jpg',
    features: ['Discount Banner', 'Sunset Backdrop', 'Modern SUV'],
    description: 'Promotional graphic for a large dealership sales event.',
    category: 'automotive',
  },
  {
    name: 'Customer Handover',
    type: 'Customer Experience',
    url: 'handoff.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/94bc99fbf_Whisk_9e5e24f5044cd659ad7452c0721bdf52dr.jpg',
    features: ['Key Handover', 'Happy Customer', 'Professional Service'],
    description: 'A happy customer receiving keys to their new car.',
    category: 'automotive',
  },
  {
    name: 'Luxury Car Owner',
    type: 'High-End Sale',
    url: 'luxurymotors.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/fae2d089e_Whisk_63a9fe8283b9e5dab3d45bc54ed97e87dr.jpg',
    features: ['Porsche', 'Happy Owner', 'Luxury Motors'],
    description: 'A proud new owner standing with his luxury sports car.',
    category: 'luxury',
  },
  {
    name: 'RV Tour',
    type: 'RV Sales',
    url: 'rvtour.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/33c37c155_Whisk_18049a9a6557e208e8048a9f64acb0bfdr.jpg',
    features: ['Senior Couple', 'RV Salesman', 'Happy Campers'],
    description: 'A salesman showing a happy couple their new RV.',
    category: 'rv',
  },
  {
    name: 'Unmissable Deals',
    type: 'Marine Promotion',
    url: 'boatdeals.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/6debc6dd0_Whisk_ebbcb12d13bfae395f349fb291851218dr.jpg',
    features: ['Speed Boat', 'Ocean View', 'Sales Event'],
    description: 'Catch the best deals on high-speed boats this season.',
    category: 'marine',
  },
  {
    name: 'Adventure Awaits',
    type: 'Pontoon Lifestyle',
    url: 'moonlit.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/13feafa25_Whisk_ecaa1b52d381b8cb4fd444f34c1c9372dr.jpg',
    features: ['Night Boating', 'Full Moon', 'Pontoon Boat'],
    description: 'Experience the magic of night boating. Your next adventure awaits.',
    category: 'marine',
  },
  {
    name: 'Summer Sales Event',
    type: 'Seasonal Marine Sale',
    url: 'summersale.example.com',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf9d9e9b87b9439c9b8a97/aa4727efa_Whisk_a7c9a9c601bbf4c9e2746b1b88a36e52dr.jpg',
    features: ['Sunset Cruise', 'Speed Boat', 'Summer Deals'],
    description: 'Don\'t miss our summer sales event on luxury speed boats.',
    category: 'marine',
  }
];

const categories = ['All', 'Automotive', 'RV', 'Luxury', 'Commercial', 'Marine'];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredSite, setHoveredSite] = useState(null);
  const [selectedSite, setSelectedSite] = useState(null); // New state for modal

  const filteredSites = selectedCategory === 'All' 
    ? websiteGallery 
    : websiteGallery.filter(site => site.category === selectedCategory.toLowerCase());

  const handleViewDetails = (site) => {
    setSelectedSite(site);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-slate-800 text-white relative overflow-hidden">
      <style>{`
        .glow-border {
          position: relative;
        }
        
        .glow-border::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 16px;
          background: linear-gradient(45deg, transparent, #3b82f6, transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }
        
        .glow-border:hover::before {
          opacity: 1;
        }

        .scan-line {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent);
          transition: left 0.6s ease;
        }
        
        .card-hover:hover .scan-line {
          left: 100%;
        }

        .floating-particles {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }
        
        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #3b82f6;
          border-radius: 50%;
          opacity: 0;
          animation: float-particle 6s infinite linear;
        }
        
        @keyframes float-particle {
          0% { transform: translateY(100vh) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-10px) translateX(20px); opacity: 0; }
        }
        
        .hologram-text {
          background: linear-gradient(45deg, #60a5fa, #3b82f6, #1d4ed8, #60a5fa);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent; /* Added for broader compatibility */
          animation: hologram 3s ease-in-out infinite;
        }
        
        @keyframes hologram {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>

      {/* Floating particles background */}
      <div className="floating-particles">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="particle" 
            style={{ 
              left: `${Math.random() * 100}%`, 
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }} 
          />
        ))}
      </div>

      {/* Background effects */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border border-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-purple-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-16 h-16 border border-cyan-400 rounded-full animate-pulse delay-2000"></div>
      </div>

      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Content <span className="hologram-text">Gallery</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore stunning dealership websites and ad campaigns built with Omni.Lot AI technology. 
            Each one is uniquely designed and optimized for maximum conversions.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`relative overflow-hidden transition-all duration-300 ${
                selectedCategory === category 
                  ? "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/25 text-white border-blue-600" 
                  : "bg-blue-600/80 hover:bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Uniform Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredSites.map((site, index) => (
            <Card 
              key={index} 
              className="overflow-hidden bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-500 group cursor-pointer relative glow-border card-hover aspect-w-16 aspect-h-9"
              onMouseEnter={() => setHoveredSite(index)}
              onMouseLeave={() => setHoveredSite(null)}
              onClick={() => handleViewDetails(site)} // Open modal on card click
            >
              <div className="scan-line"></div>
              <div className="relative h-full">
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: `url(${site.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                  <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/20 transition-all duration-500"></div>
                </div>

                <CardContent className="absolute inset-0 p-4 flex flex-col justify-end relative z-10">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                          {site.name}
                        </h3>
                        <p className="text-gray-400 text-sm">{site.type}</p>
                      </div>
                      <div className="flex items-center text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-xs mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {site.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                      {site.features.slice(0, 2).map((feature, featureIndex) => (
                        <span key={featureIndex} className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full border border-blue-500/30">
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300">
                      <span className="text-xs text-gray-500">{site.url}</span>
                      <Button 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent the parent card's click from firing
                          handleViewDetails(site); // Open modal on button click
                        }}
                        className="bg-blue-600/80 hover:bg-blue-500 border-blue-400/30 hover:shadow-lg hover:shadow-blue-400/25 transition-all duration-300"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>

                {/* Hover particles */}
                {hoveredSite === index && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-2 right-2 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
                    <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping delay-200"></div>
                    <div className="absolute top-1/2 left-2 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-400"></div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-pulse"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Build Your AI-Powered Website?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join hundreds of dealerships who've transformed their online presence with Omni.Lot
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-500 text-lg px-8 py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
                Start Building Now
              </Button>
              <Button variant="outline" className="border-blue-400 text-blue-300 hover:bg-blue-400/10 hover:text-white text-lg px-8 py-3 rounded-xl transition-all duration-300">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {selectedSite && (
          <GalleryItemDetail 
            item={selectedSite}
            onClose={() => setSelectedSite(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
