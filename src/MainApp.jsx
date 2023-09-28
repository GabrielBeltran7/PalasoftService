import React, { useState, useEffect, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom'; // Importa Routes y Route en lugar de Switch y Route
import FallbackSpinner from './components/FallbackSpinner';
import NavBar from './components/NavBar';
import Home from './components/Home';
import endpoints from './constants/endpoints';

function MainApp() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.routes, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <div className="MainApp">
      <NavBar />
      <main className="main">
        <Routes> 
          <Route path="/" element={<Home />} /> {/* Utiliza 'element' en lugar de 'component' */}
          {data &&
            data.sections.map((route) => {
              const SectionComponent = React.lazy(() => import('./components/' + route.component));
              return (
                <Route
                  key={route.headerTitle}
                  path={route.path}
                  element={ // Utiliza 'element' en lugar de 'component'
                    <Suspense fallback={<FallbackSpinner />}>
                      <SectionComponent header={route.headerTitle} />
                    </Suspense>
                  }
                />
              );
            })}
        </Routes>
      </main>
    </div>
  );
}

export default MainApp;

