import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Navigation from './Navigation';
import { SafeAreaView, Text } from 'react-native';

const Error = () => {
  return (
    <SafeAreaView>
      <Text>Error</Text>
    </SafeAreaView>
  );
};

const Loading = () => {
  return (
    <SafeAreaView>
      <Text>Loading</Text>
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Loading />}>
        <Navigation />
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
