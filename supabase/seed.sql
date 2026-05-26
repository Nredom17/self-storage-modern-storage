-- Modern Storage® — Self Storage Hub — initial data seed
-- Run AFTER 0001_init.sql.
-- Safe to re-run: uses INSERT ... ON CONFLICT DO UPDATE so the table will
-- always match the values below.

-- =====================================================================
-- Site settings (single row)
-- =====================================================================
insert into public.site_settings (id, phone_display, phone_href, reservation_url)
values (
  1,
  '501-910-0096',
  'tel:+15019100096',
  '/#locations'
)
on conflict (id) do update set
  phone_display   = excluded.phone_display,
  phone_href      = excluded.phone_href,
  reservation_url = excluded.reservation_url;

-- =====================================================================
-- Locations (10 rows)
-- =====================================================================
insert into public.locations (slug, name, city, state, zip, region, street_address, phone, lat, lon, image, alt, badges, reservation_url, sort_order, active)
values
  (
    'west-little-rock',
    'Modern Storage® West Little Rock',
    'Little Rock', 'AR', '72211', 'Little Rock Area',
    '601 Autumn Rd', '501-910-0096',
    34.748, -92.376,
    '/images/modern-storage-west-little-rock-facility-exterior.jpg',
    'Modern Storage® West Little Rock self-storage facility exterior in Little Rock Arkansas',
    array['Climate-Controlled','Drive-Up Access','Free Moving Truck','Se Habla Español'],
    'https://www.modernstorage.com/self-storage-little-rock-ar-f5198',
    10, true
  ),
  (
    'shackleford',
    'Modern Storage® Shackleford',
    'Little Rock', 'AR', '72205', 'Little Rock Area',
    '3400 South Shackleford Road', '501-910-0096',
    34.7466, -92.4007,
    '/images/modern-storage-shackleford-facility-exterior.jpg',
    'Modern Storage® Shackleford self-storage facility exterior in Little Rock Arkansas',
    array['Climate-Controlled','Drive-Up Access','Free Moving Truck'],
    'https://www.modernstorage.com/3400-south-shackleford-road-little-rock-ar-72205',
    20, true
  ),
  (
    'riverdale',
    'Modern Storage® Riverdale',
    'Little Rock', 'AR', '72202', 'Little Rock Area',
    '2510 Cantrell Rd', '501-910-0096',
    34.7506, -92.2796,
    '/images/modern-storage-riverdale-facility-exterior.jpg',
    'Modern Storage® Riverdale self-storage facility exterior at sunset in Little Rock Arkansas',
    array['Climate-Controlled','Business Storage','Ground-Floor Access','Free Moving Truck'],
    'https://www.modernstorage.com/2510-cantrell-rd-little-rock-ar-72202',
    30, true
  ),
  (
    'north-little-rock',
    'Modern Storage® North Little Rock',
    'North Little Rock', 'AR', '72116', 'North Little Rock',
    '3100 North Hills Blvd', '501-910-0096',
    34.802, -92.260,
    '/images/modern-storage-north-little-rock-facility-night.jpg',
    'Modern Storage® North Little Rock self-storage facility at night in North Little Rock Arkansas',
    array['Climate-Controlled','Drive-Up Access','Business Storage','Free Moving Truck'],
    'https://www.modernstorage.com/self-storage-north-little-rock-ar-f8184',
    40, true
  ),
  (
    'maumelle',
    'Modern Storage® Maumelle Blvd',
    'North Little Rock', 'AR', '72113', 'North Little Rock',
    '9100 Maumelle Blvd', '501-910-0096',
    34.838, -92.343,
    '/images/modern-storage-maumelle-facility-aerial.jpg',
    'Modern Storage® Maumelle Blvd self-storage facility aerial view in North Little Rock Arkansas',
    array['Climate-Controlled','Boat/RV Storage','Free Moving Truck'],
    'https://www.modernstorage.com/self-storage-maumelle-ar-f9458',
    50, true
  ),
  (
    'bryant',
    'Modern Storage® Bryant',
    'Bryant', 'AR', '72022', 'Bryant',
    '300 Dell Dr', '501-910-0096',
    34.596, -92.489,
    '/images/modern-storage-bryant-facility-sunset.jpg',
    'Modern Storage® Bryant self-storage facility exterior at sunset in Bryant Arkansas',
    array['Climate-Controlled','Drive-Up Access','Boat/RV Storage','Free Moving Truck'],
    'https://www.modernstorage.com/self-storage-bryant-ar-f8249',
    60, true
  ),
  (
    'hot-springs',
    'Modern Storage® Hot Springs',
    'Hot Springs', 'AR', '71913', 'Hot Springs',
    '2138 Higdon Ferry Rd', '501-910-0096',
    34.504, -93.055,
    '/images/modern-storage-hot-springs-facility-exterior.jpg',
    'Modern Storage® Hot Springs self-storage facility exterior in Hot Springs Arkansas',
    array['Climate-Controlled','Drive-Up Access','Free Moving Truck'],
    'https://www.modernstorage.com/self-storage-hot-springs-ar-f5404',
    70, true
  ),
  (
    'bentonville',
    'Modern Storage® Bentonville',
    'Bentonville', 'AR', '72712', 'Northwest Arkansas',
    '700 SW 14th St', '501-910-0096',
    36.372, -94.208,
    '/images/modern-storage-bentonville-facility-exterior.jpg',
    'Modern Storage® Bentonville self-storage facility exterior in Bentonville Arkansas',
    array['Climate-Controlled','Business Storage','Ground-Floor Access','Free Moving Truck'],
    'https://www.modernstorage.com/self-storage-bentonville-ar-f3125',
    80, true
  ),
  (
    'springdale',
    'Modern Storage® Springdale',
    'Springdale', 'AR', '72762', 'Northwest Arkansas',
    '4555 W Sunset Ave', '501-910-0096',
    36.187, -94.129,
    '/images/modern-storage-springdale-facility-with-sculpture.jpg',
    'Modern Storage® Springdale self-storage facility exterior with red sculpture in Springdale Arkansas',
    array['Climate-Controlled','Drive-Up Access','Free Moving Truck'],
    'https://www.modernstorage.com/self-storage-springdale-ar-f2741',
    90, true
  ),
  (
    'lowell',
    'Modern Storage® Lowell',
    'Lowell', 'AR', '72745', 'Northwest Arkansas',
    '1407 W Monroe Ave', '501-910-0096',
    36.255, -94.140,
    '/images/modern-storage-lowell-facility-night.jpg',
    'Modern Storage® Lowell self-storage facility exterior at night in Lowell Arkansas',
    array['Climate-Controlled','Boat/RV Storage','Business Storage','Free Moving Truck'],
    'https://www.modernstorage.com/1407-w-monroe-ave-lowell-ar-72745',
    100, true
  )
on conflict (slug) do update set
  name            = excluded.name,
  city            = excluded.city,
  state           = excluded.state,
  zip             = excluded.zip,
  region          = excluded.region,
  street_address  = excluded.street_address,
  phone           = excluded.phone,
  lat             = excluded.lat,
  lon             = excluded.lon,
  image           = excluded.image,
  alt             = excluded.alt,
  badges          = excluded.badges,
  reservation_url = excluded.reservation_url,
  sort_order      = excluded.sort_order,
  active          = excluded.active;
