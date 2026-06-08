-- Example seed data for categories and products
-- Review before running against the Neon database

INSERT INTO categories (name, slug, description) VALUES
  ('Pain Relief', 'pain-relief', 'Tablets, gels and sprays for headaches, body aches and inflammation'),
  ('Cold & Flu', 'cold-and-flu', 'Remedies for cough, cold, sore throat and flu symptoms'),
  ('Vitamins & Supplements', 'vitamins-supplements', 'Daily vitamins, minerals and dietary supplements'),
  ('Skin Care', 'skin-care', 'Moisturisers, sunscreens and treatments for common skin conditions'),
  ('First Aid', 'first-aid', 'Bandages, antiseptics and wound care essentials');

INSERT INTO products (name, slug, description, price, stock, images, is_active, category_id) VALUES
  ('Paracetamol 500mg (24 Tablets)', 'paracetamol-500mg-24-tablets', 'Fast-acting relief from pain and fever', 4.99, 250, ARRAY['paracetamol-1.jpg'], true, (SELECT id FROM categories WHERE slug = 'pain-relief')),
  ('Ibuprofen 200mg (16 Tablets)', 'ibuprofen-200mg-16-tablets', 'Anti-inflammatory pain relief tablets', 5.49, 180, ARRAY['ibuprofen-1.jpg'], true, (SELECT id FROM categories WHERE slug = 'pain-relief')),
  ('Voltaren Emulgel 50g', 'voltaren-emulgel-50g', 'Topical gel for joint and muscle pain', 12.99, 90, ARRAY['voltaren-1.jpg'], true, (SELECT id FROM categories WHERE slug = 'pain-relief')),
  ('Codral Cold & Flu Day/Night (24 Caps)', 'codral-cold-flu-day-night-24-caps', 'Combination relief for cold and flu symptoms', 9.99, 120, ARRAY['codral-1.jpg'], true, (SELECT id FROM categories WHERE slug = 'cold-and-flu')),
  ('Strepsils Honey & Lemon Lozenges (24)', 'strepsils-honey-lemon-24', 'Soothing lozenges for sore throat relief', 6.49, 200, ARRAY['strepsils-1.jpg'], true, (SELECT id FROM categories WHERE slug = 'cold-and-flu')),
  ('Vicks VapoRub 50g', 'vicks-vaporub-50g', 'Topical vapour rub for cough and cold relief', 8.99, 75, ARRAY['vicks-1.jpg'], true, (SELECT id FROM categories WHERE slug = 'cold-and-flu')),
  ('Vitamin C 1000mg (60 Tablets)', 'vitamin-c-1000mg-60-tablets', 'Immune system support supplement', 14.99, 300, ARRAY['vitc-1.jpg'], true, (SELECT id FROM categories WHERE slug = 'vitamins-supplements')),
  ('Centrum Multivitamin (100 Tablets)', 'centrum-multivitamin-100-tablets', 'Complete daily multivitamin and mineral supplement', 24.99, 150, ARRAY['centrum-1.jpg'], true, (SELECT id FROM categories WHERE slug = 'vitamins-supplements')),
  ('Fish Oil 1000mg (200 Capsules)', 'fish-oil-1000mg-200-capsules', 'Omega-3 supplement for heart and joint health', 19.99, 110, ARRAY['fishoil-1.jpg'], true, (SELECT id FROM categories WHERE slug = 'vitamins-supplements')),
  ('Cetaphil Gentle Skin Cleanser 250mL', 'cetaphil-gentle-cleanser-250ml', 'Mild daily facial cleanser for sensitive skin', 16.99, 85, ARRAY['cetaphil-1.jpg'], true, (SELECT id FROM categories WHERE slug = 'skin-care')),
  ('La Roche-Posay Anthelios SPF50+ 50mL', 'la-roche-posay-anthelios-spf50-50ml', 'High-protection sunscreen for face and body', 22.99, 60, ARRAY['anthelios-1.jpg'], true, (SELECT id FROM categories WHERE slug = 'skin-care')),
  ('Bandaid Strips Assorted (40 Pack)', 'bandaid-strips-assorted-40', 'Assorted adhesive bandages for minor wounds', 4.49, 220, ARRAY['bandaid-1.jpg'], true, (SELECT id FROM categories WHERE slug = 'first-aid')),
  ('Betadine Antiseptic Solution 100mL', 'betadine-antiseptic-100ml', 'Antiseptic solution for cleaning cuts and grazes', 11.99, 95, ARRAY['betadine-1.jpg'], true, (SELECT id FROM categories WHERE slug = 'first-aid')),
  ('Nurofen Zavance Liquid Caps (16)', 'nurofen-zavance-liquid-caps-16', 'Fast-absorbing liquid capsules for pain relief', 7.99, 0, NULL, false, (SELECT id FROM categories WHERE slug = 'pain-relief'));
