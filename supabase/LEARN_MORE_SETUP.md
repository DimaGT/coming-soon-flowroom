# Learn More Flow - Supabase Setup

## Installation

1. Open your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `migrations/002_create_learn_more_submissions.sql`
4. Run the script

## Table Structure

The `learn_more_submissions` table stores all form submissions from the "I'd Like to Learn More" flow:

- **Teacher Flow**: Stores teacher-specific questions (Q2, Q3, Q4, Q4b)
- **Guardian/Parent Flow**: Stores guardian-specific questions (Q2, Q3, Q4, Q5) and country
- **Other Flow**: Stores explanation text for users who select "Other"

## Data Fields

- `user_category`: classroom_teacher, school_staff, parent, both, or other
- `flow_type`: teacher, guardian, or other
- `email`: User's email address (optional for teachers, required for guardians)
- `country`: User's country/region (guardian flow only)
- Various question fields (teacher_q2, guardian_q2, etc.)

## Security

- Row Level Security (RLS) is enabled
- Public users can INSERT new submissions
- Public users can UPDATE existing submissions (for completing multi-step flows)
- Authenticated users can READ all submissions

## Indexes

Indexes are created on:
- `email` (for fast lookups)
- `user_category` (for filtering)
- `flow_type` (for filtering)
- `created_at` (for sorting)

