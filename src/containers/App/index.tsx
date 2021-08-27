import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { loadThemeAction } from '../../store/actions/theme';
import darkTheme from '../../theme/dark';
import lightTheme from '../../theme/light';
import Routes from '../../routes';
import { ReducerState } from '../../store/actionTypes';
import { Toaster } from 'react-hot-toast';
import { useFetchProfile, useFetchProfileList } from '../../store/hooks';
import { useEagerConnect } from '../../hooks/useEagerConnect';
import  AudioPlayer  from '../../components/AudioPlayer/AudioPlayer';
import Sidebar from '../../components/Sidebar';


function App() {
  const dispatch = useDispatch();
  const status = useSelector((state: ReducerState) => state.theme.theme);

  useEffect(() => {
    dispatch(loadThemeAction());
  }, [dispatch]);
  useEagerConnect();
  useFetchProfileList();
  useFetchProfile();

  return (
    <MuiThemeProvider theme={status === 'light' ? lightTheme : darkTheme}>
      <Toaster position="top-center" toastOptions={{ success: { duration: 3000 }, error: { duration: 3000 } }} />
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Router>
          <Routes />
        </Router>
      </SnackbarProvider>
      <AudioPlayer />
    </MuiThemeProvider>
  );
}

export default App;
