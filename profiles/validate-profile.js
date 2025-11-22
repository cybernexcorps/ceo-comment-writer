#!/usr/bin/env node
/**
 * Profile Validation Script
 * Validates JSON profile files for the CEO Comment Writer system
 * Usage: node validate-profile.js [filename]
 *        node validate-profile.js (validates all profiles in directory)
 */

const fs = require('fs');
const path = require('path');

// Required fields in every profile
const REQUIRED_FIELDS = [
  'profile_id',
  'name',
  'title',
  'company',
  'expertise',
  'communication_style',
  'tone',
  'personality_traits',
  'talking_points',
  'values',
  'speaking_patterns',
  'do_not_say',
  'preferred_structure',
  'language',
  'active'
];

// Fields that should be arrays
const ARRAY_FIELDS = [
  'expertise',
  'personality_traits',
  'talking_points',
  'values',
  'do_not_say',
  'career_highlights'
];

// Valid language codes
const VALID_LANGUAGES = ['ru', 'en'];

/**
 * Validate a single profile
 * @param {string} profilePath - Path to the profile JSON file
 * @returns {boolean} - True if valid, false otherwise
 */
function validateProfile(profilePath) {
  const filename = path.basename(profilePath);

  try {
    // Read and parse JSON
    const profileData = fs.readFileSync(profilePath, 'utf-8');
    const profile = JSON.parse(profileData);

    const errors = [];
    const warnings = [];

    // Check required fields
    for (const field of REQUIRED_FIELDS) {
      if (!profile[field] && profile[field] !== false && profile[field] !== 0) {
        errors.push(`Missing required field: ${field}`);
      }
    }

    // Check array fields are actually arrays
    for (const field of ARRAY_FIELDS) {
      if (profile[field] && !Array.isArray(profile[field])) {
        errors.push(`Field '${field}' should be an array, got: ${typeof profile[field]}`);
      }
    }

    // Check language is valid
    if (profile.language && !VALID_LANGUAGES.includes(profile.language)) {
      errors.push(`Language should be one of [${VALID_LANGUAGES.join(', ')}], got: '${profile.language}'`);
    }

    // Check expertise array has items
    if (profile.expertise && Array.isArray(profile.expertise) && profile.expertise.length === 0) {
      warnings.push('Expertise array is empty - recommend adding at least 3 areas');
    }

    // Check profile_id matches filename (without extension)
    const expectedProfileId = filename.replace('.json', '');
    if (profile.profile_id !== expectedProfileId && expectedProfileId !== 'default') {
      warnings.push(`profile_id '${profile.profile_id}' doesn't match filename '${expectedProfileId}'`);
    }

    // Check Russian fields exist if language is 'ru'
    if (profile.language === 'ru') {
      const russianFields = ['name_ru', 'title_ru', 'expertise_ru', 'communication_style_ru', 'tone_ru'];
      const missingRussianFields = russianFields.filter(field => !profile[field]);
      if (missingRussianFields.length > 0) {
        warnings.push(`Language is 'ru' but missing Russian fields: ${missingRussianFields.join(', ')}`);
      }
    }

    // Check character limits
    if (profile.communication_style && profile.communication_style.length > 500) {
      warnings.push(`communication_style is very long (${profile.communication_style.length} chars) - consider shortening`);
    }

    if (profile.preferred_structure && profile.preferred_structure.length > 500) {
      warnings.push(`preferred_structure is very long (${profile.preferred_structure.length} chars) - consider shortening`);
    }

    // Report results
    if (errors.length > 0) {
      console.error(`\n❌ ${filename}: FAILED validation`);
      errors.forEach(e => console.error(`   ERROR: ${e}`));
      if (warnings.length > 0) {
        warnings.forEach(w => console.warn(`   WARNING: ${w}`));
      }
      return false;
    } else {
      console.log(`\n✅ ${filename}: PASSED validation`);
      if (warnings.length > 0) {
        warnings.forEach(w => console.warn(`   ⚠️  WARNING: ${w}`));
      }

      // Print summary
      console.log(`   Profile: ${profile.name} (${profile.title})`);
      console.log(`   Company: ${profile.company}`);
      console.log(`   Expertise areas: ${profile.expertise ? profile.expertise.length : 0}`);
      console.log(`   Language: ${profile.language}`);
      console.log(`   Active: ${profile.active}`);

      return true;
    }
  } catch (error) {
    console.error(`\n❌ ${filename}: ERROR`);
    if (error instanceof SyntaxError) {
      console.error(`   JSON PARSE ERROR: ${error.message}`);
      console.error(`   Check for syntax errors, missing commas, or trailing commas`);
    } else {
      console.error(`   ${error.message}`);
    }
    return false;
  }
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);

  console.log('='.repeat(70));
  console.log('CEO Comment Writer - Profile Validation');
  console.log('='.repeat(70));

  let filesToValidate = [];

  if (args.length > 0) {
    // Validate specific file(s)
    filesToValidate = args.map(arg => {
      if (path.isAbsolute(arg)) {
        return arg;
      } else {
        return path.join(__dirname, arg);
      }
    });
  } else {
    // Validate all JSON files in current directory
    const profilesDir = __dirname;
    const files = fs.readdirSync(profilesDir);
    filesToValidate = files
      .filter(f => f.endsWith('.json') && f !== 'package.json')
      .map(f => path.join(profilesDir, f));
  }

  if (filesToValidate.length === 0) {
    console.log('\n⚠️  No JSON profile files found to validate');
    console.log('Usage: node validate-profile.js [filename.json]');
    process.exit(1);
  }

  console.log(`\nValidating ${filesToValidate.length} profile(s)...\n`);

  let allValid = true;
  let validCount = 0;
  let invalidCount = 0;

  for (const file of filesToValidate) {
    if (fs.existsSync(file)) {
      const isValid = validateProfile(file);
      if (isValid) {
        validCount++;
      } else {
        invalidCount++;
        allValid = false;
      }
    } else {
      console.error(`\n❌ File not found: ${file}`);
      invalidCount++;
      allValid = false;
    }
  }

  // Summary
  console.log('\n' + '='.repeat(70));
  console.log('VALIDATION SUMMARY');
  console.log('='.repeat(70));
  console.log(`Total profiles: ${filesToValidate.length}`);
  console.log(`✅ Valid: ${validCount}`);
  console.log(`❌ Invalid: ${invalidCount}`);
  console.log('='.repeat(70));

  if (allValid) {
    console.log('\n🎉 All profiles are valid!\n');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some profiles have errors. Please fix them before using.\n');
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { validateProfile };
