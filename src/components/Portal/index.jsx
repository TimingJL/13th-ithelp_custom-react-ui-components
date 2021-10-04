import { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ children, customRootId }) => {
  let portalRoot;
  const rootId = customRootId || 'portal-root';

  if (document.getElementById(rootId)) {
    portalRoot = document.getElementById(rootId);
  } else {
    const divDOM = document.createElement('div');
    divDOM.id = rootId;
    document.body.appendChild(divDOM);
    portalRoot = divDOM;
  }

  useEffect(() => () => {
    portalRoot.parentElement.removeChild(portalRoot);
  }, [portalRoot]);

  return ReactDOM.createPortal(
    children,
    portalRoot,
  );
};

export default Portal;
