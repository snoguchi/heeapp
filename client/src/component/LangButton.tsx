import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from '../store';
import { Lang, setLang } from '../store/config';
import { useDispatch } from 'react-redux';
import { Button, Menu, MenuItem, useTheme, useMediaQuery } from '@material-ui/core';
import { Translate, ExpandMore } from '@material-ui/icons';

export const LangButton: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const [t, i18n] = useTranslation();
  const lang = useSelector((state) => state.config.lang);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const selectLang = (lang: Lang) => {
    dispatch(setLang(lang));
    i18n.changeLanguage(lang);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Button startIcon={<Translate />} endIcon={<ExpandMore />} onClick={handleButtonClick}>
        {xs ? null : t(`lang/${lang}`)}
      </Button>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose} style={{ zIndex: 2000 }}>
        <MenuItem onClick={() => selectLang('ja')}>{t('lang/ja')}</MenuItem>
        <MenuItem onClick={() => selectLang('en')}>{t('lang/en')}</MenuItem>
      </Menu>
    </React.Fragment>
  );
};
