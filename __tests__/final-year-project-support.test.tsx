/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FinalYearProjectSupportPage from '../app/(root)/final-year-project-support/page';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    path: ({ children, ...props }: any) => <path {...props}>{children}</path>,
  },
  AnimatePresence: ({ children }: any) => children,
  useInView: () => true,
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useTransform: () => 0,
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>;
});

describe('Final Year Project Support Page', () => {
  it('renders the main heading', () => {
    render(<FinalYearProjectSupportPage />);
    
    expect(screen.getByText('Final Year Project')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
  });

  it('renders the course description', () => {
    render(<FinalYearProjectSupportPage />);
    
    expect(screen.getByText(/Final Year Project Hub assists students/)).toBeInTheDocument();
  });

  it('renders all service cards', () => {
    render(<FinalYearProjectSupportPage />);
    
    expect(screen.getByText('Topic Ideation & Proposal Writing')).toBeInTheDocument();
    expect(screen.getByText('Abstract, Poster & Report Writing')).toBeInTheDocument();
    expect(screen.getByText('Research Papers (IEEE, Springer formats)')).toBeInTheDocument();
    expect(screen.getByText('Thesis & Dissertation Support')).toBeInTheDocument();
    expect(screen.getByText('Plagiarism Checks & Correction')).toBeInTheDocument();
    expect(screen.getByText('Presentation Slide Creation')).toBeInTheDocument();
  });

  it('renders all statistics cards', () => {
    render(<FinalYearProjectSupportPage />);
    
    expect(screen.getByText('500+')).toBeInTheDocument();
    expect(screen.getByText('Projects Completed')).toBeInTheDocument();
    expect(screen.getByText('95%')).toBeInTheDocument();
    expect(screen.getByText('Success Rate')).toBeInTheDocument();
    expect(screen.getByText('50+')).toBeInTheDocument();
    expect(screen.getByText('Expert Supervisors')).toBeInTheDocument();
    expect(screen.getByText('24/7')).toBeInTheDocument();
    expect(screen.getByText('Support Available')).toBeInTheDocument();
  });

  it('renders all benefit cards', () => {
    render(<FinalYearProjectSupportPage />);
    
    expect(screen.getByText('Access to Project Examples')).toBeInTheDocument();
    expect(screen.getByText('Supervision & Continuous Guidance')).toBeInTheDocument();
    expect(screen.getByText('Software Tools Support')).toBeInTheDocument();
  });

  it('renders the process flow steps', () => {
    render(<FinalYearProjectSupportPage />);
    
    expect(screen.getByText('Initial Consultation')).toBeInTheDocument();
    expect(screen.getByText('Topic Selection')).toBeInTheDocument();
    expect(screen.getByText('Research & Development')).toBeInTheDocument();
    expect(screen.getByText('Documentation')).toBeInTheDocument();
    expect(screen.getByText('Presentation Prep')).toBeInTheDocument();
  });

  it('renders apply now buttons with correct links', () => {
    render(<FinalYearProjectSupportPage />);
    
    const applyButtons = screen.getAllByText('Apply Now');
    expect(applyButtons).toHaveLength(2);
    
    // Check that the buttons link to the correct URL
    const links = screen.getAllByRole('link');
    const applyLinks = links.filter(link =>
      link.getAttribute('href') === '/apply/final-year-project'
    );
    expect(applyLinks).toHaveLength(2);
  });

  it('renders the call-to-action section', () => {
    render(<FinalYearProjectSupportPage />);
    
    expect(screen.getByText('Need help with your research journey?')).toBeInTheDocument();
    expect(screen.getByText(/Don't let your final year project become a source of stress/)).toBeInTheDocument();
  });

  it('has proper responsive classes', () => {
    render(<FinalYearProjectSupportPage />);
    
    // Check for responsive grid classes
    const gridElements = document.querySelectorAll('[class*="grid"]');
    expect(gridElements.length).toBeGreaterThan(0);
    
    // Check for responsive spacing classes
    const responsiveElements = document.querySelectorAll('[class*="lg:"], [class*="md:"], [class*="sm:"]');
    expect(responsiveElements.length).toBeGreaterThan(0);
  });

  it('includes proper semantic HTML structure', () => {
    render(<FinalYearProjectSupportPage />);
    
    // Check for semantic sections
    const sections = screen.getAllByRole('region', { hidden: true }) || document.querySelectorAll('section');
    expect(sections.length).toBeGreaterThan(0);
    
    // Check for proper heading hierarchy
    const h1 = document.querySelector('h1');
    const h2s = document.querySelectorAll('h2');
    const h3s = document.querySelectorAll('h3');
    
    expect(h1).toBeInTheDocument();
    expect(h2s.length).toBeGreaterThan(0);
    expect(h3s.length).toBeGreaterThan(0);
  });
});
