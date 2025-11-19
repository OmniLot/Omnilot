import PropTypes from 'prop-types';
import TopNavigation from '@/components/navigation/TopNavigation';
import HelpWidget from '@/components/shared/HelpWidget';

export default function Layout({ children, currentPageName }) {
  const showHelpWidget = currentPageName !== 'Landing' && currentPageName !== 'BookDemo';

  return (
    <div className="min-h-screen">
      <TopNavigation />
      <main className="pt-16">
        {children}
      </main>
      {showHelpWidget && <HelpWidget />}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
  currentPageName: PropTypes.string.isRequired,
};
