import type { RouteObject } from 'react-router-dom';
import Shell from './Shell';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import NotesPage from './pages/NotesPage';
import ProjectPage from './pages/ProjectPage';
import RoadmapPage from './pages/RoadmapPage';

/** Shared by the browser router and the build-time renderer. */
export const routes: RouteObject[] = [
  {
    element: <Shell />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/projects/:slug', element: <ProjectPage /> },
      { path: '/notes', element: <NotesPage /> },
      { path: '/roadmap', element: <RoadmapPage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];
