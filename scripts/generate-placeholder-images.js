/**
 * Generate placeholder images for production deployment
 * This script creates simple colored placeholder images to replace external URLs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Create directories if they don't exist
const dirs = [
  'public/images/team',
  'public/images/slideshow',
  'public/images/testimonials',
  'public/images/franchises',
  'public/images/culture'
];

dirs.forEach(dir => {
  const fullPath = path.join(rootDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✓ Created directory: ${dir}`);
  }
});

// Generate SVG placeholder function
function generateSVGPlaceholder(width, height, color, text) {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${color}"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle" dy=".3em">${text}</text>
</svg>`;
}

// Team member placeholders
const teamImages = [
  { name: 'founder.jpg', color: '#6366f1', text: 'Founder' },
  { name: 'cofounder.jpg', color: '#8b5cf6', text: 'Co-Founder' },
  { name: 'member1.jpg', color: '#ec4899', text: 'Team Member' },
  { name: 'member2.jpg', color: '#f59e0b', text: 'Team Member' },
  { name: 'member3.jpg', color: '#10b981', text: 'Team Member' },
  { name: 'member4.jpg', color: '#3b82f6', text: 'Team Member' },
];

teamImages.forEach(img => {
  const svg = generateSVGPlaceholder(900, 1200, img.color, img.text);
  fs.writeFileSync(path.join(rootDir, 'public/images/team', img.name), svg);
  console.log(`✓ Generated: team/${img.name}`);
});

// Slideshow placeholders
const slideshowImages = [
  { name: 'slide1.jpg', color: '#1e293b', text: 'Team Collaboration' },
  { name: 'slide2.jpg', color: '#334155', text: 'Office Space' },
  { name: 'slide3.jpg', color: '#475569', text: 'Business Meeting' },
  { name: 'slide4.jpg', color: '#64748b', text: 'Strategic Planning' },
];

slideshowImages.forEach(img => {
  const svg = generateSVGPlaceholder(1200, 800, img.color, img.text);
  fs.writeFileSync(path.join(rootDir, 'public/images/slideshow', img.name), svg);
  console.log(`✓ Generated: slideshow/${img.name}`);
});

// Testimonial avatars
const testimonialImages = [
  { name: 'avatar1.jpg', color: '#6366f1', text: 'EJ' },
  { name: 'avatar2.jpg', color: '#ec4899', text: 'SM' },
  { name: 'avatar3.jpg', color: '#10b981', text: 'RV' },
];

testimonialImages.forEach(img => {
  const svg = generateSVGPlaceholder(120, 120, img.color, img.text);
  fs.writeFileSync(path.join(rootDir, 'public/images/testimonials', img.name), svg);
  console.log(`✓ Generated: testimonials/${img.name}`);
});

console.log('\n✅ All placeholder images generated successfully!');
console.log('📁 Images are located in public/images/');
