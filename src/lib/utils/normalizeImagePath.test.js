// Test file to verify normalizeImagePath utility works correctly

import { normalizeImagePath, isValidImagePath } from '../normalizeImagePath';

// Test cases
const testCases = [
  {
    input: 'mothers-day.jpg',
    expected: '/mothers-day.jpg',
    description: 'Relative path without slash'
  },
  {
    input: '/mothers-day.jpg',
    expected: '/mothers-day.jpg',
    description: 'Already has leading slash'
  },
  {
    input: 'https://images.unsplash.com/photo-123.jpg',
    expected: 'https://images.unsplash.com/photo-123.jpg',
    description: 'Absolute HTTPS URL'
  },
  {
    input: 'http://example.com/image.jpg',
    expected: 'http://example.com/image.jpg',
    description: 'Absolute HTTP URL'
  },
  {
    input: '//cdn.example.com/image.jpg',
    expected: '//cdn.example.com/image.jpg',
    description: 'Protocol-relative URL'
  },
  {
    input: '',
    expected: '/images/fallback.jpg',
    description: 'Empty string'
  },
  {
    input: null,
    expected: '/images/fallback.jpg',
    description: 'Null value'
  },
  {
    input: 'category/mothers-day.jpg',
    expected: '/category/mothers-day.jpg',
    description: 'Relative path with directory'
  }
];

console.log('Testing normalizeImagePath utility...\n');

let passed = 0;
let failed = 0;

testCases.forEach((test) => {
  const result = normalizeImagePath(test.input);
  const isCorrect = result === test.expected;
  
  if (isCorrect) {
    console.log(`✅ PASS: ${test.description}`);
    console.log(`   Input: ${JSON.stringify(test.input)}`);
    console.log(`   Output: ${result}\n`);
    passed++;
  } else {
    console.log(`❌ FAIL: ${test.description}`);
    console.log(`   Input: ${JSON.stringify(test.input)}`);
    console.log(`   Expected: ${test.expected}`);
    console.log(`   Got: ${result}\n`);
    failed++;
  }
});

// Test isValidImagePath
console.log('\nTesting isValidImagePath utility...\n');

const validationCases = [
  { input: '/image.jpg', expected: true, description: 'Local path with /' },
  { input: 'https://example.com/image.jpg', expected: true, description: 'HTTPS URL' },
  { input: 'http://example.com/image.jpg', expected: true, description: 'HTTP URL' },
  { input: '//cdn.example.com/image.jpg', expected: true, description: 'Protocol-relative' },
  { input: 'image.jpg', expected: false, description: 'Relative path without /' },
  { input: '', expected: false, description: 'Empty string' },
  { input: null, expected: false, description: 'Null value' }
];

validationCases.forEach((test) => {
  const result = isValidImagePath(test.input);
  const isCorrect = result === test.expected;
  
  if (isCorrect) {
    console.log(`✅ PASS: ${test.description} - ${result}`);
    passed++;
  } else {
    console.log(`❌ FAIL: ${test.description}`);
    console.log(`   Expected: ${test.expected}, Got: ${result}`);
    failed++;
  }
});

console.log(`\n\n📊 Test Results: ${passed} passed, ${failed} failed`);
