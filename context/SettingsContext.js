import {createContext} from 'react';
import {Setting} from '../models/Setting';
import {LANG_EN} from '../models/Language';

const settings: Setting = {
  lang: LANG_EN,
};

const SettingsContext = createContext(settings);

export default SettingsContext;
