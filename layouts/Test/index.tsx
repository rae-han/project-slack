import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const TestLayout: React.FC<Props> = ({ children }) => {
  const pages = useRef([
    { route: '/test', text: 'useQuery' },
    { route: '/test/parallel/1', text: 'parallel with useQuery' },
    { route: '/test/parallel/2', text: 'parallel with useQueries' },
    { route: '/test', text: 'root' },
  ]);

  return (
    <div>
      <ul>
        {pages.current.map((page) => (
          <li>
            <Link to={page.route}>{page.text}</Link>
          </li>
        ))}
      </ul>
      <div>{children}</div>
    </div>
  );
};

export default TestLayout;
