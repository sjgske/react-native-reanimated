import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';
import Navigation from './Navigation';
import Loading from './src/screens/Loading';
import Error from './src/screens/Error';

const App = () => {
  return (
    <RecoilRoot>
      <ErrorBoundary fallback={<Error />}>
        <Suspense fallback={<Loading />}>
          <Navigation />
        </Suspense>
      </ErrorBoundary>
    </RecoilRoot>
  );
};

export default App;
