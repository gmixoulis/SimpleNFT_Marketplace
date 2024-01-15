import {useWeb3ModalTheme} from '@web3modal/react';

export default function ThemeControls() {
    const {setTheme} = useWeb3ModalTheme();

    setTheme({themeColor: 'magenta'});
    setTheme({themeMode: 'dark'});
    setTheme({themeBackground: 'gradient'});
    return (<></>);
}