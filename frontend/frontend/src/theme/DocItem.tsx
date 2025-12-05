import TOC from '@theme/TOC';
import TOCInline from '@theme/TOCInline';
import ProgressTracker from '@site/src/components/ProgressTracker'; // Import ProgressTracker
import styles from './styles.module.css';

export default function DocItem({children, content: DocContent}) {
  const {frontMatter, metadata} = DocContent;
  const {
    image,
    keywords,
    hide_title: hideTitle,
    hide_table_of_contents: hideTableOfContents,
    learning_objectives,
    key_takeaways,
    references,
  } = frontMatter;
  const {description, title} = metadata;

  const canDisplayTOC = !hideTable_of_contents && DocContent.toc && DocContent.toc.length > 0;

  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.docPages,
        ThemeClassNames.page.docPage,
        frontMatter.wrapperClassName,
      )}>
      <DocProvider content={DocContent}>
        <PageMetadata title={title} description={description} keywords={keywords} image={image} />
        <div className="row">
          <div className={clsx('col', !canDisplayTOC && 'col--no-right-gap')}>
            <DocVersionBanner />
            <div className={styles.docItemContainer}>
              <article>
                <DocBreadcrumbs />
                <DocVersionBadge />
                {canDisplayTOC && (
                  <TOC className={styles.tocResponsive} toc={DocContent.toc} />
                )}
                <div className={clsx(styles.docItem, 'markdown')}>
                  {!hideTitle && (
                    <header>
                      <h1 className={styles.docTitle}>{title}</h1>
                      <ProgressTracker /> {/* Add ProgressTracker here */}
                    </header>
                  )}

                  {learning_objectives && learning_objectives.length > 0 && (
                    <section className="chapter-section">
                      <h2>Learning Objectives</h2>
                      <ul>
                        {learning_objectives.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </section>
                  )}

                  <DocItemContent>{children}</DocItemContent>

                  {key_takeaways && key_takeaways.length > 0 && (
                    <section className="chapter-section">
                      <h2>Key Takeaways</h2>
                      <ul>
                        {key_takeaways.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {references && references.length > 0 && (
                    <section className="chapter-section">
                      <h2>References & Further Reading</h2>
                      <ul>
                        {references.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </section>
                  )}

                </div>
                <DocItemFooter {...{content: DocContent}} />
              </article>
              <DocPaginator previous={metadata.previous} next={metadata.next} />
            </div>
          </div>
          {canDisplayTOC && (
            <div className="col col--3">
              <TOC toc={DocContent.toc} />
            </div>
          )}
        </div>
      </DocProvider>
    </HtmlClassNameProvider>
  );
}
