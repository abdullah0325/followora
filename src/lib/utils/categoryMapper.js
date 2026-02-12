/**
 * Maps URL slugs to product category/occasion values
 */

// URL slug to Category mapping
export const categorySlugMap = {
  'gifts': 'GIFTS',
  'cakes': 'CAKES',
  'flowers': 'FLOWERS',
  'for-her': 'FOR HER',
  'for-him': 'FOR HIM',
  'birthday': 'BIRTHDAY',
  'anniversary': 'ANNIVERSARY',
  'love-romance': 'LOVE & ROMANCE',
  'wedding': 'WEDDING',
  'new-year': 'NEW YEAR',
  'valentine': "VALENTINE'S DAY",
  'mothers-day': "MOTHER'S DAY",
  'fathers-day': "FATHER'S DAY",
  'eid': 'EID MUBARAK',
  'ramadan': 'RAMADAN',
  'christmas': 'CHRISTMAS',
};

// URL slug to Occasion mapping
export const occasionSlugMap = {
  'birthday': 'BIRTHDAY',
  'anniversary': 'ANNIVERSARY',
  'love-romance': 'LOVE & ROMANCE',
  'wedding': 'WEDDING',
  'valentine': "VALENTINE'S DAY",
  'new-year': 'NEW YEAR',
  'mothers-day': "MOTHER'S DAY",
  'fathers-day': "FATHER'S DAY",
  'eid': 'EID MUBARAK',
  'ramadan': 'RAMADAN',
  'christmas': 'CHRISTMAS',
  'graduation': 'GRADUATION',
  'congratulations': 'CONGRATULATIONS',
  'sorry': 'SORRY',
  'thank-you': 'THANK YOU',
  'get-well-soon': 'GET WELL SOON',
};

/**
 * Convert URL slug to category value
 */
export function slugToCategory(slug) {
  return categorySlugMap[slug.toLowerCase()] || slug.toUpperCase().replace(/-/g, ' ');
}

/**
 * Convert URL slug to occasion value
 */
export function slugToOccasion(slug) {
  return occasionSlugMap[slug.toLowerCase()] || slug.toUpperCase().replace(/-/g, ' ');
}

/**
 * Normalize category/occasion name for comparison
 */
export function normalizeName(name) {
  return name.toUpperCase().trim();
}


