import React from 'react';
import Link from '@docusaurus/Link';
import styles from './ModuleCard.module.css';

interface ModuleCardProps {
  title: string;
  description: string;
  link: string;
  delay: number; // For animation stagger
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title, description, link, delay }) => {
  return (
    <div className={styles.moduleCard} style={{ animationDelay: `${delay}s` }}>
      <div className={styles.cardHeader}>
        <h3>{title}</h3>
      </div>
      <div className={styles.cardBody}>
        <p>{description}</p>
      </div>
      <div className={styles.cardFooter}>
        <Link className="button button--primary" to={link}>
          Explore
        </Link>
      </div>
    </div>
  );
};

export default ModuleCard;
