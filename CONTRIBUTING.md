# Contributing to Resume Builder Dashboard

We love your input! We want to make contributing to Resume Builder Dashboard as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

## Pull Request Process

1. **Fork the repo** and create your branch from `main`
2. **Install dependencies**: `npm install`
3. **Make your changes** and test thoroughly
4. **Add tests** if you've added code that should be tested
5. **Ensure the test suite passes**: `npm run lint`
6. **Make sure your code lints**: `npm run type-check`
7. **Update documentation** if needed
8. **Submit a pull request**!

## Development Setup

### Prerequisites
- Node.js 18+ 
- npm 8+
- Git

### Local Development
```bash
# Clone your fork
git clone https://github.com/your-username/resume-builder-dashboard.git
cd resume-builder-dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # Run TypeScript checks
npm run analyze      # Analyze bundle size
```

## Code Style Guidelines

### TypeScript
- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` types when possible
- Use strict mode settings

### React Components
- Use functional components with hooks
- Follow React best practices
- Use proper prop types
- Implement error boundaries where needed

### Styling
- Use Tailwind CSS classes
- Follow responsive design principles
- Maintain accessibility standards
- Use semantic HTML elements

### File Organization
```
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── pages/              # Next.js pages
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── public/             # Static assets
```

## Commit Message Guidelines

We follow the [Conventional Commits](https://conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

### Examples
```
feat: add drag and drop for resume sections
fix: resolve PDF export issue on mobile devices
docs: update installation instructions
style: improve button hover animations
```

## Bug Reports

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/techiekamal/resume-builder-dashboard/issues/new?template=bug_report.md).

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## Feature Requests

We welcome feature requests! Please [open an issue](https://github.com/techiekamal/resume-builder-dashboard/issues/new?template=feature_request.md) with:

- **Is your feature request related to a problem?** A clear description of the problem
- **Describe the solution you'd like** A clear description of what you want to happen
- **Describe alternatives you've considered** Any alternative solutions or features
- **Additional context** Screenshots, mockups, or examples

## Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

Examples of behavior that contributes to creating a positive environment include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team. All complaints will be reviewed and investigated promptly and fairly.

## Recognition

Contributors will be recognized in our README.md file and release notes. We appreciate every contribution, no matter how small!

## Questions?

Don't hesitate to reach out if you have questions:
- Open an issue for technical questions
- Contact the maintainers for other inquiries

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to Resume Builder Dashboard!** 🎉

*Maintained with ❤️ by techiekamal21 & Connect Kreations*

---

## 💼 Career Opportunities

**Visit Connect Kreations for latest Job Opportunities and updates for internship, Full time and professional positions and more!**

🌐 **Visit:** [connectkreations.com/careers](https://connectkreations.com/careers)  
📧 **Contact:** [careers@connectkreations.com](mailto:careers@connectkreations.com)