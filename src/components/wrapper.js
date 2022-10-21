import React, {useState} from 'react';
import {IntlProvider} from 'react-intl';
import Polish from '../locales/pl/translation.json';
import English from '../locales/en/translation.json';

export const Context = React.createContext();
const local = navigator.language;
let lang;
if (local === 'en-EN') {
   lang = English;
}else if (local === 'pl-PL') {
       lang = Polish;

}
const Wrapper = (props) => {
   const [locale, setLocale] = useState(local);
   const [messages, setMessages] = useState(lang);
   function selectLanguage(e) {
       const newLocale = e.target.value;
       setLocale(newLocale);
       if (newLocale === 'en-EN') {
           setMessages(English);
       } else if (newLocale === 'pl-PL') {
               setMessages(Polish);
       }
   }
   return (
       <Context.Provider value = {{locale, selectLanguage}}>
           <IntlProvider messages={messages} locale={locale}>
               {props.children}
           </IntlProvider>
       </Context.Provider>
   );
}
export default Wrapper;