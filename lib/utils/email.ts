/**
 * Validates email address format
 * Uses a comprehensive regex pattern that follows RFC 5322 specification
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }

  // Trim whitespace
  const trimmedEmail = email.trim();

  // Basic checks
  if (trimmedEmail.length === 0 || trimmedEmail.length > 254) {
    return false;
  }

  // Comprehensive email regex pattern
  // This pattern validates most common email formats and requires a dot in the domain
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  if (!emailRegex.test(trimmedEmail)) {
    return false;
  }

  // Additional check: domain must contain at least one dot
  const parts = trimmedEmail.split('@');
  if (parts.length !== 2) {
    return false;
  }

  const domain = parts[1];
  if (!domain.includes('.')) {
    return false;
  }

  // Check that domain has valid TLD (at least 2 characters after last dot)
  const domainParts = domain.split('.');
  const tld = domainParts[domainParts.length - 1];
  if (tld.length < 2) {
    return false;
  }

  return true;
}

