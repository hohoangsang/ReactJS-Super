import PropTypes from 'prop-types';

function Layout({ children }) {
  return <div className='Layout'>{children}</div>;
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

export default Layout;
