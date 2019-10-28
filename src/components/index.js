import wsDialog from './wsDialog'
import wsLoading from './wsLoading'
import wsTip from './wsTip'
import wsHistory from './wsHistory'
import wsSelect from './wsSelect'
import wsNumberInput from './wsNumberInput'
import wsToast from './wsToast'
const components = { 
    wsDialog:{
        type: 'component',
        value:wsDialog
    },
    wsHistory:{
        type: 'component',
        value:wsHistory
    },
    wsSelect:{
        type: 'component',
        value:wsSelect
    },
    wsNumberInput:{
        type: 'component',
        value:wsNumberInput
    },
    wsLoading:{
        type: 'directive',
        value:wsLoading
    },
    wsTip:{
        type: 'directive',
        value:wsTip
    },
    wsToast:{
        type: 'directive',
        value:wsToast
    }
};
const install = (Vue, pluginOptions = {}) => { // eslint-disable-line
    Object.keys(components).forEach((key) => {
        Vue.component(key, components[key].value);
        if(components[key].type === 'directive'){
            Vue.use(components[key].value)
        } 
    });
};
export default install;