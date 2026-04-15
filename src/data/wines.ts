// ============================================
// Données mockées — Catalogue des vins
// Domaine de Valdor
// ============================================

/**
 * Interface décrivant un vin du catalogue
 */
export interface Wine {
  /** Identifiant unique */
  id: number
  /** Nom de la cuvée */
  name: string
  /** Région viticole / appellation */
  region: string
  /** Année du millésime */
  vintage: number
  /** Cépages principaux */
  cepages: string[]
  /** Prix en euros */
  price: number
  /** Description courte */
  description: string
  /** Note sur 100 (score Parker/WS) */
  rating: number
  /** Couleur CSS pour la carte (gradient accent) */
  accentColor: string
  /** Icône emoji pour la catégorie */
  icon: string
}

/**
 * Catalogue de vins mockés pour la grille
 */
export const wines: Wine[] = [
  {
    id: 1,
    name: 'Cuvée Prestige',
    region: 'Saint-Émilion Grand Cru',
    vintage: 2019,
    cepages: ['Merlot', 'Cabernet Franc'],
    price: 89,
    description: 'Un grand vin aux arômes de fruits noirs, épices douces et notes boisées élégantes.',
    rating: 95,
    accentColor: '#722F37',
    icon: '🍷',
  },
  {
    id: 2,
    name: 'Réserve du Domaine',
    region: 'Saint-Émilion Grand Cru',
    vintage: 2020,
    cepages: ['Merlot', 'Cabernet Sauvignon'],
    price: 65,
    description: 'Robe profonde, bouche veloutée avec des tanins soyeux et une finale persistante.',
    rating: 93,
    accentColor: '#5a252c',
    icon: '🍇',
  },
  {
    id: 3,
    name: 'Les Terrasses',
    region: 'Pomerol',
    vintage: 2018,
    cepages: ['Merlot'],
    price: 120,
    description: 'Expression pure du terroir argilo-calcaire, complexité aromatique exceptionnelle.',
    rating: 97,
    accentColor: '#8b3a44',
    icon: '🏆',
  },
  {
    id: 4,
    name: 'Blanc de Valdor',
    region: 'Bordeaux Blanc',
    vintage: 2022,
    cepages: ['Sauvignon Blanc', 'Sémillon'],
    price: 35,
    description: 'Fraîcheur citronnée, notes florales et minéralité sur une finale croquante.',
    rating: 90,
    accentColor: '#c8a951',
    icon: '🥂',
  },
  {
    id: 5,
    name: 'Rosé d\'Été',
    region: 'Bordeaux Rosé',
    vintage: 2023,
    cepages: ['Merlot', 'Cabernet Franc'],
    price: 22,
    description: 'Robe saumonée, arômes de fraise et pêche blanche, idéal pour l\'apéritif.',
    rating: 88,
    accentColor: '#d4838f',
    icon: '🌸',
  },
  {
    id: 6,
    name: 'Héritage 1952',
    region: 'Saint-Émilion Grand Cru',
    vintage: 2017,
    cepages: ['Merlot', 'Cabernet Franc', 'Malbec'],
    price: 195,
    description: 'Cuvée d\'exception, vieilles vignes de 70 ans, élevage 24 mois en fûts neufs.',
    rating: 98,
    accentColor: '#3d1518',
    icon: '👑',
  },
]
