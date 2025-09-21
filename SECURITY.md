# Security Policy

## Supported Versions

We actively support the following versions of Resume Builder Dashboard with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of Resume Builder Dashboard seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### How to Report

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to: techiekamal21@gmail.com

You should receive a response within 48 hours. If for some reason you do not, please follow up via email to ensure we received your original message.

### What to Include

Please include the requested information listed below (as much as you can provide) to help us better understand the nature and scope of the possible issue:

* Type of issue (e.g. buffer overflow, SQL injection, cross-site scripting, etc.)
* Full paths of source file(s) related to the manifestation of the issue
* The location of the affected source code (tag/branch/commit or direct URL)
* Any special configuration required to reproduce the issue
* Step-by-step instructions to reproduce the issue
* Proof-of-concept or exploit code (if possible)
* Impact of the issue, including how an attacker might exploit the issue

This information will help us triage your report more quickly.

### Preferred Languages

We prefer all communications to be in English.

## Security Measures

### Client-Side Security

Resume Builder Dashboard implements several security measures:

- **Input Sanitization**: All user inputs are sanitized to prevent XSS attacks
- **Local Storage Only**: No sensitive data is transmitted to external servers
- **Content Security Policy**: Implemented to prevent code injection
- **Secure Headers**: X-Frame-Options, X-Content-Type-Options, and other security headers

### Data Privacy

- **Local Storage**: All resume data is stored locally in the browser
- **No Server Communication**: The app works entirely offline after initial load
- **No Analytics by Default**: User tracking is opt-in only
- **No Data Collection**: We don't collect or store personal information

### Dependencies

We regularly update dependencies to patch known vulnerabilities:

- Automated dependency scanning via GitHub Dependabot
- Regular security audits with `npm audit`
- Prompt updates for critical security patches

## Security Best Practices for Users

### For End Users

1. **Keep Browser Updated**: Use the latest version of your web browser
2. **Secure Environment**: Use the app on trusted devices and networks
3. **Data Backup**: Export your resume regularly as backup
4. **Clear Data**: Clear browser data when using shared computers

### For Developers

1. **Dependency Updates**: Regularly update dependencies
2. **Security Scanning**: Run security scans before deployment
3. **Code Review**: Review all code changes for security implications
4. **Environment Variables**: Never commit sensitive data to version control

## Vulnerability Disclosure Timeline

1. **Day 0**: Vulnerability reported
2. **Day 1-2**: Initial response and acknowledgment
3. **Day 3-7**: Vulnerability assessment and reproduction
4. **Day 8-30**: Fix development and testing
5. **Day 31**: Public disclosure (if resolved) or status update

## Security Updates

Security updates will be:

- Released as patch versions (e.g., 1.0.1)
- Documented in the changelog
- Announced via GitHub releases
- Tagged with security labels

## Recognition

We appreciate the security research community's efforts to improve the security of our project. Researchers who responsibly disclose vulnerabilities will be:

- Credited in our security advisories (unless they prefer to remain anonymous)
- Listed in our Hall of Fame (if they consent)
- Provided with project swag (when available)

## Contact

For security-related questions or concerns:

- **Security Email**: techiekamal21@gmail.com
- **Maintainers**: techiekamal & Connect Kreations
- **GitHub**: [[INSERT GITHUB PROFILES]](https://github.com/techiekamal21)

## Legal

This security policy is subject to our [Terms of Service](./LICENSE) and [Privacy Policy](./PRIVACY.md).

---

**Last Updated**: December 2024
**Version**: 1.0

*Security is a shared responsibility. Thank you for helping keep Resume Builder Dashboard secure.*
