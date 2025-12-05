import React from 'react';
import { motion } from 'framer-motion';

interface InteractiveDiagramProps {
  src?: string; // Optional image source for the diagram
  alt?: string; // Alt text for the image
  title?: string; // Title for the diagram
}

const InteractiveDiagram: React.FC<InteractiveDiagramProps> = ({ src, alt = "Interactive Diagram", title = "Interactive Diagram Placeholder" }) => {
  return (
    <motion.div
      className="interactive-diagram-container" // Add a class for potential external styling
      style={{
        border: '1px dashed var(--ifm-color-emphasis-400)',
        padding: '20px',
        textAlign: 'center',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '20px auto',
        backgroundColor: 'var(--ifm-background-surface-color)',
        borderRadius: '8px',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
      whileHover={{ scale: 1.02, boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}
      whileTap={{ scale: 0.98 }}
    >
      {src ? (
        <img src={src} alt={alt} style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'contain' }} />
      ) : (
        <svg
          width="60"
          height="60"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--ifm-color-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginBottom: '10px' }}
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      )}
      <p style={{ color: 'var(--ifm-font-color-base)', fontWeight: 'bold' }}>{title}</p>
      <p style={{ color: 'var(--ifm-color-emphasis-600)', fontSize: '0.85em' }}>
        (Click for interactivity - functionality to be implemented)
      </p>
    </motion.div>
  );
};

export default InteractiveDiagram;
